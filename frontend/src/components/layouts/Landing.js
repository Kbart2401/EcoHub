import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Image, AspectRatio, Flex } from '@chakra-ui/react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../stylesheets/landing.css'

const Landing = () => {
  const user = useSelector(state => state.session.user)
  const [start, setStart] = useState('tree-start')

  useEffect(() => {
    setTimeout(() => {
      debugger
      setStart('.tree-end')
    }, 3000)
  },[])

  if (user && !user.errors) {
    return <Redirect to="/home" />;
  }



  return (
    <>
      <Flex className='carousel-container' flexDirection='column'>
        <AspectRatio maxW="1200px">
          <Box height="400px" width='100vw' display='flex' justifyContent='center'>
            <AliceCarousel autoPlay infinite autoPlayInterval="6000" >
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
          <li>Contribute</li>
          <li>Encourage</li>
          <li>Inspire</li>
        </ul>1
        <div className='landing-trees'>
          <img className={start} id="tree1" src={require('../../images/2d-tree1.png')} />
          <img className={start} id="tree2" src={require('../../images/2d-tree2.png')} />
          <img className={start} id="tree3" src={require('../../images/2d-tree3.png')} />
        </div>
      </div>
    </>
  )
}

export default Landing;