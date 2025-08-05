import Navbar from "./components/Navbar";
import Home from "./components/Navbar";
import Products from "./components/Navbar";
import Catagories from "./components/Navbar";
import Deals from "./components/Navbar";
import About from "./components/Navbar";
import Contact from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
      </BrowserRouter>
    </>
  );
}
