import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Products from "./components/Products";
import DealsSection from "./components/Deals";
import CategoryPage from "./components/Categories";
import CategorySection from "./components/CategorySection";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <BrowserRouter>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <CategorySection darkMode={darkMode} setDarkMode={setDarkMode} />
                <Products darkMode={darkMode} setDarkMode={setDarkMode} />
                <DealsSection darkMode={darkMode} setDarkMode={setDarkMode} />
              </>
            }
          />

          <Route path="/categories" element={<CategoryPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
