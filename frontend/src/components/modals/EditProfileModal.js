import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Button, useDisclosure
} from "@chakra-ui/react";
import UpdateProfileForm from '../auth/UpdateProfileForm';
import * as sessionActions from '../../store/actions/session';
import '../../stylesheets/modals.css';

const EditProfileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()

  const onUpdate = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const form = new FormData()
      form.append('username', username)
      form.append('email', email)
      form.append('city', city)
      form.append('state', state)
      form.append('country', country)
      form.append('password', password)
      form.append('image', image)
      dispatch(sessionActions.updateUser(form)).then(() => onClose())
        .catch(res => {
          if (res.errors) setErrors(res.errors)
        })
    }
    else setErrors(['Passwords do not match'])
  };

  const closeModal = () => {
    setErrors([])
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen} variant="outline" mr={3} width='100%'>Edit Profile</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdateProfileForm onUpdate={onUpdate} username={username} setUsername={setUsername}
              email={email} setEmail={setEmail} city={city} setCity={setCity} state={state} setState={setState}
              country={country} setCountry={setCountry} setPassword={setPassword}
              setRepeatPassword={setRepeatPassword} setImage={setImage} errors={errors} />
          </ModalBody>

          <ModalFooter className='modal-buttons'>
            <Button type='submit' className='modal-submit-button' onClick={onUpdate}>Update</Button>
            <Button className='modal-close-button' mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditProfileModal