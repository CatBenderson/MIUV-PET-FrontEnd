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
  Icon
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
import { useEffect, useState } from 'react';
import moment from 'moment/moment';
import DrawerLogin from "./Drawer/DrawerLogin";
import './Home.css';

function Home() {
  const [comida, setComida] = useState(100);
  const [diversion, setDiversion] = useState(100);
  const [salud, setSalud] = useState(100);
  const [sueño, setSueño] = useState(100);
  const [aux, setAux] = useState(0);
  const [sliderComidaValue, setSliderComidaValue] = useState(10);
  const [sliderDiversionValue, setSliderDiversionValue] = useState(10);
  const [sliderSaludValue, setSliderSaludValue] = useState(10);
  const [sliderSueñoValue, setSliderSueñoValue] = useState(10);

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

  function verificarDecremento(variable, valor) {
    if (valor > 0) {
      variable((prev) => prev - 1);
    }
  }

  function verificarAumento(setVariable, variable, cantidad) {
    if (variable + cantidad >= 100) {
      setVariable(100);
    } else {
      setVariable((prev) => prev + cantidad)
    }
  }

  function añadirComida() {
    verificarAumento(setComida, comida, sliderComidaValue);
  };
  function añadirDiversion() {
    verificarAumento(setDiversion, diversion, sliderDiversionValue);
  };
  function añadirSalud() {
    verificarAumento(setSalud, salud, sliderSaludValue);
  };
  function añadirSueño() {
    verificarAumento(setSueño, sueño, sliderSueñoValue);
  };

  function disminuir() {
    verificarDecremento(setComida, comida);
    verificarDecremento(setDiversion, diversion);
    verificarDecremento(setSalud, salud);
    verificarDecremento(setSueño, sueño);
    setAux(aux + 1)
  }

  useEffect(() => {
    setTimeout(() => {
      disminuir()
    }, 2000);
  }, [aux]);

  return (
    <>
      <Box w="100%" p={4} ml={5}>
        <Heading className='encabezado'>MIUV PET</Heading>
        <DrawerLogin />
      </Box>
      <Stack>
        <Box className='graficoPorcentaje' textAlign='center'>
          <CircularProgress className='graficoPorcentaje' value={comida} color='#2A7858' size='12vh' thickness='18px'>
            <CircularProgressLabel>{comida}%</CircularProgressLabel>
          </CircularProgress>
          <CircularProgress className='graficoPorcentaje' value={diversion} color='#FCD408' size='12vh' thickness='18px'>
            <CircularProgressLabel>{diversion}%</CircularProgressLabel>
          </CircularProgress>
          <CircularProgress className='graficoPorcentaje' value={salud} color='#7494AC' size='12vh' thickness='18px'>
            <CircularProgressLabel>{salud}%</CircularProgressLabel>
          </CircularProgress>
          <CircularProgress className='graficoPorcentaje' value={sueño} color='#7CBC74' size='12vh' thickness='18px'>
            <CircularProgressLabel>{sueño}%</CircularProgressLabel>
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
            <Heading>modelo luzio, apurate breayan</Heading>
          </GridItem>

        </Grid>
      </Stack>


    </>
  );
}

export default Home;
