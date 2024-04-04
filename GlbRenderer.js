import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function RenderRotatingOnHtmlElement(target, glbFilePath){
    const loader = new GLTFLoader();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    SetupScene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    target.appendChild( renderer.domElement );

    var model;
    loader.load( glbFilePath, function ( gltf ) {
        model = gltf
    	scene.add( model.scene );
        animate();

    }, undefined, function ( error ) {
    	console.error( error );

    } );

    function animate() {
        var millisecondsToWait = 20;
        setTimeout(function() {
            model.scene.rotation.x += 0.01
            model.scene.rotation.y += 0.01
            model.scene.rotation.z += 0.01
            renderer.render( scene, camera );
            animate();
        }, millisecondsToWait);
    }

    function SetupScene() {
        // scene
        scene.background = new THREE.Color( 0xeeeeee );

        // camera
        camera.position.set(5,0,10);

        // light
        CreateSceneLight(100, 100, 100);
        CreateSceneLight(-100, -100, -100);
    }

    function CreateSceneLight(x, y, z) {
        var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
        directionalLight.position.set(x, y, z );
        scene.add( directionalLight );
    }
}

export {RenderRotatingOnHtmlElement};