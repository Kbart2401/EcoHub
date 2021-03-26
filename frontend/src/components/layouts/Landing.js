import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VisibilitySensor from "react-visibility-sensor";
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
    if (user && user.email) {
      return history.push('/home');
    }
  })

  useEffect(() => {
    setInterval(() => {
      setImage(randomImage())
    }, 5000);
  }, [])

  const onVisible = (isVisible) => {
    console.log(isVisible)
    if (isVisible) {
      header1.current.classList.remove('invisible')
      header2.current.classList.remove('invisible')
      header3.current.classList.remove('invisible')
      landingTrees.current.classList.add('trees-end')
    }
  }

  return (
    <>
      <section id='landing-1' className={image}>
        <div className='one-wrapper'>
          <div className='greeting-wrapper'>
            <div className='greeting'>Welcome To</div>
            <div className='logo logo-landing'><span id='one'>Eco</span><span id='two'>Hub</span>
              <span id='leaf-img'><img className='landing' src={require("../../images/2d-leaf.png")} /></span>
            </div>
            <div className='subtitle-wrapper'>
              <div>Support Your Area</div>
              <div>Support Our Planet</div>
            </div>
          </div>
          <div className='learn-more-wrapper'>
            <a href='#landing-2'>Learn More</a>
            </div>
        </div>
      </section>
      <section id='landing-2'>
        <div className='lower-landing'>
          <VisibilitySensor onChange={onVisible} scrollCheck='true'>
            <ul className='landing-list'>
              <li className='header-1 invisible' ref={header1}>Contribute</li>
              <li className='header-2 invisible' ref={header2}>Encourage</li>
              <li className='header-3 invisible' ref={header3}>Inspire</li>
            </ul>
          </VisibilitySensor>
        </div>
        <div className='landing-trees' ref={landingTrees}>
          <img id="tree1" src={require('../../images/2d-tree1.png')} />
          <img id="tree2" src={require('../../images/2d-tree2.png')} />
          <img id="tree3" src={require('../../images/2d-tree3.png')} />
        </div>
        <Mission />
      </section>
    </>
  )
}

export default Landing;