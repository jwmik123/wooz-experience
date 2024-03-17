import * as THREE from "three";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Studio from "./Studio.js";
import CoffeeSmoke from "./CoffeeSmoke.js";
import { Sky } from "three/addons/objects/Sky.js";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.environment = new Environment();
      this.floor = new Floor();
      // this.coffeeSmoke = new CoffeeSmoke();
      this.studio = new Studio();

      // Sky Background
      this.SkyBackground();

      // Debug
      if (this.debug.active) {
        this.debugFolder = this.debug.ui.addFolder("sky");
      }
    });
  }

  SkyBackground() {
    const sky = new Sky();
    sky.scale.setScalar(450000);
    this.scene.add(sky);

    const sun = new THREE.Vector3();

    const skyParameters = {
      turbidity: 10,
      rayleigh: 3,
      mieCoefficient: 0.005,
      mieDirectionalG: 0.95,
      elevation: 1.2,
      azimuth: 180,
      exposure: this.experience.renderer.toneMappingExposure,
    };

    const updateSky = () => {
      const uniforms = sky.material.uniforms;
      uniforms["turbidity"].value = skyParameters.turbidity;
      uniforms["rayleigh"].value = skyParameters.rayleigh;
      uniforms["mieCoefficient"].value = skyParameters.mieCoefficient;
      uniforms["mieDirectionalG"].value = skyParameters.mieDirectionalG;

      const phi = THREE.MathUtils.degToRad(90 - skyParameters.elevation);
      const theta = THREE.MathUtils.degToRad(skyParameters.azimuth);

      sun.setFromSphericalCoords(1, phi, theta);

      uniforms["sunPosition"].value.copy(sun);

      this.experience.renderer.toneMappingExposure = skyParameters.exposure;
    };

    updateSky();
  }

  update() {
    // if (this.fox) this.fox.update();
    if (this.coffeeSmoke) this.coffeeSmoke.update();
  }
}
