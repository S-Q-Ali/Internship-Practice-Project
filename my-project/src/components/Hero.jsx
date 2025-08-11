import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {heroProducts} from "../data/data"


import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const navigate = useNavigate();
  const handleCategoryClick = (category) => {
    navigate("/categories", { state: { scrollTo: category } });
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const productRef = useRef(null);
  const controlsRef = useRef(null);

  const nextProduct = () => {
    setActiveIndex((prev) => (prev + 1) % heroProducts.length);
  };

  const prevProduct = () => {
    setActiveIndex((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
  };

  useEffect(() => {
    // Auto-rotate heroProducts every 5 seconds
    const interval = setInterval(nextProduct, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (titleRef.current && productRef.current && controlsRef.current) {
      // Initial animations
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(productRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from(controlsRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
      });

      // Product change animation
      gsap.fromTo(
        productRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 5 }
      );
    }
  }, [activeIndex]);

  return (
    <section
      ref={heroRef}
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-gray-900 to-black"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-6"
            >
              Elevate Your <span className="text-white">Gaming Experience</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Premium gaming peripherals designed for performance and style
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button handleclick={()=>handleCategoryClick("keyboards")} styles={"cursor-pointer px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"}>
                Shop Keyboards
              </Button>
              <Button handleclick={()=>handleCategoryClick("headphones")} styles={"cursor-pointer px-8 py-3 bg-gray-800 rounded-lg text-white font-medium hover:bg-gray-700 transition-all duration-300"}>
                Shop Headphones
              </Button>
            </div>
          </div>

          {/* Product showcase */}
          <div className="lg:w-1/2 relative">
            <div
              ref={productRef}
              className="relative bg-gray-800/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 p-6"
            >
              <div className="relative h-64 md:h-80 w-full">
                <img
                  src={heroProducts[activeIndex].image}
                  alt={heroProducts[activeIndex].name}
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
                />
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white">
                  {heroProducts[activeIndex].name}
                </h3>
                <p className="text-gray-300 mt-2">
                  {heroProducts[activeIndex].description}
                </p>
                <p className="text-xl text-purple-400 font-bold mt-4">
                  {heroProducts[activeIndex].price}
                </p>
              </div>
            </div>

            {/* Product controls */}
            <div
              ref={controlsRef}
              className="flex justify-between items-center mt-6"
            >
              <button
                onClick={prevProduct}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all"
              >
                <FiChevronLeft size={24} />
              </button>

              <div className="flex space-x-2">
                {heroProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeIndex
                        ? "bg-purple-500 w-6"
                        : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextProduct}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-all"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating gaming elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-4">
          {["RGB", "Mechanical", "Wireless", "Surround"].map(
            (feature, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm text-white"
              >
                {feature}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
