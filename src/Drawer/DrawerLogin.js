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
  ModalCloseButton,
  InputRightElement
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import * as AccountServer from './AccountServer'
import * as PetServer from './PetServer'


function DrawerLogin() {

  const firstField = useRef()
  const history = useNavigate();
  const discDrawer = useDisclosure()
  const discModalLogin = useDisclosure()
  const discModalRegistrar = useDisclosure()
  const [show, setShow] = useState(false)
  const [usuario, setUsuario] = useState({ name: null, password: null })
  const [usuarioNuevo, setUsuarioNuevo] = useState({ name: null, password: null, email: null })
  const [pet, setPet] = useState({ id: null,name: "Luzio", nickname: null, hunger: 75, energy: 75, health: 75, happiness: 75, account: null })

  const handleClickPassword = () => setShow(!show)

  const handleInputChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleInputChangeNuevo = (e) => {
    setUsuarioNuevo({ ...usuarioNuevo, [e.target.name]: e.target.value });
  };

  const handleInputChangePet = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };

  async function obtenerCuenta() {
    try {
      const dataAccount = await (await AccountServer.getAccountByName(usuario.name));
      if (dataAccount.status === "Success") {
        if (dataAccount.data[0].password === usuario.password) {
          const dataPet = await (await PetServer.getPetByAccount(dataAccount.data[0].id))
          history('/home', {
            state: {
              account: dataAccount.data[0],
              pet: dataPet.data[0]
            }
          });
          discModalLogin.onClose()
          discDrawer.onClose()
        } else {
          alert("Contraseña incorrecta")
        }
      } else if (dataAccount.message != null) {
        alert("Nombre de usuario no registrado")
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function registrarUsuario() {
    if (document.getElementById("contraseñaConfirm").value === usuarioNuevo.password) {
      try {
        let banEmail = false
        let banName = false
        const accounts = await (await AccountServer.getAllAccounts())
        accounts.data.forEach(u => {
          if (u.email === usuarioNuevo.email) {
            banEmail = true;
          }
          if (u.name === usuarioNuevo.name) {
            banName = true;
          }

        })

        if (!banEmail) {
          if (!banName) {
            const data = await (await AccountServer.registrarAccount(usuarioNuevo))
            const dataAccount = await (await AccountServer.getAccountByName(usuarioNuevo.name))
            if (data.status === "Success") {
              pet.account = dataAccount.data[0].id
              const petRegister = await (await PetServer.registrarPet(pet))
              const dataPet = await (await PetServer.getPetByAccount(dataAccount.data[0].id))
              history('/home', {
                state: {
                  account: dataAccount.data[0],
                  pet: dataPet.data[0]
                }
              });
              discModalRegistrar.onClose()
              discDrawer.onClose()
            }
          } else {
            alert("Usuario ya registrado")
          }
        } else {
          alert("Correo ya registrado")
        }

      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Las contraseñas no coinciden")
    }
  }

  function comprobarCuenta() {
    if (usuario.name != "" && usuario.password != "") {
      obtenerCuenta()
    } else {
      alert("Por favor rellena todos los campos")
    }
  }


  return (
    <>
      <Button color='#2a7858' bgColor='#e0e7d7' m={1} onClick={discDrawer.onOpen}>
        Mi cuenta
      </Button>
      <Drawer
        isOpen={discDrawer.isOpen}
        placement='left'
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
                          name='name'
                          onChange={handleInputChangeNuevo}
                        />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='correo'>Correo</FormLabel>
                        <InputGroup>
                          <Input
                            type='url'
                            id='correo'
                            name='email'
                            placeholder='Ingresa tu correo'
                            onChange={handleInputChangeNuevo}
                          />
                        </InputGroup>
                      </Box>
                      <Box>
                        <FormLabel htmlFor='contraseña'>Contraseña</FormLabel>
                        <InputGroup>
                          <Input
                            id='contraseña'
                            type={show ? 'text' : 'password'}
                            placeholder='Ingresa tu contraseña'
                            onChange={handleInputChangeNuevo}
                            name='password'
                          />
                          <InputRightElement mr={2} width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClickPassword}>
                              {show ? 'Ocultar' : 'Mostrar'}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </Box>
                      <Box>
                        <FormLabel htmlFor='contraseña'>Confirma tu contraseña</FormLabel>
                        <InputGroup>
                          <Input
                            type={show ? 'text' : 'password'}
                            id='contraseñaConfirm'
                            placeholder='Confirma tu contraseña'
                          />
                          <InputRightElement mr={2} width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClickPassword}>
                              {show ? 'Ocultar' : 'Mostrar'}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </Box>
                      <Box>
                        <FormLabel htmlFor='nickname'>¡Nombra a tu mascota!</FormLabel>
                        <InputGroup>
                          <Input
                            type='text'
                            id='nickname'
                            name='nickname'
                            placeholder='Nombre de tu mascota'
                            onChange={handleInputChangePet}
                          />
                        </InputGroup>
                      </Box>
                    </ModalBody>
                    <ModalFooter>
                      <Button color='#2a7858' bgColor='#e0e7d7' w="7em" m={1} onClick={discModalRegistrar.onClose} >Cancelar</Button>
                      <Button color='#e0e7d7' bgColor='#2a7858' w="7em" m={1} onClick={registrarUsuario} >
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
                          onChange={handleInputChange}
                          name='name'
                        />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='contraseña'>Contraseña</FormLabel>
                        <InputGroup>
                          <Input
                            id='contraseña'
                            placeholder='Ingresa tu contraseña'
                            type={show ? 'text' : 'password'}
                            onChange={handleInputChange}
                            name='password'
                          />
                          <InputRightElement mr={2} width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClickPassword}>
                              {show ? 'Ocultar' : 'Mostrar'}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </Box>
                    </ModalBody>
                    <ModalFooter>
                      <Button color='#2a7858' bgColor='#e0e7d7' w="7em" m={1} onClick={discModalLogin.onClose}>Cancelar</Button>
                      <Button color='#e0e7d7' bgColor='#2a7858' w="7em" m={1} onClick={comprobarCuenta}>
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