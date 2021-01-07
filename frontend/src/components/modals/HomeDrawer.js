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
      <Button colorScheme="orange" onClick={onOpen}>
        Open
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            {user &&
              <DrawerHeader borderBottomWidth="1px">{user.username}</DrawerHeader>
            }
            <DrawerBody>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default HomeDrawer;

