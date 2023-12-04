import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading,
  Stack,
  Grid,
  GridItem,
  Icon,
  Text
} from '@chakra-ui/react'
import {
  TbApple,
  TbBandage,
  TbBed,
  TbBuildingHospital,
  TbCake,
  TbCoffee,
  TbDeviceGamepad2,
  TbEggFried,
  TbFirstAidKit,
  TbMoonStars,
  TbPingPong,
  TbSkateboarding
} from "react-icons/tb";
import moment from 'moment/moment';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import * as PetServer from './Drawer/PetServer'
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import background from "./Assets/images/Background2.jpg"
import audioFondo from "./Assets/Music/songSRC.mp3"
import soundComer from "./Assets/Music/Comer.mp3"
import soundSaltar from "./Assets/Music/Saltar.mp3"
import soundFlexionar from "./Assets/Music/Flexionar.mp3"
import soundGirar from "./Assets/Music/Girar.mp3"
import soundMorir from "./Assets/Music/Morir.mp3"

import './Home.css';

function Home() {
  const history = useNavigate();
  const location = useLocation();
  const [aux, setAux] = useState(0);
  const [sliderComidaValue, setSliderComidaValue] = useState(10);
  const [sliderDiversionValue, setSliderDiversionValue] = useState(10);
  const [sliderSaludValue, setSliderSaludValue] = useState(10);
  const [sliderSueñoValue, setSliderSueñoValue] = useState(10);
  const [pet, setPet] = useState({ id: null, name: null, nickname: "", hunger: 0, energy: 0, health: 0, happiness: 0, account: null })

  const audioFondoRef = useRef(new Audio(audioFondo));
  const [isPlayingAudioFondo, setIsPlayingAudioFondo] = useState(false);
  const [currentSound, setCurrentSound] = useState(null)  

  const sounds = [soundComer, soundSaltar, soundFlexionar, soundGirar, soundMorir]

  const playSound = (index) =>{
    if(currentSound){
      currentSound.pause();
      currentSound.currentTime = 0;
    }
    const newSound = new Audio(sounds[index]);
    newSound.play();
    setCurrentSound(newSound);
  }

  const handlerAudioFondo = () =>{    
    if(!isPlayingAudioFondo){
      audioFondoRef.current.play();
      audioFondoRef.current.volume = 0.5;
    }else{
      audioFondoRef.current.pause();
      audioFondoRef.current.currentTime = 0;
    }
    setIsPlayingAudioFondo(!isPlayingAudioFondo);
  }

  const mountRef = useRef(null);
  
  const handleSliderComidaChange = (valor) => {
    setSliderComidaValue(valor);
  };
  const handleSliderDiversionChange = (valor) => {
    setSliderDiversionValue(valor);
  };
  const handleSliderSaludChange = (valor) => {
    setSliderSaludValue(valor);
  };
  const handleSliderSueñoChange = (valor) => {
    setSliderSueñoValue(valor);
  };

  async function verificarDecremento(variable) {
    let aux = parseInt(pet[variable])
    if (aux > 0) {
      pet[variable] = aux - 1
    }
    try {
      const dataPet = await(await PetServer.actualizarPet(location.state.pet.id, pet))
    } catch (error) {
      console.log(error);
    }
  }

  async function verificarAumento(cantidad, variable) {
    let aux = parseInt(pet[variable]) + cantidad
    if (aux >= 100) {
      pet[variable] = 100
    } else {
      pet[variable] = aux
    }
    try {
      const dataPet = await (await PetServer.actualizarPet(location.state.pet.id, pet))
    } catch (error) {
      console.log(error);
    }
  }

  function añadirComida() {    
    verificarAumento(sliderComidaValue, "hunger");
    playSound(0);    
  };
  function añadirDiversion() {
    verificarAumento(sliderDiversionValue, "happiness");
    playSound(1);
  };
  function añadirSalud() {
    verificarAumento(sliderSaludValue, "health");
    playSound(2);
  };
  function añadirSueño() {
    verificarAumento(sliderSueñoValue, "energy");
    playSound(3);
  };

  function disminuir() {
    verificarDecremento("hunger");
    verificarDecremento("happiness");
    verificarDecremento("health");
    verificarDecremento("energy");
    setAux(aux + 1)
  }

  function cerrarSesion() {
    history("/")    
  }

  async function inicializar() {
    if(location.state.pet !=null){
      const dataPet = await (await PetServer.getPetById(location.state.pet.id))
      pet.account = dataPet.data[0].account
      pet.energy = dataPet.data[0].energy
      pet.happiness = dataPet.data[0].happiness
      pet.health = dataPet.data[0].health
      pet.hunger = dataPet.data[0].hunger
      pet.id = dataPet.data[0].id
      pet.name = dataPet.data[0].name
      pet.nickname = dataPet.data[0].nickname
    }else{
      alert("No puedes acceder a esta página. Regístrate o inicia sesión");
    }
  }

  useEffect(() => {
    inicializar()
  }, []);
  
  /*useEffect(() => {
    setTimeout(async () => {
      disminuir()
      if(pet.energy==0 && pet.happiness==0 && pet.health ==0 && pet.hunger==0){
        audioFondoRef.current.pause();
        audioFondoRef.current.currentTime = 0;
        setIsPlayingAudioFondo(!isPlayingAudioFondo);        
        playSound(4);
        await new Promise(resolve => setTimeout(resolve, 500));
        alert("Luzio murió");
        cerrarSesion();
      }      
    }, 2000);
  }, [aux]);*/

  useEffect(()=>{
    const intervalo = setInterval(async ()=>{
      disminuir()
      if(pet.energy==0 && pet.happiness==0 && pet.health ==0 && pet.hunger==0){
        audioFondoRef.current.pause();
        audioFondoRef.current.currentTime = 0;
        setIsPlayingAudioFondo(!isPlayingAudioFondo);        
        playSound(4);        
        await new Promise(resolve => setTimeout(resolve, 500));
        alert("Luzio murió");
        cerrarSesion();
      }
    },1000)
    return () =>{
      clearInterval(intervalo)
    }
  },[aux])

  useEffect(()=>{
    let mixer, clips, action;

    //Canvas
    const currentRef = mountRef.current;
    const {clientWidth: width, clientHeight: height} = currentRef;

    //Escena, cámara y Renderizado
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, width/height, 0.1, 1000);
    camera.position.z = 34;
    camera.position.y = 5;
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
    const personaje = new THREE.Group()
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        "./models/FinalModel.gltf",
        (gltf)=>{
          personaje.add(gltf.scene);
          personaje.position.y = -5;
          scene.add(personaje);
          mixer = new THREE.AnimationMixer(gltf.scene);
          clips = gltf.animations;                                  
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
            }
        }
    };

    //Luces del Modelo
    const ambientalLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientalLight);
    
    var loader = new THREE.TextureLoader();
    loader.load(background, function(texture) {
      scene.background = texture
    })
    

    //Función para activar una animación en específico
    const startAnimation = (name) =>{
        if(mixer){                                
            mixer.stopAllAction();
            const clip = THREE.AnimationClip.findByName(clips, name);
            action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopOnce, 1);
            action.play();
        }
    };    
    document.getElementById('Comer').addEventListener('click', ()=>{startAnimation("Comer")})
    document.getElementById('Saltar').addEventListener('click', ()=>{startAnimation("Saltar")})
    document.getElementById('Flexionar').addEventListener('click', ()=>{startAnimation("Flexionar")})
    document.getElementById('Girar').addEventListener('click', ()=>{startAnimation("Girar")})
        
    //Loop
    animate();
    
    return () =>{
        window.removeEventListener("resize", resize);
        currentRef.removeChild(renderer.domElement);
    };
  },[]);

  return (
    <>      
      <Box w="-moz-max-content" h="1" p={4} ml={5}>
        <Heading className='encabezado'>MIUV PET</Heading>
        <Button color='#2a7858' bgColor='#e0e7d7' m={1} onClick={cerrarSesion}>
          Cerrar sesión
        </Button>        
        <Text fontSize={'xl'} >
          Tu mascota se llama:<b>{" " + pet.nickname}</b>
        </Text>
        <Button color='#2a7858' bgColor='#e0e7d7' m={1} onClick={handlerAudioFondo}>
          {isPlayingAudioFondo ? 'Desactivar Música' : 'Activar Música'}
        </Button>
      </Box>
      <Stack marginTop="10">
        <Box className='graficoPorcentaje' textAlign='center'>
          <CircularProgress className='graficoPorcentaje' value={pet.hunger} color='#2A7858' size='12vh' thickness='18px'>
            <CircularProgressLabel>{pet.hunger}%</CircularProgressLabel>
          </CircularProgress>
          <CircularProgress className='graficoPorcentaje' value={pet.happiness} color='#FCD408' size='12vh' thickness='18px'>
            <CircularProgressLabel>{pet.happiness}%</CircularProgressLabel>
          </CircularProgress>
          <CircularProgress className='graficoPorcentaje' value={pet.health} color='#7494AC' size='12vh' thickness='18px'>
            <CircularProgressLabel>{pet.health}%</CircularProgressLabel>
          </CircularProgress>
          <CircularProgress className='graficoPorcentaje' value={pet.energy} color='#7CBC74' size='12vh' thickness='18px'>
            <CircularProgressLabel>{pet.energy}%</CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Grid
          bg='gray.50'
          templateColumns='repeat(4, 1fr)'
          gap={6}
          padding={1}
          textAlign='center'
          rounded='lg'
          color='gray.400'
        >
          <GridItem colSpan={1}>
            <Grid templateColumns='repeat(1, 4fr)' gap={2}>
              <GridItem>
                <Grid templateColumns='repeat(1,2fr)' gap={1}>
                  <GridItem>
                    <Grid templateColumns='repeat(3, 1fr)'>
                      <GridItem>
                        <Icon as={TbApple} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                      <GridItem >
                        <Icon as={TbEggFried} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                      <GridItem>
                        <Icon as={TbCake} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                    </Grid>
                  </GridItem>
                  <GridItem>
                    <Slider
                      value={sliderComidaValue}
                      onChange={handleSliderComidaChange}
                      min={2}
                      max={6}
                      step={2}
                      w='60%'>
                      <SliderTrack bg='#e0e7d7' >
                        <Box position='relative' right={10} />
                        <SliderFilledTrack bg='#2A7858' />
                      </SliderTrack>
                      <SliderThumb boxSize={4} />
                    </Slider>
                  </GridItem>
                  <GridItem>
                    <Button id="Comer" onClick={añadirComida}>
                      Añadir comida
                    </Button>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem>
                <Grid templateColumns='repeat(1,2fr)' gap={1}>
                  <GridItem>
                    <Grid templateColumns='repeat(3, 1fr)'>
                      <GridItem>
                        <Icon as={TbPingPong} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                      <GridItem >
                        <Icon as={TbSkateboarding} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                      <GridItem>
                        <Icon as={TbDeviceGamepad2} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                    </Grid>
                  </GridItem>
                  <GridItem>
                    <Slider
                      value={sliderDiversionValue}
                      onChange={handleSliderDiversionChange}
                      min={5}
                      max={15}
                      step={5}
                      w='60%'>
                      <SliderTrack bg='#e0e7d7' >
                        <Box position='relative' right={10} />
                        <SliderFilledTrack bg='#FCD408' />
                      </SliderTrack>
                      <SliderThumb boxSize={4} />
                    </Slider>
                  </GridItem>
                  <GridItem>
                    <Button id="Saltar" onClick={añadirDiversion}>
                      Añadir diversión
                    </Button>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem>
                <Grid templateColumns='repeat(1,2fr)' gap={1}>
                  <GridItem>
                    <Grid templateColumns='repeat(3, 1fr)'>
                      <GridItem>
                        <Icon as={TbBandage} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                      <GridItem >
                        <Icon as={TbFirstAidKit} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                      <GridItem>
                        <Icon as={TbBuildingHospital} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                    </Grid>
                  </GridItem>
                  <GridItem>
                    <Slider
                      value={sliderSaludValue}
                      onChange={handleSliderSaludChange}
                      min={4}
                      max={12}
                      step={3}
                      w='60%'>
                      <SliderTrack bg='#e0e7d7' >
                        <Box position='relative' right={10} />
                        <SliderFilledTrack bg='#7494AC' />
                      </SliderTrack>
                      <SliderThumb boxSize={4} />
                    </Slider>
                  </GridItem>
                  <GridItem>
                    <Button id="Flexionar" onClick={añadirSalud}>
                      Añadir salud
                    </Button>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem>
                <Grid templateColumns='repeat(1,2fr)' gap={1}>
                  <GridItem>
                    <Grid templateColumns='repeat(3, 1fr)'>
                      <GridItem>
                        <Icon as={TbCoffee} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                      <GridItem >
                        <Icon as={TbBed} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                      <GridItem>
                        <Icon as={TbMoonStars} boxSize={6} color="#7cbc74"></Icon>
                      </GridItem>
                    </Grid>
                  </GridItem>
                  <GridItem>
                    <Slider
                      value={sliderSueñoValue}
                      onChange={handleSliderSueñoChange}
                      min={3}
                      max={9}
                      step={3}
                      w='60%'>
                      <SliderTrack bg='#e0e7d7' >
                        <Box position='relative' right={10} />
                        <SliderFilledTrack bg='#7CBC74' />
                      </SliderTrack>
                      <SliderThumb boxSize={4} />
                    </Slider>
                  </GridItem>
                  <GridItem>
                    <Button id="Girar" onClick={añadirSueño}>
                      Añadir sueño
                    </Button>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem colSpan={3} minHeight='67vh'>
            
            <div ref={mountRef} style={{ width: "100%", height: "100%" }}></div>
          
          </GridItem>
        </Grid>
      </Stack>


    </>
  );
}

export default Home;
