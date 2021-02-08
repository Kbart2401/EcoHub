import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import EditProfileModal from './EditProfileModal';
import {
  Drawer, DrawerBody, DrawerFooter, DrawerHeader,
  DrawerOverlay, DrawerContent, useDisclosure, Button,
  Table, Thead, Tbody, Tr, Th, Td, TableCaption
} from "@chakra-ui/react";
import '../../stylesheets/modals.css';

const HomeDrawer = () => {
  const user = useSelector(state => state.session.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const history = useHistory()
  const [placement, setPlacement] = useState("left")
  const [friendCount, setFriendCount] = useState(0)


  useEffect(() => {
    let num = 0;
    if (user) {
      if (user.friends) {
        user.friends.forEach(friend => num++)
        setFriendCount(num)
      }
    }
  }, [user])

  const handleClick = () => {
    onClose()
    return history.push('/profile', { user })
  }

  return (
    <>
      <Button height='auto' size='sm' bgColor='tomato' color='white' onClick={onOpen}>
        P <br /> R <br /> O <br /> F <br /> I <br /> L <br /> E
      </Button>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            {user &&
              <DrawerHeader className='drawer-header' borderBottomWidth="1px">
                {user.username} <img src={user.image} />
              </DrawerHeader>
            }
            <DrawerBody>
              {user &&
                <>
                  <Table className='home-drawer-table' variant="striped" colorScheme="green" >
                    <TableCaption placement='top'>Profile</TableCaption>
                    <Tbody>
                      <Tr>
                        <Td className='drawer-table-data'>XP</Td>
                        <Td>{user.xp}</Td>
                      </Tr>
                      <Tr>
                        <Link to='/friends' onClick={onClose} className='drawer-table-link'  >
                          <Td className='drawer-table-data'>Friends</Td>
                          <Td id='drawer-friend-count'>{friendCount}</Td>
                        </Link>
                      </Tr>
                      <Tr>
                        <Td className='drawer-table-data'>City</Td>
                        <Td>{user.city}</Td>
                      </Tr>
                      <Tr>
                        <Td className='drawer-table-data'>State</Td>
                        <Td>{user.state}</Td>
                      </Tr>
                      <Tr>
                        <Td className='drawer-table-data'>Country</Td>
                        <Td>{user.country}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </>}
              <Button id='profile-button' variant="outline" mr={3} width='100%'
                onClick={handleClick}>View Full Profile</Button>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <EditProfileModal />
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default HomeDrawer;
