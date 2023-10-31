import { Image, Center, Text, Box } from "@chakra-ui/react";
import DrawerLogin from "./Drawer/DrawerLogin";

function Start() {

    return (
        <>
            <Box w='100vw' bg='#7CBC74' p={2} align='rigth'>
                <DrawerLogin />
            </Box>
            <Center h='80vh' boxShadow='2xl' p={6} rounded='lg' m={3} spacing={3}>
                <Box mr={6} textAlign='center'>
                    <Text fontSize='4xl'  position='relative' >Esto es</Text>
                    <Text fontSize='8xl'  position='relative' >MIUV Pet</Text>
                    {/* <Text fontSize='2xl' position='relative' >Proyecto de graficación</Text> */}
                    <hr></hr> 
                    <Text fontSize='3xl'  position='relative' >Tendrás un Luzio como mascota virtual</Text>
                    <Text fontSize='3xl'  position='relative' >Tendrás que hacerte cargo de sus necesidades</Text>
                    <Text fontSize='3xl'  position='relative' >Si no le das atención podría haber malos resultados</Text>
                </Box>
                <Image h='60vh' src='https://lh3.googleusercontent.com/drive-viewer/AK7aPaAn2fh6JbaMbuWL7ts2IzBtGustXC56KTsojiHk8oi1l3zHC2Q-Bnzh_maYWPjJ3pkUo4ByJQOKjf9e3FGtsvqPXIZw=w1321-h636' alt='Modelo Luzio' />
            </Center>
        </>
    );
}

export default Start;