/* 
three.js den master ı download > build>three.min.js ve
examples>js>loader>GLTFLoader.js
klasörlere ekle
body'e ekle
bedava 3d model bul > https://sketchfab.com/ > ve gLTF formatlı olanı indir > 3d klasörü yap> içine indirilen dosyaları at
*/

// VARIABLES
let container;
let camera;
let renderer;
let scene;
let house;

function init() {
  container = document.querySelector(".scene");

  //create scene
  scene = new THREE.Scene();

  // camera
  const fov = 40;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;
  //camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-2, 2, 10); // x,y,z eksenlerinde camera pozisyonu
  // ışık ekle
  const ambient = new THREE.AmbientLight(0x404040, 25);
  scene.add(ambient);
  // light
  const light = new THREE.DirectionalLight(0xffffff, 4);
  light.position.set(20, 40, 70);
  scene.add(light);

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  //herşeyi html ye basan func.
  container.appendChild(renderer.domElement);

  //load model
  let loader = new THREE.GLTFLoader();
  loader.load("./3d/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    house = gltf.scene.children[0];
    // renderer.render(scene, camera);
    animate();
  });
}
function animate() {
  requestAnimationFrame(animate);
  house.rotation.z += 0.004;
  renderer.render(scene, camera);
}
init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);
