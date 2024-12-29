

import { setup, loadAndPlaceGLB } from "./js/setup.js";
import * as THREE from "./js/three.module.js";
import { SourceLoader } from "./js/SourceLoader.js";
import { THREEx } from "./js/KeyboardState.js";
import * as BufferGeometryUtils from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/utils/BufferGeometryUtils.js';

// Setup and return the scene and related objects.
const { renderer, scene, camera, worldFrame } = setup();

// Used THREE.Clock for animation
var clock = new THREE.Clock();

// Initialize uniforms
const eyeMaterial = new THREE.ShaderMaterial();


// Load shaders.
const shaderFiles = [
  "glsl/eye.vs.glsl",
  "glsl/eye.fs.glsl",
];

new SourceLoader().load(shaderFiles, function (shaders) {

  eyeMaterial.vertexShader = shaders["glsl/eye.vs.glsl"];
  eyeMaterial.fragmentShader = shaders["glsl/eye.fs.glsl"];
  eyeMaterial.needsUpdate = true;
});

// Load and place the fox geometry
// Look at the definition of loadOBJ to familiarize yourself with how each parameter
// affects the loaded object.

// Example for an eye ball
// TODO: Create two eye ball meshes from the same geometry
const eyeGeometry = new THREE.SphereGeometry(1.0, 32.0, 32.0);
const eyeScale = 0.5;

const leftEyeSocket = new THREE.Object3D();
const leftEyeSocketPos = new THREE.Vector3(-0.8, 9.2, 9.5);
leftEyeSocket.position.copy(leftEyeSocketPos);

const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
leftEye.scale.copy(new THREE.Vector3(eyeScale, eyeScale, eyeScale));
leftEyeSocket.add(leftEye);

const rightEyeSocket = new THREE.Object3D();
const rightEyeSocketPos = new THREE.Vector3(0.8, 9.2, 9.5);
rightEyeSocket.position.copy(rightEyeSocketPos);

const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
rightEye.scale.copy(new THREE.Vector3(eyeScale, eyeScale, eyeScale));
rightEyeSocket.add(rightEye);

scene.add(leftEyeSocket);
scene.add(rightEyeSocket);


// TODO: Load and place the Fox geometry in GLB format
let fox = null;
let foxFan = null;
let foxFan2 = null;


loadAndPlaceGLB('glb/Fox.glb', function (loadedFox) {
  fox = loadedFox;
  fox.position.set(0.0, 0.0, 1.0);
  fox.scale.set(0.15, 0.15, 0.15);
  fox.parent = worldFrame;
  scene.add(fox);
});

//fox fans
loadAndPlaceGLB('glb/Fox.glb', function (loadedFox) {
  foxFan = loadedFox;
  foxFan.position.set(25.0, -4.0, -20.0);
  foxFan.rotation.y = -Math.PI / 6;
  foxFan.scale.set(0.12, 0.11, 0.12);
  foxFan.parent = worldFrame;
  scene.add(foxFan);
});

loadAndPlaceGLB('glb/Fox.glb', function (loadedFox) {
  foxFan2 = loadedFox;
  foxFan2.position.set(32.0, -4.0, -20.0);
  foxFan2.rotation.y = -Math.PI / 6;
  foxFan2.scale.set(0.12, 0.11, 0.12);
  foxFan2.parent = worldFrame;
  scene.add(foxFan2);
});

function npcMovement(foxFan) {
  const time = clock.getElapsedTime();

  const spineBone = foxFan.getObjectByName('b_Spine01_02');
  const headBone = foxFan.getObjectByName('b_Head_05');
  const rightHand = foxFan.getObjectByName('b_RightForeArm_07');

  if (spineBone) {
    //foxFan.position.y += Math.sin(clock.getElapsedTime * 3) * 0.05;
    spineBone.rotation.z = Math.PI / 6.0;
    headBone.rotation.z = - Math.PI;
    rightHand.rotation.z = Math.abs(Math.sin(time * 5));
    headBone.rotation.z = -Math.PI / 2 + Math.sin(time * 8) * 0.3;

  }
}

function npcMovement2(foxFan2) {
  const time = clock.getElapsedTime();

  const spineBone = foxFan2.getObjectByName('b_Spine01_02');
  const headBone = foxFan2.getObjectByName('b_Head_05');
  const rightHand = foxFan2.getObjectByName('b_RightForeArm_07');

  if (spineBone) {
    //foxFan.position.y += Math.sin(clock.getElapsedTime * 3) * 0.05;
    spineBone.rotation.z = Math.PI / 6.0;
    headBone.rotation.z = - Math.PI;
    rightHand.rotation.z = Math.abs(Math.sin(time * 5));
    headBone.rotation.z = -Math.PI / 2 + Math.sin(time * 8) * 0.3;

  }
}

let wagCondition = true;
let isLoser = false;
function sadLoser(foxObject) {
  const spineBone = foxObject.getObjectByName('b_Root_00');
  const leftLeg1 = foxObject.getObjectByName('b_LeftLeg01_015');
  const frontRight = foxObject.getObjectByName('b_RightUpperArm_06');
  const frontLeft = foxObject.getObjectByName('b_LeftUpperArm_09');
  const rightBack = foxObject.getObjectByName('b_RightLeg01_019');
  const neck = foxObject.getObjectByName('b_Neck_04');
  const head = foxObject.getObjectByName('b_Head_05');

  spineBone.position.y -= 35.0;
  leftLeg1.rotation.y = -Math.PI / 2.0 + Math.PI / 10.0;
  frontLeft.rotation.x = Math.PI / 2.0 - Math.PI / 10.0;
  rightBack.rotation.y = Math.PI / 2.0 - Math.PI / 10.0;
  frontRight.rotation.x = -Math.PI / 2.0 + Math.PI / 10.0;
  head.position.y -= 9.0;
  neck.position.y -= 6.0;

  rightEyeSocket.position.set(-0.8, 2.2, 10.0);
  leftEyeSocket.position.set(0.8, 2.2, 10.0);

  // isLoser = true;
  wagCondition = false;
}



// dance dance revolution floor
const ddrTexture = new THREE.TextureLoader().load('images/ddr.jpg');
const textureLoader = new THREE.TextureLoader();
const downEmissive = textureLoader.load('images/down-glow.jpg');
const rightEmissive = textureLoader.load('images/right-glow.jpg');
const upEmissive = textureLoader.load('images/up-glow.jpg');
const leftEmissive = textureLoader.load('images/left-glow.jpg');
const bothSidesEmissive = textureLoader.load('images/bothsides-glow.jpg');
const allSidesEmissive = textureLoader.load('images/all-glow.jpg');

const floorMaterial = new THREE.MeshStandardMaterial({
  map: ddrTexture,
  side: THREE.DoubleSide
});

const downFloorMaterial = new THREE.MeshStandardMaterial({
  map: ddrTexture,
  emissive: new THREE.Color("pink"), // Make it glow 
  emissiveMap: downEmissive, // Assign the emissive map
  emissiveIntensity: 5.0,
  side: THREE.DoubleSide
});

const upFloorMaterial = new THREE.MeshStandardMaterial({
  map: ddrTexture,
  emissive: new THREE.Color(0xffffff), // Make it glow 
  emissiveMap: upEmissive, // Assign the emissive map
  emissiveIntensity: 10.0,
  side: THREE.DoubleSide
});

const leftFloorMaterial = new THREE.MeshStandardMaterial({
  map: ddrTexture,
  emissive: new THREE.Color(0xffffff), // Make it glow 
  emissiveMap: leftEmissive, // Assign the emissive map
  emissiveIntensity: 10.0,
  side: THREE.DoubleSide
});

const rightFloorMaterial = new THREE.MeshStandardMaterial({
  map: ddrTexture,
  emissive: new THREE.Color(0xffffff), // Make it glow 
  emissiveMap: rightEmissive, // Assign the emissive map
  emissiveIntensity: 10.0,
  side: THREE.DoubleSide
});
const bothSidesFloorMaterial = new THREE.MeshStandardMaterial({
  map: ddrTexture,
  emissive: new THREE.Color(0xffffff), // Make it glow 
  emissiveMap: bothSidesEmissive, // Assign the emissive map
  emissiveIntensity: 10.0,
  side: THREE.DoubleSide
});
const allSidesFloorMaterial = new THREE.MeshStandardMaterial({
  map: ddrTexture,
  emissive: new THREE.Color(0xffffff), // Make it glow 
  emissiveMap: allSidesEmissive, // Assign the emissive map
  emissiveIntensity: 10.0,
  side: THREE.DoubleSide
});

let currentFloor = null;
function createFloor(material) {
  // Remove the old floor if it exists
  if (currentFloor) {
    scene.remove(currentFloor);
  }

  const floorGeometry = new THREE.PlaneGeometry(30.0, 30.0);
  let floor;

  // Correctly assign the material based on the input
  if (material === "left") {
    floor = new THREE.Mesh(floorGeometry, leftFloorMaterial);
  } else if (material === "right") {
    floor = new THREE.Mesh(floorGeometry, rightFloorMaterial);
  } else if (material === "up") {
    floor = new THREE.Mesh(floorGeometry, upFloorMaterial);
  } else if (material === "down") {
    floor = new THREE.Mesh(floorGeometry, downFloorMaterial);
  } else if (material === "bothsides") {
    floor = new THREE.Mesh(floorGeometry, bothSidesFloorMaterial);
  } else if (material === "allsides") {
    floor = new THREE.Mesh(floorGeometry, allSidesFloorMaterial);
  } else {
    floor = new THREE.Mesh(floorGeometry, floorMaterial); // Default material
  }

  floor.rotation.x = -Math.PI / 2.0;
  floor.position.y = -0.3;

  // Add the new floor to the scene
  scene.add(floor);
  floor.parent = worldFrame;

  // Update the global current floor reference
  currentFloor = floor;
}

createFloor("reset");



//tail animation
function wagTail(foxObject) {

  const time = clock.getElapsedTime();
  let speed = 3.0;

  // Access each tail bone by name (from base to tip)
  const tailBone1 = foxObject.getObjectByName('b_Tail03_014');
  const tailBone2 = foxObject.getObjectByName('b_Tail02_013');
  const tailBone3 = foxObject.getObjectByName('b_Tail01_012');

  if (tailBone1 && tailBone2 && tailBone3) {
    // tilt tail upwards
    tailBone3.rotation.z = Math.PI / 4.0;
    // wag tail from the base tail bone 
    tailBone3.rotation.y = Math.sin(time * speed);
  }
}
window.wagTail = wagTail;


let steppedLeft = false;
let steppedRight = false;
let steppedForward = false;
let steppedBackward = false;
let steppedBothSides = false;
let steppedAll = false;



// STEPPING ANIMATION 
function stepLeft(foxObject) {
  resetLeg(foxObject);


  if (steppedLeft) return;

  const leftLeg1 = foxObject.getObjectByName('b_LeftLeg01_015');
  const leftLeg2 = foxObject.getObjectByName('b_LeftLeg02_016');

  if (leftLeg1 && leftLeg2) {
    createFloor("left");
    leftLeg1.rotation.y = -Math.PI / 4.0;
    leftLeg1.position.y -= 35.0;
    leftLeg2.position.y -= 35.0;
  }
  steppedLeft = true;

  //  setTimeout(() => resetLeg(foxObject), 200);
}

function stepRight(foxObject) {
  resetLeg(foxObject);

  if (steppedRight) return;
  const frontLeg2 = foxObject.getObjectByName('b_RightUpperArm_06');

  if (frontLeg2) {
    createFloor("right");
    frontLeg2.rotation.x = -Math.PI / 3.0;
    frontLeg2.position.y -= 20.0;

  }
  steppedRight = true;
  // setTimeout(() => resetLeg(foxObject), 200);
}

function stepForward(foxObject) {
  resetLeg(foxObject);

  if (steppedForward) return;
  const frontLeg1 = foxObject.getObjectByName('b_LeftUpperArm_09');

  if (frontLeg1) {
    createFloor("up");
    frontLeg1.rotation.z = -Math.PI / 3.0;
    frontLeg1.position.y -= 8.0;
  }
  steppedForward = true;
  // setTimeout(() => resetLeg(foxObject), 200);
}

function stepBackward(foxObject) {
  resetLeg(foxObject);

  if (steppedBackward) return;

  const rightLeg1 = foxObject.getObjectByName('b_RightLeg01_019');
  const rightLeg2 = foxObject.getObjectByName('b_RightLeg02_020');

  if (rightLeg1 && rightLeg2) {
    createFloor("down");
    rightLeg1.rotation.z = Math.PI;
    rightLeg1.position.x -= 1.0;
  }
  steppedBackward = true;
  // setTimeout(() => resetLeg(foxObject), 200);
}

function stepBothSides(foxObject) {
  resetLeg(foxObject);

  if (steppedBothSides) return;

  const leftLeg1 = foxObject.getObjectByName('b_LeftLeg01_015');
  const leftLeg2 = foxObject.getObjectByName('b_LeftLeg02_016');
  const rightLeg1 = foxObject.getObjectByName('b_RightLeg01_019');
  const rightLeg2 = foxObject.getObjectByName('b_RightLeg02_020');

  if (leftLeg1 && leftLeg2 && rightLeg1 && rightLeg2) {
    createFloor("bothsides");
    leftLeg1.rotation.y = -Math.PI / 4.0;
    leftLeg1.position.y -= 35.0;
    leftLeg2.position.y -= 35.0;

    rightLeg1.rotation.y = Math.PI / 4.0;
    rightLeg1.position.y -= 35.0;
    rightLeg2.position.y -= 35.0;

  }
  steppedBothSides = true;
  steppedLeft = true;
  steppedRight = true;

  //  setTimeout(() => resetLeg(foxObject), 200);
}

function stepAll(foxObject) {
  resetLeg(foxObject);

  if (steppedAll) return;

  const frontLeg2 = foxObject.getObjectByName('b_RightUpperArm_06');
  const leftLeg1 = foxObject.getObjectByName('b_LeftLeg01_015');
  const leftLeg2 = foxObject.getObjectByName('b_LeftLeg02_016');
  const frontLeg1 = foxObject.getObjectByName('b_LeftUpperArm_09');
  const rightLeg1 = foxObject.getObjectByName('b_RightLeg01_019');

  if (rightLeg1 && frontLeg2 && leftLeg1 && leftLeg2 && frontLeg1) {
    createFloor("allsides");
    frontLeg2.rotation.x = -Math.PI / 3.0;
    frontLeg2.position.y -= 20.0;
    leftLeg1.rotation.y = -Math.PI / 4.0;
    leftLeg1.position.y -= 35.0;
    leftLeg2.position.y -= 35.0;
    frontLeg1.rotation.z = -Math.PI / 3.0;
    frontLeg1.position.y -= 8.0;
    rightLeg1.rotation.z = Math.PI;
    rightLeg1.position.x -= 1.0;
  }

  steppedAll = true;
  steppedLeft = true;
  steppedRight = true;
  steppedForward = true;
  steppedBackward = true;
  steppedBothSides = true;

}

function resetLeg(foxObject) {
  createFloor("reset");
  if (steppedLeft || steppedRight || steppedForward || steppedBackward || steppedBothSides || isLoser) {
    const leftLeg1 = foxObject.getObjectByName('b_LeftLeg01_015');
    const leftLeg2 = foxObject.getObjectByName('b_LeftLeg02_016');
    const rightLeg1 = foxObject.getObjectByName('b_RightLeg01_019');
    const rightLeg2 = foxObject.getObjectByName('b_RightLeg02_020');
    const frontLeg1 = foxObject.getObjectByName('b_LeftUpperArm_09');
    const frontLeg2 = foxObject.getObjectByName('b_RightUpperArm_06');
    const neck = foxObject.getObjectByName('b_Neck_04');
    const head = foxObject.getObjectByName('b_Head_05');
    const spineBone = foxObject.getObjectByName('b_Root_00');
    const frontLeft = foxObject.getObjectByName('b_LeftUpperArm_09');

    neck.position.y = 0;
    head.position.y = 0;
    spineBone.position.y = 0;
    frontLeg2.rotation.x = 0.0;
    frontLeg2.position.y = -4.297;
    leftLeg1.rotation.y = 0.0;
    leftLeg1.position.y = 5.154;
    leftLeg2.position.y = 0;
    rightLeg1.rotation.y = 0;
    rightLeg1.position.y = 5.154;
    rightLeg2.position.y = 0;
    frontLeg1.rotation.z = -1.585;
    frontLeg1.position.y = -4.297;
    rightLeg1.rotation.z = -2.65;
    rightLeg1.position.x = 4.81;
    rightEyeSocket.position.set(0.8, 9.2, 9.5);
    leftEyeSocket.position.set(-0.8, 9.2, 9.5);
    frontLeft.rotation.x = 0.0;

  }

  steppedForward = false;
  steppedRight = false;
  steppedLeft = false;
  steppedBackward = false;
  steppedBothSides = false;
  steppedAll = false;
  isLoser = false;

}




// DDR arrows
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [
  { src: 'images/up-arrow.png', key: 'up' },
  { src: 'images/down-arrow.png', key: 'down' },
  { src: 'images/left-arrow.png', key: 'left' },
  { src: 'images/right-arrow.png', key: 'right' },
  { src: 'images/both-sides.png', key: 'right' },
];

let score = 0;
let currentImages = []; // Store current images and their positions
let lastSpawnTime = 0; // To track when the last image was spawned
let minSpawnInterval = 20; // Minimum time between spawns (in ms)

// Position and size for spawned images
const spawnedImageWidth = 500; // Smaller width for the spawned images
const spawnedImageHeight = 100; // Smaller height for the spawned images

// Function to spawn new images
function spawnImage() {
  const currentTime = Date.now();
  let time = clock.getElapsedTime();

  minSpawnInterval = 700 - (10 * time);

  // Check if enough time has passed since the last spawn
  if (currentTime - lastSpawnTime < minSpawnInterval) {
    return; // Don't  spawn if it's too soon
  }

  // Update the last spawn time
  lastSpawnTime = currentTime;

  // Select a random image from the images array
  const randomImageIndex = Math.floor(Math.random() * images.length);
  const selectedImage = images[randomImageIndex];

  // Define the starting position for the new image (from the bottom, left side)
  const startPositionX = 10; // A constant X position near the left side
  const startPositionY = canvas.height; // Start from the bottom of the screen

  // Add the new image to the currentImages array
  currentImages.push({
    image: new Image(),
    x: startPositionX,
    y: startPositionY,
    key: selectedImage.key,
  });
  // Load the image source
  currentImages[currentImages.length - 1].image.src = selectedImage.src;
}

let missCounter = 0;
let gameStarted = false;
// Function to move images up the screen
function moveImages() {
  for (let i = 0; i < currentImages.length; i++) {
    currentImages[i].y -= 3; // Move upward by 5 pixels per frame

    // Remove the image if it goes off the screen (past the top)
    if (currentImages[i].y + spawnedImageHeight < 0) {
      currentImages.splice(i, 1);
      i--; // Adjust the index since we removed an item from the array
      missCounter++;
      displayMissMessage();
      if (missCounter >= 7) {
        displayLoseMessage();
        gameStarted = false;
        score = 0;
        drawImages();
        sadLoser(fox);
        document.getElementById("startMessage").style.display = "block";
        currentImages.splice(0, currentImages.length);
      }
    }
  }
}

window.addEventListener('resize', () => {
  // Adjust canvas size if needed, then re-render score if position shifts
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawScore();  // Redraw the score after resizing
});

// Function to draw images on the canvas
function drawImages() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw the spawned images
  for (let i = 0; i < currentImages.length; i++) {
    ctx.drawImage(currentImages[i].image, currentImages[i].x, currentImages[i].y, spawnedImageWidth, spawnedImageHeight);
  }

  // draw score
  ctx.font = '30px "Anton", sans-serif';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'right';
  ctx.fillText(`SCORE: ${score}`, 1350, 500);
}

// Function to update the game state
function updateGame() {
  moveImages();
  drawImages();
}

// Function to start spawning images at regular intervals
function startSpawning() {

  setInterval(spawnImage, 20); // spawn rate
}

//instructions
document.getElementById("startMessage").style.display = "block";

function displayPerfectMessage() {
  const message = document.getElementById("perfectMessage");
  message.style.display = "block";

  // Hide the message after 1 second
  setTimeout(() => {
    message.style.display = "none";
  }, 1000);
}

function displayGreatMessage() {
  const message = document.getElementById("greatMessage");
  message.style.display = "block";

  // Hide the message after 1 second
  setTimeout(() => {
    message.style.display = "none";
  }, 1000);
}

function displayMissMessage() {
  const message = document.getElementById("missMessage");
  message.style.display = "block";

  // Hide the message after 1 second
  setTimeout(() => {
    message.style.display = "none";
  }, 1000);
}

function displayLoseMessage() {
  const message = document.getElementById("loseMessage");
  message.style.display = "block";

  // Hide the message after 1 second
  setTimeout(() => {
    message.style.display = "none";
  }, 4000);
}

// Listen to keyboard events.
const keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("left") && keyboard.pressed("right") && keyboard.pressed("up") && keyboard.pressed("down")) {
    stepAll(fox);
  } else if (keyboard.pressed("left") && keyboard.pressed("right")) {
    stepBothSides(fox);
  } else if (keyboard.pressed("left")) {
    stepLeft(fox);
  }
  else if (keyboard.pressed("right")) {
    stepRight(fox);
  }
  else if (keyboard.pressed("up")) {
    stepForward(fox);
  }
  else if (keyboard.pressed("down")) {
    stepBackward(fox);
  } else {
    resetLeg(fox);
  }

  for (let i = 0; i < currentImages.length; i++) {

    if ((keyboard.pressed(currentImages[i].key)) && (currentImages[i].y <= 50)) {
      score++;
      console.log("Score:", score);

      displayPerfectMessage();

      // Remove the matched image
      currentImages.splice(i, 1);
      i--; // Adjust the index since we removed an item from the array
      // break;
    } else if ((keyboard.pressed(currentImages[i].key)) && (currentImages[i].y <= 100)) {
      score++;
      console.log("Score:", score);

      displayGreatMessage();

      // Remove the matched image
      currentImages.splice(i, 1);
      i--; // Adjust the index since we removed an item from the array
      // break;
    }


  }

}

//space bar listener
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && !gameStarted) {
    clock.elapsedTime = 0;
    wagCondition = true;
    isLoser = true;
    resetLeg(fox);
    gameStarted = true;
    console.log("Game Started!");
    gameLoop();
    startSpawning();
    document.getElementById("startMessage").style.display = "none";
    // Reset misses when the game starts
    missCounter = 0;
  }
});

// Start the game loop
function gameLoop() {
  if (!gameStarted) {
    return;
  }

  updateGame();
  requestAnimationFrame(gameLoop);
}


const spotlight = new THREE.SpotLight(0xffffff, 300); // White light, intensity of 1
spotlight.position.set(0, 20, 0); // Position it above the fox (adjust y for height)
spotlight.angle = Math.PI;
spotlight.penumbra = 0.5;
spotlight.decay = 1.7;
spotlight.distance = 100;
spotlight.target.position.set(0, 0, 0);
scene.add(spotlight);

//disco ball 
const dummy = new THREE.Object3D();
const texture = new THREE.TextureLoader().load('https://assets.codepen.io/959327/matcap-crystal.png');
const mirrorMaterial = new THREE.MeshMatcapMaterial({
  matcap: texture
});

const objects = [{
  geometry: new THREE.IcosahedronGeometry(0.5, 3),
  mirrorSize: .11,
}];

const idx = 0;

let geometryOriginal = objects[idx].geometry;
geometryOriginal.deleteAttribute('normal');
geometryOriginal.deleteAttribute('uv');
geometryOriginal = BufferGeometryUtils.mergeVertices(geometryOriginal);
geometryOriginal.computeVertexNormals();

const mirrorGeometry = new THREE.PlaneGeometry(objects[idx].mirrorSize, objects[idx].mirrorSize);
let instancedMirrorMesh = new THREE.InstancedMesh(
  mirrorGeometry,
  mirrorMaterial,
  geometryOriginal.attributes.position.count
);

const positions = geometryOriginal.attributes.position.array;
const normals = geometryOriginal.attributes.normal.array;
for (let i = 0; i < positions.length; i += 3) {
  dummy.position.set(positions[i], positions[i + 1], positions[i + 2]);
  dummy.lookAt(positions[i] + normals[i], positions[i + 1] + normals[i + 1], positions[i + 2] + normals[i + 2]);
  dummy.updateMatrix();
  instancedMirrorMesh.setMatrixAt(i / 3, dummy.matrix);
}

const obj = new THREE.Group();
const innerGeometry = new THREE.IcosahedronGeometry(0.49, 3);
const ballInnerMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
const innerMesh = new THREE.Mesh(
  innerGeometry,
  ballInnerMaterial
);
obj.add(innerMesh, instancedMirrorMesh);
obj.position.set(15, 16, 0);
obj.scale.set(5, 5, 5);
scene.add(obj);

function rotateDiscoBall() {
  obj.rotation.y += Math.PI / 400;
}

// Setup update callback
function update() {
  rotateDiscoBall();
  if (fox && wagCondition) {
    wagTail(fox);
  }

  if (foxFan) {
    npcMovement(foxFan);
  }
  if (foxFan2) {
    npcMovement2(foxFan2);
  }

  checkKeyboard();

  // Requests the next update call, this creates a loop
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

// Start the animation loop.
update();
