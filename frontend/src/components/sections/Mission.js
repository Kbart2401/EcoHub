import React from 'react';


const Mission = () => {

  return (
    <div className="mission-wrapper">
      <h1>Mission</h1>
      <div><span className='logo'><span id='one'>Eco</span><span id='two'>Hub</span>
        <span></span></span>&nbsp;is designed to be a part of (even if small) the solution
        in helping preserve the Earth
      </div>
      <div>by creating more environmentally-minded users.</div>
      <div>Here find a like-minded community doing their part in their everyday activities. </div>
      <div>Complete Tasks to earn experience points (XP)</div>
      <div>Report any environmental issues to the community</div>
      <div>Find and connect with other users</div>
      <div>Compete to see who of your friends are the top contributors!</div>
      <div className='mission-image-wrapper'>
        <img src={require("../../images/2d-leaf.png")} />
      </div>
    </div>
  )

}

export default Mission