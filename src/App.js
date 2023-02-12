import React from "react";
import { ThemeProvider } from "react-bootstrap";
import { Navigate, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
import { Login } from "./components/Login";
import Owner from "./components/Owner";
import { Authenticator } from "@aws-amplify/ui-react";

let App = () => {
  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <div>
        <nav>
          <Link to="/">Home</Link> |<Link to="/about">About</Link> |
          <Link to="/contact">Contact</Link> |<Link to="/search">Search</Link>
        </nav>
        <Authenticator.Provider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/owner" element={<Owner />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Authenticator.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
