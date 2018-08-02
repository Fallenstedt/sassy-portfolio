import * as THREE from "three";
import { TweenMax, Expo } from "gsap";

export class Hover {
  parent: HTMLElement;
  vertex: string;
  fragment: string;
  dispImg: string;
  img1: string;
  img2: string;
  intensity: number;
  speedIn: number;
  speedOut: number;
  userHover: boolean;
  tween: Function;

  // three
  scene: THREE.Scene;
  camera: THREE.OrthographicCamera;
  renderer: THREE.Renderer;
  loader: THREE.TextureLoader;
  mat: THREE.ShaderMaterial;
  geom: THREE.PlaneBufferGeometry;

  constructor(opts: HoverOpts) {
    // GLSL
    this.vertex = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `;

    this.fragment = `
      varying vec2 vUv;

      uniform sampler2D texture;
      uniform sampler2D texture2;
      uniform sampler2D disp;

      // uniform float time;
      // uniform float _rot;
      uniform float dispFactor;
      uniform float effectFactor;

      // vec2 rotate(vec2 v, float a) {
      //  float s = sin(a);
      //  float c = cos(a);
      //  mat2 m = mat2(c, -s, s, c);
      //  return m * v;
      // }

      void main() {

          vec2 uv = vUv;

          // uv -= 0.5;
          // vec2 rotUV = rotate(uv, _rot);
          // uv += 0.5;

          vec4 disp = texture2D(disp, uv);

          vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
          vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

          vec4 _texture = texture2D(texture, distortedPosition);
          vec4 _texture2 = texture2D(texture2, distortedPosition2);

          vec4 finalTexture = mix(_texture, _texture2, dispFactor);

          gl_FragColor = finalTexture;
          // gl_FragColor = disp;
      }
  `;
    // image opts
    this.parent = opts.parent;
    this.dispImg = opts.dispImg;
    this.img1 = opts.img1;
    this.img2 = opts.img2;
    this.intensity = 1;
    this.speedIn = 1.6;
    this.speedOut = 1.2;
    this.userHover = opts.userHover === undefined ? true : opts.userHover;
    this.tween = Expo.easeOut;

    // scene
    this.scene = new THREE.Scene();
    this.animate = this.animate.bind(this);

    // camera
    this.camera = new THREE.OrthographicCamera(
      this.parent.offsetWidth / -2,
      this.parent.offsetWidth / 2,
      this.parent.offsetHeight / 2,
      this.parent.offsetHeight / -2,
      1,
      1000
    );
    this.camera.position.z = 1;

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: false
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xffffff, 0.0);
    this.renderer.setSize(this.parent.offsetWidth, this.parent.offsetHeight);
    this.parent.appendChild(this.renderer.domElement);

    // texture
    this.loader = new THREE.TextureLoader();
    this.loader.crossOrigin = "";

    const texture1 = this.loader.load(this.img1);
    const texture2 = this.loader.load(this.img2);
    const disp = this.loader.load(this.dispImg);
    disp.wrapS = disp.wrapT = THREE.RepeatWrapping;
    texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
    texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

    texture1.anisotropy = this.renderer.getMaxAnisotropy();
    texture2.anisotropy = this.renderer.getMaxAnisotropy();

    // material
    this.mat = new THREE.ShaderMaterial({
      uniforms: {
        effectFactor: { type: "f", value: this.intensity },
        dispFactor: { type: "f", value: 0.0 },
        texture: { type: "t", value: texture1 },
        texture2: { type: "t", value: texture2 },
        disp: { type: "t", value: disp }
      },
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
      transparent: true,
      opacity: 1.0
    });

    // geometry
    this.geom = new THREE.PlaneBufferGeometry(
      this.parent.offsetWidth,
      this.parent.offsetHeight,
      1
    );

    // images
    const object = new THREE.Mesh(this.geom, this.mat);
    this.scene.add(object);

    // event listeners
    const events = function() {
      let evtIn = "mouseenter";
      let evtOut = "mouseout";
      if (false) {
        evtIn = "touchstart";
        evtOut = "touchend";
      }
      this.parent.addEventListener(evtIn, e => {
        // alert("Hello");
        TweenMax.to(this.mat.uniforms.dispFactor, this.speedIn, {
          value: 1,
          easing: this.easing
        });
      });

      this.parent.addEventListener(evtOut, e => {
        TweenMax.to(this.mat.uniforms.dispFactor, this.speedOut, {
          value: 0,
          easing: this.easing
        });
      });
    }.bind(this)();

    // render it all
    this.animate();
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
}

export interface HoverOpts {
  parent: HTMLElement;
  dispImg: string;
  img1: string;
  img2: string;
  userHover?: boolean;
}
