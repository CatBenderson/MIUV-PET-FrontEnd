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
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import * as PetServer from './Drawer/PetServer'

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

  };
  function añadirDiversion() {
    verificarAumento(sliderDiversionValue, "happiness");
  };
  function añadirSalud() {
    verificarAumento(sliderSaludValue, "health");
  };
  function añadirSueño() {
    verificarAumento(sliderSueñoValue, "energy");
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

  useEffect(() => {
    setTimeout(() => {
      disminuir()
      if(pet.energy==0 && pet.happiness==0 && pet.health ==0 && pet.hunger==0){
        alert("Luzio murió")
        cerrarSesion()
      }
    }, 2000);
  }, [aux]);


  return (
    <>
      <Box w="100%" p={4} ml={5}>
        <Heading className='encabezado'>MIUV PET</Heading>
        <Button color='#2a7858' bgColor='#e0e7d7' m={1} onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
        <Text fontSize={'xl'} >
          Tu mascota se llama:<b>{" " + pet.nickname}</b>
        </Text>
      </Box>
      <Stack>
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
                      min={5}
                      max={15}
                      step={5}
                      w='60%'>
                      <SliderTrack bg='#e0e7d7' >
                        <Box position='relative' right={10} />
                        <SliderFilledTrack bg='#2A7858' />
                      </SliderTrack>
                      <SliderThumb boxSize={4} />
                    </Slider>
                  </GridItem>
                  <GridItem>
                    <Button onClick={añadirComida}>
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
                    <Button onClick={añadirDiversion}>
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
                      min={5}
                      max={15}
                      step={5}
                      w='60%'>
                      <SliderTrack bg='#e0e7d7' >
                        <Box position='relative' right={10} />
                        <SliderFilledTrack bg='#7494AC' />
                      </SliderTrack>
                      <SliderThumb boxSize={4} />
                    </Slider>
                  </GridItem>
                  <GridItem>
                    <Button onClick={añadirSalud}>
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
                      min={5}
                      max={15}
                      step={5}
                      w='60%'>
                      <SliderTrack bg='#e0e7d7' >
                        <Box position='relative' right={10} />
                        <SliderFilledTrack bg='#7CBC74' />
                      </SliderTrack>
                      <SliderThumb boxSize={4} />
                    </Slider>
                  </GridItem>
                  <GridItem>
                    <Button onClick={añadirSueño}>
                      Añadir sueño
                    </Button>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem bgColor='black' colSpan={3} minHeight='67vh'>
            <Heading>Modelo Luzio</Heading>
          </GridItem>

        </Grid>
      </Stack>


    </>
  );
}

export default Home;
