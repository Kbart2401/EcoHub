import React from 'react';
import { Box, Image, AspectRatio } from '@chakra-ui/react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import '../../stylesheets/landing.css'

const Landing = () => {
  return (
    <>
      {/* <Box display='flex' justifyContent='center'> */}
        <AspectRatio maxW="1200px">
          <Box height="400px" width='100vw' display='flex' justifyContent='center'>
            <AliceCarousel autoPlay infinite autoPlayInterval="10000" >
            <Image src="/images/boy.jpg" />
            <Image src="/images/lake.jpg" />
            <Image src="/images/leaf.jpg" />
            <Image src="/images/nature.jpg" />
            <Image src="/images/park.jpg" />
            <Image src="/images/river.jpg" />
          </AliceCarousel>
          </Box>
        </AspectRatio>
        This is the landing page
        {/* </Box> */}
    </>
  )
}

export default Landing;