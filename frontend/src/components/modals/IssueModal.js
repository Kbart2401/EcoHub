import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, useDisclosure, Select, Input
} from "@chakra-ui/react";
import * as sessionActions from '../../store/actions/session';

const IssueModal = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [content, setContent] = useState('')
  const [issue, setIssue] = useState('')
  const [customIssue, setCustomIssue] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let sendIssue;
    if (customIssue && issue === 'Enter') sendIssue = `*${customIssue}*`
    else sendIssue = issue
    dispatch(sessionActions.addPost(sendIssue, content))
      .then(() => onClose())
  }

  return (
    <>
      <Button className='home-modal-button' bgColor='tomato' onClick={onOpen}>Report Issue</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report Environmental Issue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div>
                <Select placeholder='Select option' value={issue} onChange={e => setIssue(e.target.value)}>
                  <option value='*Wild animal trafficking*'>Wild animal trafficking</option>
                  <option value='*Indiscriminate logging*'>Indiscriminate logging</option>
                  <option value='*Electronic waste mismanagement*'>Electronic waste mismanagement</option>
                  <option value='*Finning*'>Finning</option>
                  <option value='*Dumping in rivers and aquifers*'>Dumping in rivers and aquifers</option>
                  <option value='Enter'>Enter your own</option>
                </Select>
                {issue === 'Enter' &&
                  <Input type='text' onChange={e => setCustomIssue(e.target.value)} />}
              </div>
              <div>
                <label htmlFor='content'>Content</label>
                <Input name='content' type='text' placeholder='Content'
                  value={content} onChange={e => setContent(e.target.value)} />
              </div>
            </form>
          </ModalBody>

          <ModalFooter className='modal-buttons'>
            <Button type='submit' className='modal-submit-button' onClick={handleSubmit}>Enter</Button>
            <Button className='modal-close-button' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default IssueModal