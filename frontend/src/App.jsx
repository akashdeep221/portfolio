import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import About from './Components/About/About';
import Solutions from './Components/Solutions/Solutions';
import MyWork from './Components/MyWork/MyWork';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import SolutionPage from './Components/SolutionPage/SolutionPage';
import WorkPage from './Components/WorkPage/WorkPage';
import Product from './Components/Product/Product';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <About />
            <Solutions />
            <MyWork />
            <Contact />
            <Footer />
          </>
        } />
        <Route path="/solution/:id" element={<SolutionPage />} />
        <Route path="/workpage/:id" element={<WorkPage />} />
        <Route path="/product/request" element={<Product />} />
      </Routes>
    </>
  );
};

export default App;