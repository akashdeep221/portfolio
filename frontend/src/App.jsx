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
import AllWork from './Components/WorkPage/AllWork';
import Product from './Components/Product/Product';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

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
        <Route path="/work" element={<AllWork />} />
        <Route path="/product/request" element={<Product />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;