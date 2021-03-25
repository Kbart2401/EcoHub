import React, { useEffect, useRef, useState } from 'react';
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
  const [image, setImage] = useState('lake')

  const randomImage = () => {
    let images = ['boy', 'lake', 'leaf', 'nature', 'park', 'river']
    let random = Math.floor(Math.random() * (images.length - 0) + 0)
    return images[random]
  }

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
    if (user && user.email) {
      return history.push('/home');
    }
  })

  useEffect(() => {
   setInterval(() => {
     setImage(randomImage())
   }, 5000);
  }, [])

  return (
    <>
      <section id='landing-1'>
        <div className={`one-wrapper ${image}`}>
          <div className='lower-landing'>
            <ul className='landing-list'>
              <li className='header-1 invisible' ref={header1}>Contribute</li>
              <li className='header-2 invisible' ref={header2}>Encourage</li>
              <li className='header-3 invisible' ref={header3}>Inspire</li>
            </ul>
            <div className='logo'><span id='one'>Eco</span><span id='two'>Hub</span>
              <span><img src={require("../../images/2d-leaf.png")} /></span></div>
          </div>
        </div>
      </section>
      <secion id='landing-2'>

        <div className='landing-trees' ref={landingTrees}>
          <img id="tree1" src={require('../../images/2d-tree1.png')} />
          <img id="tree2" src={require('../../images/2d-tree2.png')} />
          <img id="tree3" src={require('../../images/2d-tree3.png')} />
        </div>
        <Mission />
      </secion>
    </>
  )
}

export default Landing;