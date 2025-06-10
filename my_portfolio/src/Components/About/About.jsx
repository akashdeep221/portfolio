import React from 'react';
import './About.css';
import theme_pattern from '../../assets/theme_pattern.png';
import profile_img_2 from '../../assets/profile_img_2.png';

const About = () => {
    return (
        <div id='about' className='about'>
            <div className="about-title">
                <h1>About Me</h1>
                <img src={theme_pattern} alt="" />
            </div>
            <div className="about-section">
                <div className="about-left">
                    <img src={profile_img_2} alt="" />
                </div>
                <div className="about-right">
                    <div className="about-para">
                        <p>I am a versatile full stack developer with over 7 years of experience in web and product development. I've worked with respected organizations, contributing to various projects and supporting their growth.</p>
                        <p>My passion for full stack development is reflected in both my experience and the care I bring to each project. I am committed to continuous learning and delivering thoughtful, reliable solutions.</p>
                    </div>
                    <div className="about-skills">
                        <div className="about-skill"><p>HTML & CSS</p><hr style={{width:"60%"}}/></div>
                        <div className="about-skill"><p>Python</p><hr style={{width:"80%"}}/></div>
                        <div className="about-skill"><p>JavaScript</p><hr style={{width:"50%"}}/></div>
                        <div className="about-skill"><p>React</p><hr style={{width:"50%"}}/></div>
                        <div className="about-skill"><p>Java</p><hr style={{width:"60%"}}/></div>
                    </div>
                </div>
            </div>
            <div className="about-achievements">
                <div className="about-achievement">
                    <h1>7+</h1>
                    <p>YEARS OF EXPERIENCE</p>
                </div>
                <hr />
                <div className="about-achievement">
                    <h1>60+</h1>
                    <p>PROJECTS COMPLETED</p>
                </div>
                <hr />
                <div className="about-achievement">
                    <h1>15+</h1>
                    <p>HAPPY CLIENTS</p>
                </div>
            </div>
        </div>
    );
};

export default About;