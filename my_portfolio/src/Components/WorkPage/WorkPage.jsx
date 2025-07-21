import React from 'react';
import { useParams, Link } from 'react-router-dom';

const WorkPage = () => {
  const { id } = useParams();
  let content;
  switch (id) {
    case '1':
      content = (
        <>
            <h1>Blog Application</h1>
            <p>A blog application is a platform where users can read, write, edit, and share articles or posts. It usually includes features like user accounts, categories, comments, and search, making it easier for readers to find and engage with content.</p>
            <div style={{ height: '20px' }} />
            <p>I built the backend of a blog application using Java. It included secure user authentication, role-based access, and REST APIs for managing posts, comments, and categories. I focused on building a clean and scalable architecture, integrating security features and connecting it to a database for storing and retrieving blog content.</p>
        </>
      );
      break;
    case '2':
      content = (
        <>
            <h1>Note Taking Application</h1>
            <p>A note-taking application allows users to create, edit, organize, and store personal notes digitally. It helps people keep track of ideas, tasks, and important information, often with features like search, tagging, and syncing across devices.</p>
            <div style={{ height: '20px' }} />
            <p>I built the backend of a note-taking application using Python. It included secure user authentication, permission handling, and APIs for managing notes. I used built-in features to ensure clean code structure, added token-based security for safe access, and connected it to a database to store and retrieve user notes efficiently.</p>
        </>
      );
      break;
    case '3':
      content = (
        <>
            <h1>Data Integration</h1>
            <p>Data integration involves connecting different systems, applications, or databases to enable seamless data flow between them. It helps organizations unify their data, improve efficiency, and ensure consistency across platforms.</p>
            <div style={{ height: '20px' }} />
            <p>I worked on end-to-end data integration projects where I connected various source and destination systems, including databases, APIs, and external services. I developed scripts and services to extract, transform, and load (ETL) data, handled authentication and error handling, and ensured secure and reliable two-way data transfer. I also scheduled automated syncs, monitored data pipelines, and resolved integration issues to maintain smooth operations.</p>
        </>
      );
      break;
    case '4':
      content = (
        <>
            <h1>Frontend Engineering</h1>
            <p>Frontend development is the part of web development that focuses on what users see and interact with in a browser. It involves designing and coding the layout, buttons, animations, and overall look and feel of a website or app using technologies like HTML, CSS, and JavaScript.</p>
            <div style={{ height: '20px' }} />
            <p>I worked on building clean and responsive user interfaces using HTML, CSS, Javascript etc. I make sure that websites look good on all devices, load fast, and feel smooth to use. I also handle things like routing, form validation, and connecting the frontend with APIs to show dynamic content.</p>
        </>
      );
      break;
    case '5':
      content = (
        <>
            <h1>Cloud Engineering</h1>
            <p>Cloud projects involve designing and managing cloud-based infrastructure to host applications, handle data, and automate deployments in a scalable and reliable way. These projects help improve system performance, reduce downtime, and support growth without relying on physical servers.</p>
            <div style={{ height: '20px' }} />
            <p>I worked on projects where I deployed web applications on virtual servers, automated the entire build and deployment process, and set up custom infrastructure using code. I configured private networks, databases, and storage systems to ensure security and performance. I also set up monitoring, error handling, background processing queues, and access controls to maintain system stability and respond quickly to failures or unusual activity.</p>
        </>
      );
      break;
    case '6':
      content = (
        <>
            <h1>Robot Programming</h1>
            <p>Robot programming involves writing code that controls the movement and behavior of robots based on sensor inputs and predefined logic. It requires a good understanding of hardware interaction, real-time response, and precision in movement.</p>
            <div style={{ height: '20px' }} />
            <p>I worked on projects where I programmed robots to detect and follow paths using input from sensors. The robots could follow black lines on white surfaces, make turns at junctions, and adjust their speed based on curve sharpness or obstacles. I wrote logic to help them follow 2D paths accurately and react dynamically to changes in direction or lighting. The systems were optimized to handle timing, edge detection, and motion control to ensure smooth navigation and reliable performance.</p>
        </>
      );
      break;
    default:
      content = (
        <>
          <h1>Work {id}</h1>
          <p>No content available for this work item.</p>
        </>
      );
  }
return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
        {content}
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
);
};

export default WorkPage;
