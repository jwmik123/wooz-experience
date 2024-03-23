import * as THREE from "three";
import Experience from "../Experience.js";
import vertexShader from "../shaders/baked/vertex.glsl";
import fragmentShader from "../shaders/baked/fragment.glsl";

export default class Studio {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("studio");
    }

    // Resource
    this.resource = this.resources.items.studioModel;

    this.setModel();
  }

  setModel() {
    this.model = {};

    this.model = this.resource.scene;

    this.model.baked = this.resources.items.bakedFinalTexture;
    this.model.baked.colorSpace = THREE.SRGBColorSpace;
    this.model.baked.flipY = false;

    this.model.material = new THREE.ShaderMaterial({
      uniforms: {
        uBakedDayTexture: new THREE.Uniform(this.model.baked),
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.model.material;
      }
    });

    const lampholder = this.model.children.find(
      (child) => child.name === "lamp1"
    );
    const lamps = this.model.children.find(
      (child) => child.name === "emissionLamp"
    );

    lamps.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1,
    });

    console.log(lampholder);
    console.log(lamps);

    this.model.scale.set(1, 1, 1);
    this.model.position.set(0, 0, 0);
    this.scene.add(this.model);
  }

  update() {}
}
