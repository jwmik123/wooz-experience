import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setControls();
    this.setMouse();
  }

  setMouse() {
    this.mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const onMouseClick = (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(this.mouse, this.instance);
      const intersects = raycaster.intersectObjects(this.scene.children, true);
      if (intersects.length > 0) {
        const object = intersects[0].object;

        console.log(object);

        const newPath = "/" + object.name;
        history.pushState({ path: newPath }, null, newPath);
      }
    };

    // window.addEventListener("click", onMouseClick, false);
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      55,
      this.sizes.width / this.sizes.height,
      0.1,
      150
    );
    // this.instance.position.set(12, 5, 4); BEFORE INTRO ANIMATION
    this.instance.position.set(6, 1.2, 0);

    // window.addEventListener("click", () => {
    //   console.log(this.instance.position);
    // });

    /**
     * Intro transition into the experience
     */
    const button = document.querySelector(".intro-button");
    button.addEventListener("click", () => {
      const introElement = document.querySelector(".intro");
      introElement.classList.remove("intro");
      gsap.to(this.instance.position, {
        x: 6,
        y: 1.2,
        z: 0,
        ease: "power3.inOut",
        duration: 0,
        delay: 0,
      });
    });

    this.scene.add(this.instance);
  }

  setControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.screenSpacePanning = true;
    this.controls.zoomSpeed = 0.25;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
    this.instance.updateMatrixWorld();
  }
}
