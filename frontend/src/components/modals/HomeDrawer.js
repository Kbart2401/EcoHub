import React, { useEffect, useState } from 'react';
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader,
  DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button
} from "@chakra-ui/react";
import { useSelector } from 'react-redux';

const HomeDrawer = () => {
  const user = useSelector(state => state.session.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState("left")
  const [friends, setFriends] = useState(0)


  useEffect(() => {
    let num = 0;
    if (user) user.friends.forEach(friend => num++)
    setFriends(num)
  },[])

  return (
    <>
      <Button height='auto' size='sm' bgColor='tomato' color='white' onClick={onOpen}>
        P <br /> R <br /> O <br /> F <br /> I <br /> L <br /> E
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            {user &&
              <DrawerHeader borderBottomWidth="1px">
                {user.username} <img src={user.image} />
              </DrawerHeader>
            }
            <DrawerBody>
              {user &&
                <>
                <h1>Profile</h1>
                  <p>XP: {user.xp}</p>
                  <p>Friends: {friends}</p>
                  <p>City: {user.city}</p>
                  <p>State: {user.state}</p>
                  <p>Country: {user.country}</p>
                </>}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default HomeDrawer;
