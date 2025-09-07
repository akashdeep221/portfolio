import React from 'react';
import './Hero.css';
import profile_img from '../../assets/profile_img.png'; 
import AnchorLink from 'react-anchor-link-smooth-scroll';

const RESUME_URL = import.meta.env.VITE_RESUME_URL || '/resume (1).pdf';

const Hero = () => {
    return (
        <div id='home' className='hero'>
            <img src={profile_img} alt="" />
            <h1><span>I'm Akashdeep Vasistha,</span> fullstack developer based in India.</h1>
            <p>With a passion for crafting seamless digital experiences, I specialize in building robust applications that bridge the gap between user needs and technological innovation.</p>
            <div className="hero-action">
                <div className="hero-connect">
                    <AnchorLink className='anchor-link' offset={50} href='#contact'>
                        Connect with me
                    </AnchorLink>
                </div>
                <a
                    className="hero-resume"
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open my resume in a new tab"
                    style={{ color: '#fff', textDecoration: 'none' }}
                >
                    My Resume
                </a>
            </div>
        </div>
    );
};

export default Hero;