import React, { useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './Navbar.css';
import logo from '../../assets/logo.png';
import underline from '../../assets/nav_underline.png';

const Navbar = () => {
    const [menu, setMenu] = useState("home");

    return (
        <div className="navbar">
            <h1>Akashdeep</h1>
            <ul className="nav-menu">
                <li><AnchorLink className='anchor-link' href='#home'><p onClick={()=>setMenu("home")}>Home</p></AnchorLink>{menu === "home" ? (<img src={underline} alt='' />) : <></>}</li>
                <li><AnchorLink className='anchor-link' offset={50} href='#about'><p onClick={()=>setMenu("about")}>About Me</p></AnchorLink>{menu === "about" ? (<img src={underline} alt='' />) : <></>}</li>
                <li><AnchorLink className='anchor-link' offset={50} href='#solutions'><p onClick={()=>setMenu("solutions")}>Solutions</p></AnchorLink>{menu === "solutions" ? (<img src={underline} alt='' />) : <></>}</li>
                <li><AnchorLink className='anchor-link' offset={50} href='#work'><p onClick={()=>setMenu("work")}>Portfolio</p></AnchorLink>{menu === "work" ? (<img src={underline} alt='' />) : <></>}</li>
                <li><AnchorLink className='anchor-link' offset={50} href='#contact'><p onClick={()=>setMenu("contact")}>Contact</p></AnchorLink>{menu === "contact" ? (<img src={underline} alt='' />) : <></>}</li>
            </ul>
            <div className="nav-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'>Connect With Me</AnchorLink></div>
        </div>
    );
};

export default Navbar;