import React from 'react';
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
                    <div key={index} className='solutions-format'>
                        <h3>{solution.s_no}</h3>
                        <h2>{solution.s_name}</h2>
                        <p>{solution.s_desc}</p>
                        <div className='solutions-readmore'>
                            <p>Read More</p>
                            <img src={arrow_icon} alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Solutions;
