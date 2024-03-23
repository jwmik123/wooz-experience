export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "textures/environmentMap/px.png",
      "textures/environmentMap/nx.png",
      "textures/environmentMap/py.png",
      "textures/environmentMap/ny.png",
      "textures/environmentMap/pz.png",
      "textures/environmentMap/nz.png",
    ],
  },
  {
    name: "grassColorTexture",
    type: "texture",
    path: "textures/dirt/color.jpg",
  },
  {
    name: "grassNormalTexture",
    type: "texture",
    path: "textures/dirt/normal.jpg",
  },
  {
    name: "bakedFinalTexture",
    type: "texture",
    path: "assets/bakedFinal.jpg",
  },
  {
    name: "studioModel",
    type: "gltfModel",
    path: "models/Studio/studio5Comp.gltf",
  },
  {
    name: "perlinTexture",
    type: "texture",
    path: "textures/perlin/perlin.png",
  },
  {
    name: "ambienceSound",
    type: "audio",
    path: "sounds/ambience.mp3",
  },
  {
    name: "introSound",
    type: "audio",
    path: "sounds/intro.mp3",
  },
];
