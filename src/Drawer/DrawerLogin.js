import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { useRef } from 'react'


function DrawerLogin() {

  const discDrawer = useDisclosure()
  const discModalRegistrar = useDisclosure()
  const discModalLogin = useDisclosure()
  const firstField = useRef()

  return (
    <>
      <Button color='#2a7858' bgColor='#e0e7d7' m={1} onClick={discDrawer.onOpen}>
        Mi cuenta
      </Button>
      <Drawer
        isOpen={discDrawer.isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={discDrawer.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            ¡Regístrate o inicia sesión para comenzar a usar MIUV PET!
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <Button color='#2a7858' bgColor='#e0e7d7' w="17em" onClick={discModalRegistrar.onOpen}>Registrate</Button>
                <Modal isOpen={discModalRegistrar.isOpen} onClose={discModalRegistrar.onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>¡Regístrate!
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box>
                        <FormLabel htmlFor='nombreUsuario'>Nombre de usuario</FormLabel>
                        <Input
                          ref={firstField}
                          id='nombreUsuario'
                          placeholder='Ingresa tu nombre de usuario'
                        />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='correo'>Correo</FormLabel>
                        <InputGroup>
                          <Input
                            type='url'
                            id='correo'
                            placeholder='Ingresa tu correo'
                          />
                        </InputGroup>
                      </Box>
                      <Box>
                        <FormLabel htmlFor='contraseña'>Contraseña</FormLabel>
                        <InputGroup>
                          <Input
                            id='contraseña'
                            placeholder='Ingresa tu contraseña'
                          />
                        </InputGroup>
                      </Box>
                      <Box>
                        <FormLabel htmlFor='contraseña'>Confirma tu contraseña</FormLabel>
                        <InputGroup>
                          <Input
                            id='contraseñaConfirm'
                            placeholder='Confirma tu contraseña'
                          />
                        </InputGroup>
                      </Box>
                    </ModalBody>
                    <ModalFooter>
                    <Button color='#2a7858' bgColor='#e0e7d7' w="7em" m={1} >Cancelar</Button>
                      <Button color='#e0e7d7' bgColor='#2a7858' w="7em" m={1} onClick={discDrawer.onClose}>
                        Registrar
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
              <Box>
                <Button color='#e0e7d7' bgColor='#2a7858' w="17em" onClick={discModalLogin.onOpen}>Iniciar sesión</Button>
                <Modal isOpen={discModalLogin.isOpen} onClose={discModalLogin.onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Iniciar sesión
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Box>
                        <FormLabel htmlFor='nombreUsuario'>Nombre de usuario</FormLabel>
                        <Input
                          ref={firstField}
                          id='nombreUsuario'
                          placeholder='Ingresa tu nombre de usuario'
                        />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='contraseña'>Contraseña</FormLabel>
                        <InputGroup>
                          <Input
                            id='contraseña'
                            placeholder='Ingresa tu contraseña'
                          />
                        </InputGroup>
                      </Box>
                    </ModalBody>
                    <ModalFooter>
                      <Button color='#2a7858' bgColor='#e0e7d7' w="7em" m={1} >Cancelar</Button>
                      <Button color='#e0e7d7' bgColor='#2a7858' w="7em" m={1} onClick={discDrawer.onClose}>
                        Iniciar sesión
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DrawerLogin;