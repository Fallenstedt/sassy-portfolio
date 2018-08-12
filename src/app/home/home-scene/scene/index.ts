import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

export class Scene {
  scene: any;
  camera: any;
  renderer: any;
  canvas: any;
  box: any;
  grid: Grid;
  constructor(canvas) {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.scene.background = 0xf5f5f5;
    this.scene.fog = new THREE.Fog(0xf5f5f5, 0.0025, 100);
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xf5f5f5, 1);
    this.animate = this.animate.bind(this);
    this.grid = new Grid(20, 20, 5);
    this.init();
    this.setWidthAndHeightOfCanvas();
  }

  private dispose() {
    // Iterate through all properties of this object.
    Object.keys(this).forEach(key => {
      // Recursively call dispose() if possible.
      if (typeof this[key].dispose === "function") {
        this[key].dispose();
      }
      // Remove any reference.
      this[key] = null;
    });
  }

  public cleanUp(): void {
    window.removeEventListener("resize", this.onWindowResize.bind(this), false);
    this.renderer.dispose();
    this.dispose();
  }

  private init(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.createLights();
    this.positionCamera();
    this.grid.mesh.rotation.x = Math.PI / 2;
    this.scene.add(this.grid.mesh);
    this.animate();
  }

  private createLights(): void {
    let light: any = new THREE.DirectionalLight(0x404040, 1); // soft white light
    this.scene.add(light);
    light = new THREE.AmbientLight(0xdadada, 1); // soft white light
    this.scene.add(light);
  }

  private positionCamera(): void {
    this.camera.position.z = 65;
    this.camera.position.y = -50;
    this.camera.position.x = 50;
  }

  private animate(delta?): void {
    if (this.animate) {
      requestAnimationFrame(this.animate);
    }
    TWEEN.update(delta);
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
      this.camera.rotation.z += 0.001;
    }
  }

  private onWindowResize(): void {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.setWidthAndHeightOfCanvas();
    }
  }

  private setWidthAndHeightOfCanvas() {
    if (this.canvas) {
      this.canvas.style.width = `${window.innerWidth - 20}px`;
      this.canvas.style.height = `${window.innerHeight - 28}px`;
    }
  }
}

class Box {
  x: number;
  y: number;
  z: number;
  geom: THREE.BoxGeometry;
  mat: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;
  tween: TWEEN.Tween;
  current: ITweenPosition = { y: -100 };
  target: ITweenPosition = { y: Math.random() * 40 };

  constructor(x, y, z, color) {
    this.geom = new THREE.BoxGeometry(x, y, z);
    this.mat = new THREE.MeshLambertMaterial();
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.tween = this.makeTween();
  }

  private makeTween(): TWEEN.Tween {
    const update = function() {
      this.mesh.position.y = this.current.y;
      this.mesh.rotation.x = this.current.y / 10;
      this.mesh.rotation.z = this.current.y / (this.current.y * 9);
    };
    const easing = TWEEN.Easing.Elastic.InOut;
    const tweenHead = new TWEEN.Tween(this.current)
      .to(this.target, 2000)
      .easing(easing)
      .onUpdate(update.bind(this));

    const tweenMiddle = new TWEEN.Tween(this.current)
      .to(this.target, 6000)
      .easing(easing)
      .onUpdate(update.bind(this));
    tweenHead.chain(tweenMiddle);

    return tweenHead;
  }
}

class Grid {
  x: number;
  y: number;
  group: Array<Box>;
  mesh: THREE.Group;
  gutter: number;
  constructor(x, y, gutter) {
    this.x = x;
    this.y = y;
    this.group = [];
    this.gutter = gutter;
    this.mesh = this.makeGrid();
  }
  private makeGrid(): THREE.Group {
    const meshGroup = new THREE.Group();
    for (let x = 0; x < this.x; x++) {
      for (let y = 0; y < this.y; y++) {
        const c = new Box(3, 3, 3, "0xc1533d");
        c.mesh.position.x = x * this.gutter;
        c.mesh.position.z = y * this.gutter;
        c.tween.start();
        this.group.push(c);
        meshGroup.add(c.mesh);
      }
    }
    return meshGroup;
  }
}

interface ITweenPosition {
  x?: number;
  y?: number;
  z?: number;
}
