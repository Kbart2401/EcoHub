import React, { useEffect, useRef } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Image, AspectRatio, Flex } from '@chakra-ui/react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../stylesheets/landing.css'
import Mission from '../sections/Mission';

const Landing = () => {
  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const landingTrees = useRef(null)
  const header1 = useRef(null)
  const header2 = useRef(null)
  const header3 = useRef(null)

  useEffect(() => {
    const a1 = setTimeout(() => {
      header1.current.classList.remove('invisible')
    }, 500)
    const a2 = setTimeout(() => {
      header2.current.classList.remove('invisible')
    }, 1500)
    const a3 = setTimeout(() => {
      header3.current.classList.remove('invisible')
    }, 2500)

    const a4 = setTimeout(() => {
      landingTrees.current.classList.add('trees-end')
    }, 3000)
    return () => {
      clearTimeout(a1)
      clearTimeout(a2)
      clearTimeout(a3)
      clearTimeout(a4)
    }
  }, [])

  useEffect(() => {
    debugger
    if (user && user.email) {
      return history.push('/home');
    }
  })



  return (
    <>
      <Flex className='carousel-container' flexDirection='column'>
        <AspectRatio maxW="1200px">
          <Box height="400px" width='100vw' display='flex' justifyContent='center'>
            <AliceCarousel autoPlay infinite autoPlayInterval="4000" animationType='fadeout' >
              <Image src={require("../../images/boy.jpg")} />
              <Image src={require("../../images/lake.jpg")} />
              <Image src={require("../../images/leaf.jpg")} />
              <Image src={require("../../images/nature.jpg")} />
              <Image src={require("../../images/park.jpg")} />
              <Image src={require("../../images/river.jpg")} />
            </AliceCarousel>
          </Box>
        </AspectRatio>
      </Flex>
      <div className='lower-landing'>
        <ul className='landing-list'>
          <li className='header-1 invisible' ref={header1}>Contribute</li>
          <li className='header-2 invisible' ref={header2}>Encourage</li>
          <li className='header-3 invisible' ref={header3}>Inspire</li>
        </ul>
        <div className='landing-trees' ref={landingTrees}>
          <img id="tree1" src={require('../../images/2d-tree1.png')} />
          <img id="tree2" src={require('../../images/2d-tree2.png')} />
          <img id="tree3" src={require('../../images/2d-tree3.png')} />
        </div>
        <Mission />
      </div>
    </>
  )
}

export default Landing;