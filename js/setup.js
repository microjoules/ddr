/**
 * UBC CPSC 314 2023W2
 * Assignments Template setup
 */

/**
 * Creates a basic scene and returns necessary objects
 * to manipulate the scene, camera and render context.
 */
import * as THREE from './three.module.js';
import { OBJLoader } from './OBJLoader.js';
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';

function setup() {

    // Check WebGL Version
    if (!WEBGL.isWebGL2Available()) {
        document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
    }

    // Get the canvas element and its drawing context from the HTML document.
    const canvas = document.getElementById('webglcanvas');
    const context = canvas.getContext('webgl2');

    // Construct a THREEjs renderer from the canvas and context.
    const renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true });
    //renderer.setClearColor(0XD296FF); // blue background colour
    const scene = new THREE.Scene();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.outputEncoding = THREE.SRGBColorSpace;
    // renderer.toneMapping = THREE.NoToneMapping;

    // Load background image
    const textureLoader = new THREE.TextureLoader();
    // textureLoader.load('images/comic1.jpg', (texture) => {
    //     scene.background = texture;
    // });

    textureLoader.load('images/line.jpg', (texture) => {
        scene.background = texture;
    });

//     // Create a new WebGL renderer with the canvas and context.
// const renderer = new THREE.WebGLRenderer({ canvas, context, antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the renderer
// const scene = new THREE.Scene();

// // Load the background image
// const textureLoader = new THREE.TextureLoader();
// textureLoader.load('images/nightclub.png', function(texture) {
//     scene.background = texture; // Set the scene background to the loaded texture
// });


    // Set up the camera.
    const camera = new THREE.PerspectiveCamera(30.0, 1.0, 0.05, 200.0); // view angle, aspect ratio, near, far
    camera.position.set(15.0, 38.0, 60.0);
    camera.lookAt(scene.position);
    scene.add(camera);

    // Setup orbit controls for the camera.
    const controls = new OrbitControls(camera, canvas);
    controls.screenSpacePanning = true;
    controls.damping = 0.2;
    controls.autoRotate = false;

    // Update projection matrix based on the windows size.
    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    // World Coordinate Frame: other objects are defined with respect to it.
    const worldFrame = new THREE.AxesHelper(1);
    scene.add(worldFrame);

    // // Diffuse texture map (this defines the main colors of the floor)
    // const floorDiff = new THREE.TextureLoader().load('images/cobblestone_floor_diff.jpg');
    // // Ambient occlusion map
    // const floorAo = new THREE.TextureLoader().load('images/cobblestone_floor_ao.jpg');
    // // Displacement map
    // const floorDisp = new THREE.TextureLoader().load('images/cobblestone_floor_disp.jpg');
    // // Normal map
    // const floorNorm = new THREE.TextureLoader().load('images/cobblestone_floor_nor.jpg');
    // // Roughness map
    // const floorRoughness = new THREE.TextureLoader().load('images/cobblestone_floor_rough.jpg');

    // dance dance revolution floor
    const ddrTexture = new THREE.TextureLoader().load('images/ddr.jpg');
    ddrTexture.encoding = THREE.SRGBColorSpace;

    // const textureLoader = new THREE.TextureLoader();
    // const downEmissive = textureLoader.load('images/down-glow.jpg'); 
    // const rightEmissive = textureLoader.load('images/right-glow.jpg'); 
    // const upEmissive = textureLoader.load('images/up-glow.jpg'); 
    // const leftEmissive = textureLoader.load('images/left-glow.jpg'); 


    const floorMaterial = new THREE.MeshStandardMaterial({
        map: ddrTexture, 
        side: THREE.DoubleSide
    });

    // const downFloorMaterial = new THREE.MeshStandardMaterial({
    //     map: ddrTexture, 
    //     emissive: new THREE.Color("pink"), // Make it glow 
    //     emissiveMap: downEmissive, // Assign the emissive map
    //     emissiveIntensity: 5.0,
    //     side: THREE.DoubleSide
    // });

    // const upFloorMaterial = new THREE.MeshStandardMaterial({
    //     map: ddrTexture, 
    //     emissive: new THREE.Color(0xffffff), // Make it glow 
    //     emissiveMap: upEmissive, // Assign the emissive map
    //     emissiveIntensity: 10.0,
    //     side: THREE.DoubleSide
    // });

    // const leftFloorMaterial = new THREE.MeshStandardMaterial({
    //     map: ddrTexture, 
    //     emissive: new THREE.Color(0xffffff), // Make it glow 
    //     emissiveMap: leftEmissive, // Assign the emissive map
    //     emissiveIntensity: 10.0,
    //     side: THREE.DoubleSide
    // });

    // const rightFloorMaterial = new THREE.MeshStandardMaterial({
    //     map: ddrTexture, 
    //     emissive: new THREE.Color(0xffffff), // Make it glow 
    //     emissiveMap: rightEmissive, // Assign the emissive map
    //     emissiveIntensity: 10.0,
    //     side: THREE.DoubleSide
    // });


    // Create the floor geometry
    // const floorGeometry = new THREE.PlaneGeometry(30.0, 30.0);
    // // const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // const floor = new THREE.Mesh(floorGeometry, floorMaterial);

    // floor.rotation.x = -Math.PI / 2.0;
    // floor.position.y = -0.3;

    // scene.add(floor);
    // floor.parent = worldFrame;

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increase the intensity
    directionalLight.position.set(10, 20, 10); // Position it above the floor
    // scene.add(directionalLight);


//     //emmisive map
//     const textureLoader = new THREE.TextureLoader();
// const emissiveMap = textureLoader.load('images/pink-glow.jpg'); // Your emissive texture

// // Create the material with an emissive map
// const material = new THREE.MeshStandardMaterial({
//     color: 0xfc00ec, // Base color of the object
//     emissive: 0x000000, // Default emissive color (black = no emissive)
//     emissiveMap: emissiveMap, // Assign the emissive map
//     emissiveIntensity: 1, // Initially set to 0 (no glow)
//     transparent: true, // Allow transparency
// });

// // Create the object (e.g., a box or model)
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const mesh = new THREE.Mesh(floorGeometry, material);
// mesh.rotation.x = -Math.PI / 2.0;
//     mesh.position.y = -0.3;

// scene.add(mesh);



    // const floorMaterial = new THREE.MeshStandardMaterial({
    //     map: floorDiff,
    //     aoMap: floorAo,
    //     displacementMap: floorDisp,
    //     normalMap: floorNorm,
    //     roughnessMap: floorRoughness,
    //     side: THREE.DoubleSide
    // });
    // const floorGeometry = new THREE.PlaneGeometry(30.0, 30.0);
    // const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    // floor.rotation.x = -Math.PI / 2.0;
    // floor.position.y = -0.3;
    // scene.add(floor);
    // floor.parent = worldFrame;

    // Cast a weak ambient light to make the floor visible.
    const light = new THREE.AmbientLight(0xFFFFFF, 2);
    scene.add(light);

    return {
        renderer,
        scene,
        camera,
        worldFrame,
    };
}

/**
 * Utility function that loads obj files using THREE.OBJLoader
 * and places them in the scene using the given callback `place`.
 * 
 * The variable passed into the place callback is a THREE.Object3D.
 */
function loadAndPlaceOBJ(file, material, place) {
    const manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };

    const onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            const percentComplete = xhr.loaded / xhr.total * 100.0;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };

    const loader = new OBJLoader(manager);
    loader.load(file, function (object) {
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
            }
        });
        place(object);
    }, onProgress);
}

/**
 * Utility function that loads glb files 
 */
function traverseModelForBones(model) {
    model.traverse(function (object) {
        if (object.isSkinnedMesh) {
            const skeleton = object.skeleton;

            // Access the bones
            skeleton.bones.forEach(bone => {
                console.log('Bone name:', bone.name);
                console.log('Bone position:', bone.position);
            });
        }
    });
}

function loadAndPlaceGLB(file, place) {

    //TODO: implement this function to load the GLB model

    //instantiate loader
    const loader = new GLTFLoader();

    loader.load(
        //resource url
        file, 
        function(object) {
            place(object.scene);

            traverseModelForBones(object.scene);

            wagTail(object.scene);
        }
    )

}


export {setup, loadAndPlaceOBJ, loadAndPlaceGLB};
