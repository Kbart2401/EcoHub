import React from 'react';
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader,
  DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button
} from "@chakra-ui/react";
import { useSelector } from 'react-redux';

const HomeDrawer = () => {
  const user = useSelector(state => state.session.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState("left")

  return (
    <>
      <Button height='auto' size='sm' colorScheme="orange" onClick={onOpen}>
        P <br /> R <br /> O <br /> F <br /> I <br /> L <br /> E
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            {user &&
              <DrawerHeader borderBottomWidth="1px">{user.username}</DrawerHeader>
            }
            <DrawerBody>
              {user &&
                <>
                  <p>XP: {user.xp}</p>
                  <p>{user.city}</p>
                  <p>{user.state}</p>
                  <p>{user.country}</p>
                </>}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default HomeDrawer;
