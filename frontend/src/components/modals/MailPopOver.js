import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiMail } from 'react-icons/fi';
import * as sessionActions from '../../store/actions/session';
import {
  Popover, PopoverTrigger, Portal, PopoverContent,
  PopoverArrow, PopoverHeader, PopoverCloseButton,
  Button, PopoverBody, Image, useDisclosure
} from '@chakra-ui/react';
import '../../stylesheets/inbox.css';

const MailPopOver = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const friendReqs = useSelector(state => state.session.friendsWaiting)

  const handleClick = (id) => (e) => {
    dispatch(sessionActions.confirmFriend(id))
    onClose()
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button bgColor='white'> <FiMail size='30px' /></Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader><b>Friend Requests</b></PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            {friendReqs && !friendReqs.length && <div>No Messages</div>}
            {friendReqs?.map(friend => {
              return (
                <div className='inbox-wrapper'>
                  <div className='inbox-user'><div><Image borderRadius='full' boxSize='50px' src={friend[0].image} /></div>
                    <div className='inbox-username-middle'>{friend[0].username}</div><div></div></div>
                  <div>{friend[1].message}</div>
                  <Button className='modal-close-button' onClick={handleClick(friend[0].id)}>Confirm</Button>
                </div>
              )
            })}
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default MailPopOver
