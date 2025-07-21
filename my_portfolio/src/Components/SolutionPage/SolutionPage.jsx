import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SolutionPage = () => {
  const { id } = useParams();
  let content;
  switch (id) {
    case '1':
    content = (
      <>
        <h1>Web Development</h1>
        <p>Web development is about creating websites and web apps that people can use on the internet. It includes designing how things look on the screen and also making sure everything works behind the scenes. This means writing code that runs in the browser, as well as code that runs on servers to handle data, user accounts, payments, and more.</p>
        <div style={{ height: '20px' }} />
        <p>In this area, I build full-stack web applications using tools like React, Node.js, and MongoDB. I focus on creating smooth user experiences, connecting APIs, handling authentication, and making sure the app works well on both phones and computers. I also work on small automation tools and try out new tech to keep improving my skills.</p>
      </>
    );
      break;
    case '2':
      content = (
        <>
          <h1>Frontend Development</h1>
          <p>Frontend development is the part of web development that focuses on what users see and interact with in a browser. It involves designing and coding the layout, buttons, animations, and overall look and feel of a website or app using technologies like HTML, CSS, and JavaScript.</p>
          <div style={{ height: '20px' }} />
          <p>I work on building clean and responsive user interfaces using frameworks like React. I make sure that websites look good on all devices, load fast, and feel smooth to use. I also handle things like routing, form validation, and connecting the frontend with APIs to show dynamic content.</p>
        </>
      );
      break;
    case '3':
      content = (
        <>
          <h1>Backend Development</h1>
          <p>Backend development is the part of web development that handles the logic, database operations, and server-side processing behind a website or app. It makes sure everything works properly when a user signs in, submits a form, or retrieves data from a database.</p>
          <div style={{ height: '20px' }} />
          <p>I build backend systems using Node.js and Express, managing routes, user authentication, and database connections with tools like MongoDB. I focus on writing clean, secure code that handles data efficiently and makes sure the frontend gets the right information quickly and reliably.</p>
        </>
      );
      break;
    case '4':
      content = (
        <>
          <h1>App Development</h1>
          <p>App development is about creating software applications that run on mobile devices like smartphones and tablets. It involves designing user-friendly interfaces and writing code that works smoothly on both Android and iOS platforms.</p>
          <div style={{ height: '20px' }} />
          <p>I build mobile apps using tools like React Native, focusing on creating responsive designs and connecting them to APIs for real-time data. I work on features like login systems, push notifications, and offline support to ensure a smooth and reliable user experience.</p>
        </>
      );
      break;
    case '5':
      content = (
        <>
          <h1>Cloud Development</h1>
          <p>Cloud development involves building and managing applications that run on cloud platforms instead of traditional local servers. It allows apps to scale easily, store large amounts of data, and stay available across different regions.</p>
          <div style={{ height: '20px' }} />
          <p>I use cloud services like AWS and Firebase to host web apps, manage databases, and set up backend functions. I focus on building scalable systems, automating deployments, and ensuring that apps are fast, secure, and available at all times.</p>
        </>
      );
      break;
    case '6':
      content = (
        <>
          <h1>Game Development</h1>
          <p>Game development is the process of creating interactive games that people can play on computers, consoles, or mobile devices. It combines programming, design, graphics, and sound to build fun and engaging experiences.</p>
          <div style={{ height: '20px' }} />
          <p>I develop simple 2D and 3D games using engines like Unity and frameworks like Phaser. I focus on gameplay mechanics, player controls, animations, and scoring systems, while also experimenting with AI behaviors and level design to make the games more interesting.</p>
        </>
      );
      break;
    default:
      content = (
        <>
          <h1>Solution {id}</h1>
          <p>No content available for this solution.</p>
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

export default SolutionPage;
