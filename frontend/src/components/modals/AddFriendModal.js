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
  ModalCloseButton, Button, useDisclosure, Input
} from "@chakra-ui/react";
import { TiUserAdd } from 'react-icons/ti';

const AddFriendModal = ({ user }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [message, setMessage] = useState('')

  const handleClick = (id) => async (e) => {
    e.preventDefault()
    dispatch(sessionActions.addFriend(id, message))
    onClose()
  }

  return (
    <>
      <Button className='friend-modal-button' colorScheme='tomato' 
      size='lg' onClick={onOpen}><TiUserAdd size={30}/></Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {user.username}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input placeholder='Send a message with your friend request!' 
            onChange={(e) => setMessage(e.target.value)}/>
          </ModalBody>

          <ModalFooter>
            <Button type='submit' onClick={handleClick(user.id)} >Submit</Button>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddFriendModal