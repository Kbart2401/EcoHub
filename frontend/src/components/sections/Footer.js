import React from 'react';
import { AiOutlineGithub, AiFillLinkedin } from 'react-icons/ai';
import { FaAngellist } from 'react-icons/fa';
import '../../stylesheets/footer.css';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer_root'>
        <div className='footer_left'>
          <div className='footer-text'>Follow</div>
          <a className='linkText' href='https://github.com/Kbart2401/EcoHub' target='_blank'>
            <div className='text'><span>View this project on Github</span><AiOutlineGithub size='25' /></div>
          </a>
        </div>
        <div className='footer_middle'>
          <div className='footer-text'>Creator</div>
          <div className='footer-creator-links'>
            <a className='linkText' href='https://www.linkedin.com/in/kyle-barthelmes-a5120b51/'
              target='_blank'><div className='text'><span>Kyle Barthelmes</span><AiFillLinkedin size='25' /></div>
            </a>
            <a href='https://angel.co/u/kyle-barthelmes' target='_blank'><FaAngellist size='25' /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer