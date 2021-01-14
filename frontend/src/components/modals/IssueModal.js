import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, useDisclosure, Select, Input
} from "@chakra-ui/react";

const IssueModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [content, setContent] = useState('')
  const [issue, setIssue] = useState('')
  const [customIssue, setCustomIssue] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let sendIssue;
    if (customIssue && issue === 'Enter') sendIssue = customIssue
    else sendIssue = issue
    const res = await fetch('api/posts/', {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        category: sendIssue,
        content
      })
    })
    const data = await res.json()
  }

  return (
    <>
      <Button onClick={onOpen}>Report Issue</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Report a recent Issue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div>
                <Select placeholder='Select option' value={issue} onChange={e => setIssue(e.target.value)}>
                  <option value='Recycle'>Recycle</option>
                  <option value='Plant tree'>Plant tree</option>
                  <option value='Enter'>Enter your own</option>
                </Select>
                {issue==='Enter' &&
                <Input type='text' onChange={e => setCustomIssue(e.target.value)}/>}
              </div>
              <div>
                <label htmlFor='content'>Content</label>
                <Input name='content' type='text' placeholder='Content'
                  value={content} onChange={e => setContent(e.target.value)} />
              </div>
              <Button type='submit' onClick={onClose}>Enter</Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default IssueModal