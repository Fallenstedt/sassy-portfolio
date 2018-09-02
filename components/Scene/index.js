import * as THREE from "three";
import TWEEN from "@tweenjs/tween.js";

export default class Scene {
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

  dispose() {
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

  cleanUp() {
    window.removeEventListener("resize", this.onWindowResize.bind(this), false);
    this.dispose();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.createLights();
    this.positionCamera();
    this.grid.mesh.rotation.x = Math.PI / 2;
    this.scene.add(this.grid.mesh);
    this.animate();
  }

  createLights() {
    let light = new THREE.DirectionalLight(0x404040, 1); // soft white light
    this.scene.add(light);
    light = new THREE.AmbientLight(0xdadada, 1); // soft white light
    this.scene.add(light);
  }

  positionCamera() {
    this.camera.position.z = 65;
    this.camera.position.y = -50;
    this.camera.position.x = 50;
  }

  animate(delta) {
    if (this.animate) {
      requestAnimationFrame(this.animate);
    }
    TWEEN.update(delta);
    if (this.renderer) {
      this.renderer.render(this.scene, this.camera);
      this.camera.rotation.z += 0.001;
    }
  }

  onWindowResize() {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.setWidthAndHeightOfCanvas();
    }
  }

  setWidthAndHeightOfCanvas() {
    if (this.canvas) {
      this.canvas.style.width = `${window.innerWidth - 20}px`;
      this.canvas.style.height = `${window.innerHeight - 28}px`;
    }
  }
}

class Box {
  constructor(x, y, z, color) {
    this.current = { y: -100 };
    this.target = { y: Math.random() * 40 };
    this.geom = new THREE.BoxGeometry(x, y, z);
    this.mat = new THREE.MeshLambertMaterial();
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.tween = this.makeTween();
  }

  makeTween() {
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
  constructor(x, y, gutter) {
    this.x = x;
    this.y = y;
    this.group = [];
    this.gutter = gutter;
    this.mesh = this.makeGrid();
  }
  makeGrid() {
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
