import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/actions/session'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Button, useDisclosure, Link
} from "@chakra-ui/react";
import LoginForm from '../auth/LoginForm';
import '../../stylesheets/modals.css';

const LoginModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.logUserIn(username, password))
      .catch(res => {
        if (res.errors) return setErrors(res.errors)
      })
  }
  const demoLogin = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.logUserIn('Demo', 'password'))
      .catch(res => {
        if (res.errors) return setErrors(res.errors)
      })
  }

  const closeModal = () => {
    setErrors([])
    onClose()
  }


  return (
    <>
      <Link fontWeight='bold' onClick={onOpen}>Log In</Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LoginForm errors={errors} onLogin={onLogin}
              setPassword={setPassword} setUsername={setUsername} />
          </ModalBody>

          <ModalFooter className='modal-buttons'>
            <Button type='submit' onClick={demoLogin}>Demo</Button>
            <Button type='submit' onClick={onLogin}>Login</Button>
            <Button colorScheme="orange" mr={3} onClick={closeModal} >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal