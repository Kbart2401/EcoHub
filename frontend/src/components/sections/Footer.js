import React from 'react';
import '../../stylesheets/footer.css';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer_root'>
        <div className='footer_left'>
          <span>Follow</span>
          <div className='text'>View this project on Github</div>
          <a className='linkText' href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
            {/* <GitHubIcon /> */}
          </a>
        </div>
        <div className='footer_middle'>
          <span>About Us</span>
          <div className='text'>Creators</div>
          <div className='contactContainer'>
            <div className='contact'>
              <a className='linkText' href='https://www.linkedin.com/in/kyle-barthelmes-a5120b51/'>Kyle Barthelmes</a> &nbsp;
            <a className='linkText' href='https://github.com/Kbart2401/Catch-me-if-you-can' target='_blank'>
                {/* <GitHubIcon /> */}
              </a>
            </div>
          </div>
          <a href="https://www.freepik.com/vectors/background">Background vector created by freepik - www.freepik.com</a>
        </div>
      </div>
    </div>
  )
}

export default Footer