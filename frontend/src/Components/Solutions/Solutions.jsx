import React from 'react';
import { Link } from 'react-router-dom';
import './Solutions.css';
import theme_pattern from '../../assets/theme_pattern.png';
import Solutions_Data from '../../assets/solutions_data';
import arrow_icon from '../../assets/arrow_icon.svg';

const Solutions = () => {
    return (
        <div id='solutions' className='solutions'>
            <div className="solutions-title">
                <h1>My Solutions</h1>
                <img src={theme_pattern} alt="" />
            </div>
            <div className="solutions-container">
                {Solutions_Data.map((solution, index) => (
                    <Link
                        key={index}
                        to={`/solution/${index + 1}`}
                        className="solutions-format-link"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div className='solutions-format'>
                            <h3>{solution.s_no}</h3>
                            <h2>{solution.s_name}</h2>
                            <p>{solution.s_desc}</p>
                            <div className='solutions-readmore'>
                                <p>Read More</p>
                                <img src={arrow_icon} alt="" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
                <Link to="/product/request" className="product-request" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: 15, borderRadius: 50, border: '2px solid #08dfd4', padding: '30px 60px', fontSize: 22, fontWeight: 500, marginBottom: 80, transition: '0.6s', cursor: 'pointer', alignItems: 'center' }}>
                    <p>Need a Product/Solution?</p>
                    <img src={arrow_icon} alt="" />
                </Link>
            </div>
        </div>
    );
};

export default Solutions;
