import React, { useEffect, useState } from 'react';
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader,
  DrawerOverlay, DrawerContent, useDisclosure, Button,
  Table, Thead, Tbody, Tr, Th, Td, TableCaption
} from "@chakra-ui/react";
import { useSelector } from 'react-redux';

const HomeDrawer = () => {
  const user = useSelector(state => state.session.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState("left")
  const [friendCount, setFriendCount] = useState(0)


  useEffect(() => {
    let num = 0;
    if (user) user.friends.forEach(friend => num++)
    setFriendCount(num)
  }, [])

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
                  <Table variant="striped" colorScheme="green">
                    <TableCaption placement='top'>Profile</TableCaption>
                    <Tbody>
                      <Tr>
                        <Td>XP</Td>
                        <Td>{user.xp}</Td>
                      </Tr>
                      <Tr>
                        <Td>Friends</Td>
                        <Td>{friendCount}</Td>
                      </Tr>
                      <Tr>
                        <Td>City</Td>
                        <Td>{user.city}</Td>
                      </Tr>
                      <Tr>
                        <Td>State</Td>
                        <Td>{user.state}</Td>
                      </Tr>
                      <Tr>
                        <Td>Country</Td>
                        <Td>{user.country}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </>}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default HomeDrawer;
