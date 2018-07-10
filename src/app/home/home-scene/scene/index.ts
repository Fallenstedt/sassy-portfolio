import * as THREE from "THREE";

export class Scene {
  scene: any;
  camera: any;
  renderer: any;
  canvas: any;
  box: any;
  constructor(canvas) {
    window.addEventListener("resize", this.onWindowResize.bind(this), false);

    this.canvas = canvas;
    this.scene = new THREE.Scene();
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
    this.renderer.setClearColor(0xf5f5f5, 1);
    this.animate = this.animate.bind(this);
    this.box = new Box(10, 10, 10, "0xc1533d");
    this.init();
    this.setWidthAndHeightOfCanvas();
  }

  private init(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.createLights();
    this.positionCamera();
    this.scene.add(this.box.mesh);
    this.animate();
  }

  private createLights(): void {
    let light = new THREE.DirectionalLight(0x404040, 1); // soft white light
    this.scene.add(light);
    light = new THREE.AmbientLight(0xdadada, 1); // soft white light
    this.scene.add(light);
  }

  private positionCamera(): void {
    const cameraLookAtPoint = new THREE.Vector3();
    this.camera.position.z = 55;
    this.camera.position.y = -5;
    this.camera.position.x = -15;
    // this.camera.lookAt(cameraLookAtPoint);
  }

  private animate(): void {
    requestAnimationFrame(this.animate);
    // TWEEN.update(delta);
    this.box.mesh.rotation.x += 0.01;
    this.box.mesh.rotation.z += 0.02;
    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.setWidthAndHeightOfCanvas();
  }

  private setWidthAndHeightOfCanvas() {
    console.log(window.innerWidth);
    this.canvas.style.width = `${window.innerWidth - 20}px`;
    this.canvas.style.height = `${window.innerHeight - 28}px`;
  }
}

class Box {
  x: number;
  y: number;
  z: number;
  color: string;
  geom: THREE.BoxGeometry;
  mat: THREE.MeshLambertMaterial;
  mesh: THREE.Mesh;

  constructor(x, y, z, color) {
    this.color = color;
    this.geom = new THREE.BoxGeometry(x, y, z);
    this.mat = new THREE.MeshLambertMaterial();
    this.mesh = new THREE.Mesh(this.geom, this.mat);
  }
}
