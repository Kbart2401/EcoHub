import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Button, useDisclosure, Link,
  Table, Thead, Tbody, Tr, Th, Td, TableCaption
} from "@chakra-ui/react";

const AirModal = ({ airQuality, particles }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Link id='air-modal-link' onClick={onOpen}>Air Quality: {airQuality}</Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Air Quality Index</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table variant="striped" colorScheme="green">
              <TableCaption placement='top'>Possible values range from 1-5 where:</TableCaption>
              <Thead>
                <Tr>
                  <Th>Value</Th>
                  <Th>Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>1</Td>
                  <Td>Good</Td>
                </Tr>
                <Tr>
                  <Td>2</Td>
                  <Td>Fair</Td>
                </Tr>
                <Tr>
                  <Td>3</Td>
                  <Td>Moderate</Td>
                </Tr>
                <Tr>
                  <Td>4</Td>
                  <Td>Poor</Td>
                </Tr>
                <Tr>
                  <Td>5</Td>
                  <Td>Very Poor</Td>
                </Tr>
              </Tbody>
            </Table>
            <Table variant="striped" colorScheme="green">
              <TableCaption placement='top'>Air quality is determined by the concentration of certain air pollutants, eight of which are listed below:</TableCaption>
              <Thead>
                <Tr>
                  <Th>Particle</Th>
                  <Th>Concentration</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Carbon monoxide(CO)</Td>
                  <Td>{particles.co} µg/m3</Td>
                </Tr>
                <Tr>
                  <Td>Nitrogen monoxide(NO)</Td>
                  <Td>{particles.no} µg/m3</Td>
                </Tr>
                <Tr>
                  <Td>Nigrogen dioxide(No3)</Td>
                  <Td>{particles.no2} µg/m3</Td>
                </Tr>
                <Tr>
                  <Td>Ozone(O3)</Td>
                  <Td>{particles.o3} µg/m3</Td>
                </Tr>
                <Tr>
                  <Td>Sulpher dioxide(SO2)</Td>
                  <Td>{particles.so2} µg/m3</Td>
                </Tr>
                <Tr>
                  <Td>Fine particles matter(PM2.5)</Td>
                  <Td>{particles.pm2_5} µg/m3</Td>
                </Tr>
                <Tr>
                  <Td>Coarse particulate matter(PM10)</Td>
                  <Td>{particles.pm10} µg/m3</Td>
                </Tr>
                <Tr>
                  <Td>Ammonia(NH3)</Td>
                  <Td>{particles.nh3} µg/m3</Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button className='modal-close-button' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AirModal