import React from "react";
import { ThemeProvider } from "./ThemeContext.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Process from "./components/Process.jsx";
import Internships from "./components/Internships.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Internships />
      <Footer />
    </ThemeProvider>
  );
}
