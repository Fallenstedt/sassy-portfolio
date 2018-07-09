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
    this.box = this.createBox();
    this.init();
    this.setWidthAndHeightOfCanvas();
  }

  private init(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.createLights();
    this.positionCamera();
    this.scene.add(this.box);

    // const axesHelper = new THREE.AxesHelper(25);
    // this.scene.add(axesHelper);
    this.animate();
  }

  private createBox() {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshLambertMaterial({ color: 0xc1533d });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
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
    this.box.rotation.x += 0.01;
    this.box.rotation.z += 0.02;
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
