import React, { useEffect, useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Button, useDisclosure, Select, Input
} from "@chakra-ui/react";

const TaskModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [content, setContent] = useState('')
  const [task, setTask] = useState('')
  const [customTask, setCustomTask] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    let sendTask;
    if (customTask && task === 'Enter') sendTask = customTask
    else sendTask = task
      const res = await fetch('api/posts/', {
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          category: sendTask,
          content
        })
      })
    const data = await res.json()
  }

  return (
    <>
      <Button onClick={onOpen}>Complete Task</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Complete Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor='category'>Category</label>
                <Select placeholder='Select option' value={task} onChange={e => setTask(e.target.value)}>
                  <option value='Recycle'>Recycle</option>
                  <option value='Plant tree'>Plant tree</option>
                  <option value='Enter'>Enter your own</option>
                </Select>
                {task === 'Enter' &&
                  <Input type='text' onChange={e => setCustomTask(e.target.value)} />}
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

export default TaskModal