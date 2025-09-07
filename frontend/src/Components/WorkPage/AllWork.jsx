import React from 'react';
import '../MyWork/MyWork.css';

const AllWork = () => {
  return (
    <div className="mywork" style={{ paddingTop: 40 }}>
      <div>
        <h1>Miscellaneous</h1>
        <div style={{ height: '20px' }} />
        <p>I upgraded entire cloud infrastructure from versions that were to be deprecated to updated versions.</p>
        <div style={{ height: '20px' }} />
        <p>I mitigated security vulnerabilities, improving application security posture by 40% and safeguarding against cyber attacks and threats.</p>
        <div style={{ height: '20px' }} />
        <p>I engineered end-to-end APIs with comprehensive test cases, enhancing system reliability and ensuring 100% alignment with project requirements.</p>
        <div style={{ height: '20px' }} />
        <p>I optimized workflows, database queries, and application performance, resulting in a 80% reduction in latency which improved user satisfaction.</p>
      </div>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button
            style={{
                display: 'inline-block',
                marginTop: '30px',
                padding: '12px 28px',
                background: 'linear-gradient(267deg, #3dda25 0.36%, #e123c4 102.06%)',
                color: 'white',
                borderRadius: '30px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: 'none',
                cursor: 'pointer'
            }}
            onClick={() => window.history.back()}
        >
            Back
        </button>
      </div>
    </div>
  );
};

export default AllWork;
