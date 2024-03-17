import * as THREE from "three";
import Experience from "../Experience.js";

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
    this.cup = this.resources.items.coffeCupModel;

    this.setModel();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(1, 1, 1);
    this.model.position.set(0, 0, 0);

    this.model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.scene.add(this.model);
  }

  update() {}
}
