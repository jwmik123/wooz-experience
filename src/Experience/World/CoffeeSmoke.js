import * as THREE from "three";
import Experience from "../Experience";
import vertexShader from "../shaders/coffeeSmoke/vertex.glsl";
import fragmentShader from "../shaders/coffeeSmoke/fragment.glsl";

export default class CoffeeSmoke {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("coffeeSmoke");
    }

    // Resource
    this.resource = this.resources.items.foxModel;

    // Not sure if this is necessary??
    this.resources.items.perlinTexture.wrapS = THREE.RepeatWrapping;
    this.resources.items.perlinTexture.wrapT = THREE.RepeatWrapping;

    this.setGeometry();
    this.setTexture();
    this.setAnimation();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 16, 64);

    this.material = new THREE.ShaderMaterial({
      fragmentShader,
      vertexShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uMouse: new THREE.Uniform(new THREE.Vector2()),
        uPerlinTexture: new THREE.Uniform(this.resources.items.perlinTexture),
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotation.y = Math.PI / 2;
    this.mesh.position.set(2, 0.83, 0.5);
    this.mesh.scale.set(0.05, 0.2, 0.05);

    this.scene.add(this.mesh);
  }
  setTexture() {}
  setAnimation() {}

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed * 0.005;
  }
}
