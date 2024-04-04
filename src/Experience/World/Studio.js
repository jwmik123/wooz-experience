import * as THREE from "three";
import Experience from "../Experience.js";

import vertexShader from "../shaders/baked/vertex.glsl";
import fragmentShader from "../shaders/baked/fragment.glsl";
import vertexShirtShader from "../shaders/baked/vertexShirt.glsl";
import fragmentShirtShader from "../shaders/baked/fragmentShirt.glsl";

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
    this.setShirts();
  }
  x;

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

    this.model.children[0].material = this.model.material;

    console.log(this.model);

    this.model.scale.set(1, 1, 1);
    this.model.position.set(0, 0, 0);
    this.scene.add(this.model);
  }

  setShirts() {
    this.shirts = {};

    this.shirts.baked = this.resources.items.bakedShirtsTexture;
    this.shirts.baked.colorSpace = THREE.SRGBColorSpace;
    this.shirts.baked.flipY = false;

    this.shirts.material = new THREE.ShaderMaterial({
      uniforms: {
        uBakedShirtsTexture: new THREE.Uniform(this.shirts.baked),
      },
      vertexShader: vertexShirtShader,
      fragmentShader: fragmentShirtShader,
    });

    for (let i = 1; i <= 5; i++) {
      this.model.children[i].material = this.shirts.material;
    }
  }

  update() {}
}
