import React, {useEffect, useRef} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const Modelo3D = ({animationName, changeAnimation}) =>{    
    const mountRef = useRef(null);

    useEffect(()=>{
        let mixer, clips, action;

        //Canvas
        const currentRef = mountRef.current;
        const {clientWidth: width, clientHeight: height} = currentRef;

        //Escena, cámara y Renderizado
        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(20, width/height, 0.1, 100);
        camera.position.set(0,15,75);        
        scene.add(camera);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        currentRef.appendChild(renderer.domElement);

        //Controles Orbitales
        const orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;

        //Cambiar tamaño canvas
        const resize = () =>{
            renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
            camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", resize);

        //Cargar Modelo
        const gltfLoader = new GLTFLoader();
        gltfLoader.load(
            "./models/LuzioBeta.gltf",
            (gltf)=>{
                scene.add(gltf.scene);
                mixer = new THREE.AnimationMixer(gltf.scene);
                clips = gltf.animations;
                console.log("mixer", mixer);
                console.log("clips", clips);
            }
        )

        //Animar la escena
        const clock = new THREE.Clock();
        const animate = () =>{
            orbitControls.update();
            if(mixer){
                mixer.update(clock.getDelta());
            }
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
            renderer.setClearColor( 0xffffff, 0);

            //Parar la animación automáticamente
            if(action){
                if(action.time === action._clip.duration){
                    mixer.stopAllAction();
                    //changeAnimation(null)
                }
            }
        };

        //Luces del Modelo
        const ambientalLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientalLight);
        

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(6,6,6);
        scene.add(pointLight)

        const backgroundColor = new THREE.Color(0xffffff);
        scene.background = backgroundColor

        //Función para activar una animación en específico
        const startAnimation = (name) =>{
            if(mixer && animationName != null){                                
                mixer.stopAllAction();
                const clip = THREE.AnimationClip.findByName(clips, name);
                action = mixer.clipAction(clip);
                action.setLoop(THREE.LoopOnce, 1);
                action.play();
            }
        };
        document.getElementById('Saludar').addEventListener('click', ()=>{startAnimation("Saludar")})
        document.getElementById('Comer').addEventListener('click', ()=>{startAnimation("Saltar")})
        //Loop
        animate();
        
        return () =>{
            window.removeEventListener("resize", resize);
            currentRef.removeChild(renderer.domElement);
        };
    },[animationName]);

    return(
    <>
    <button id="Saludar">Saludar</button>
    <button id="Comer">Comer</button>    
    <div ref={mountRef} style={{ width: "100%", height: "100%" }}></div>    
    </>
    )
}

export default Modelo3D;