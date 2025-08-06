import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { useState,useEffect } from "react";
import Hero from "./components/Hero";
import Products from "./components/Products";
import DealsSection from "./components/Deals";
export default function App() {
    const [darkMode,setDarkMode]=useState(false);

    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [darkMode]);
  return (
    <>
    <div className={` ${darkMode}?:"dark":""`}>
      <BrowserRouter>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <Products darkMode={darkMode} setDarkMode={setDarkMode} />
      <DealsSection darkMode={darkMode} setDarkMode={setDarkMode} />
      </BrowserRouter>
      </div>
    </>
  );
}
