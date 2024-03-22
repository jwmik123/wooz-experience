import * as THREE from "three";
import Experience from "./Experience.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";

export default class Renderer {
  constructor() {
    this.experience = new Experience();
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.postProcess = false;

    this.setInstance();
    // this.setPostProcess(); TODO: make sure composer is set up correctly.
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  setPostProcess() {
    this.postProcess = {};
    // Width and height
    const boundings = this.canvas.getBoundingClientRect();
    this.sizes.width = boundings.width;
    this.sizes.height = boundings.height || window.innerHeight;

    /**
     * Effect composer
     */
    this.renderTarget = new THREE.WebGLRenderTarget(
      this.sizes.width,
      this.sizes.height,
      {
        generateMipmaps: false,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat,
        encoding: THREE.sRGBEncoding,
        samples: 2,
      }
    );
    this.postProcess.composer = new EffectComposer(
      this.instance,
      this.renderTarget
    );
    this.postProcess.composer.setSize(
      this.postProcess.width,
      this.postProcess.height
    );
    this.postProcess.composer.setPixelRatio(this.postProcess.pixelRatio);

    /**
     * Render pass
     */
    this.postProcess.renderPass = new RenderPass(
      this.scene,
      this.camera.instance
    );
    this.postProcess.composer.addPass(this.postProcess.renderPass);

    /**
     * Dot screen pass
     */
    this.postProcess.dotScreenPass = new DotScreenPass();
    this.postProcess.composer.addPass(this.postProcess.dotScreenPass);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
