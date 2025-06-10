import React from 'react';
import './Hero.css';
import profile_img from '../../assets/profile_img.png'; 
import AnchorLink from 'react-anchor-link-smooth-scroll';

const Hero = () => {
    return (
        <div id='home' className='hero'>
            <img src={profile_img} alt="" />
            <h1><span>I'm Akashdeep Vasistha,</span> fullstack developer based in India.</h1>
            <p>With a passion for crafting seamless digital experiences, I specialize in building robust applications that bridge the gap between user needs and technical innovation.</p>
            <div className="hero-action">
                <div className="hero-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>Connect with me</AnchorLink></div>
                <div className="hero-resume">My Resume</div>
            </div>
        </div>
    );
};

export default Hero;