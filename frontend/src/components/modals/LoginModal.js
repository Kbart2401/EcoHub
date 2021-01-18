import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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


  return (
    <>
      <Link onClick={onOpen}>Login</Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <LoginForm errors={errors} onLogin={onLogin}
              setPassword={setPassword} setUsername={setUsername} />
          </ModalBody>

          <ModalFooter>
            <Button type='submit' onClick={demoLogin}>Login As Demo User</Button>
            <Button type='submit' onClick={onLogin}>Submit</Button>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LoginModal