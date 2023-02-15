import React from 'react';
import { ThemeProvider } from "react-bootstrap"
import { Navigate,  BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { Customer } from './components/customer/Customer';
import { Login } from './components/Login';
import Owner  from './components/Owner';
import { Authenticator } from '@aws-amplify/ui-react';
import PageNotFound from './pages/PageNotFound';


let App = () => {
  return (

    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <div>
        <Authenticator.Provider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/owner" element={<Owner />} />
              <Route path="/customer" element={<Customer />} />
              <Route path="*" element={<PageNotFound/>} />
            </Routes>
        </Authenticator.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
