import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Image, AspectRatio, Flex } from '@chakra-ui/react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../stylesheets/landing.css'

const Landing = () => {
  const user = useSelector(state => state.session.user)
  if (user && !user.errors) {
    return <Redirect to="/home" />;
  }
  return (
    <>
      <Flex className='carousel-container' flexDirection='column'>
        <AspectRatio maxW="1200px">
          <Box height="400px" width='100vw' display='flex' justifyContent='center'>
            <AliceCarousel autoPlay infinite autoPlayInterval="6000" >
              <Image src="/images/boy.jpg" />
              <Image src="/images/lake.jpg" />
              <Image src="/images/leaf.jpg" />
              <Image src="/images/nature.jpg" />
              <Image src="/images/park.jpg" />
              <Image src="/images/river.jpg" />
            </AliceCarousel>
          </Box>
        </AspectRatio>
      </Flex>
      <div className='lower-landing'>
        <ul className='landing-list'>
          <li>Contribute</li>
          <li>Encourage</li>
          <li>Inspire</li>
        </ul>
      </div>
    </>
  )
}

export default Landing;