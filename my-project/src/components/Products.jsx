import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiShoppingCart,
  FiStar,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import keyboard_1 from "../../assets/headphones/image_1.png";
import headphone_1 from "../../assets/headphones/image_2.png";
import keyboard_2 from "../../assets/headphones/image_3.png";
import keyboard_3 from "../../assets/headphones/image_4.png";
import headphone_2 from "../../assets/headphones/image_5.png"
gsap.registerPlugin(ScrollTrigger);

const productData = [
  {
    id: 1,
    name: "Mechanical Gaming Keyboard",
    category: "keyboard",
    price: 129.99,
    rating: 4.8,
    image: keyboard_1,
    features: ["RGB Backlit", "Tactile Switches", "Anti-Ghosting"],
    animateDelay: 0.1,
  },
  {
    id: 2,
    name: "Wireless Gaming Headset",
    category: "headphone",
    price: 159.99,
    rating: 4.7,
    image: headphone_1,
    features: ["7.1 Surround", "Noise Cancelling", "50mm Drivers"],
    animateDelay: 0.3,
  },
  {
    id: 3,
    name: "Compact Tenkeyless Keyboard",
    category: "keyboard",
    price: 99.99,
    rating: 4.5,
    image: keyboard_2,
    features: ["87 Keys", "Low Profile", "Fast Actuation"],
    animateDelay: 0.5,
  },
  {
    id: 4,
    name: "Pro Gaming KeyBoard",
    category: "keyboard",
    price: 199.99,
    rating: 4.9,
    image: keyboard_3,
    features: ["Memory Foam", "Detachable Mic", "Hi-Res Audio"],
    animateDelay: 0.7,
  },
  {
    id: 5,
    name: "Mechanical Gaming Keyboard",
    category: "keyboard",
    price: 129.99,
    rating: 4.8,
    image: keyboard_1,
    features: ["RGB Backlit", "Tactile Switches", "Anti-Ghosting"],
    animateDelay: 0.1,
  },
  {
    id: 6,
    name: "Wireless Gaming Headset",
    category: "headphone",
    price: 159.99,
    rating: 4.7,
    image: headphone_2,
    features: ["7.1 Surround", "Noise Cancelling", "50mm Drivers"],
    animateDelay: 0.3,
  },
  {
    id: 7,
    name: "Compact Tenkeyless Keyboard",
    category: "keyboard",
    price: 99.99,
    rating: 4.5,
    image: keyboard_2,
    features: ["87 Keys", "Low Profile", "Fast Actuation"],
    animateDelay: 0.5,
  },
  {
    id: 8,
    name: "Pro Gaming Headphones",
    category: "headphone",
    price: 199.99,
    rating: 4.9,
    image: keyboard_3,
    features: ["Memory Foam", "Detachable Mic", "Hi-Res Audio"],
    animateDelay: 0.7,
  },
];

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -10,
    transition: { duration: 0.3 },
  },
};

// Responsive breakpoints configuration
const responsiveConfig = {
  mobile: { items: 1, breakpoint: 640 },
  tablet: { items: 2, breakpoint: 768 },
  desktop: { items: 4, breakpoint: 1024 },
};

export default function Products() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const cardsRef = useRef([]);
  const intervalRef = useRef(null);
  
  // Calculate total slides based on visibleCount
  const totalSlides = Math.ceil(productData.length / visibleCount);

  // Handle responsive visibility
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < responsiveConfig.mobile.breakpoint) {
        setVisibleCount(1);
      } else if (width < responsiveConfig.tablet.breakpoint) {
        setVisibleCount(2);
      } else if (width < responsiveConfig.desktop.breakpoint) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize animations and auto-slide
  useEffect(() => {
  // Set initial state for cards
  gsap.set(cardsRef.current, { opacity: 0, y: 20 });

  // Section header animation
  gsap.from(sectionRef.current.querySelector(".section-header"), {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  // Define event handlers
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -10,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Card animations
  cardsRef.current.forEach((card, index) => {
    if (card) {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: card,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Add event listeners with the defined handlers
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    }
  });

  // Auto-slide setup
  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);
  };

  startAutoSlide();

  return () => {
    clearInterval(intervalRef.current);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    
    // Clean up event listeners with the same handlers
    cardsRef.current.forEach((card) => {
      if (card) {
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    });
  };
}, [totalSlides, visibleCount]);
  // Slide animation
  useEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: -currentIndex * (100 / visibleCount) * sliderRef.current.offsetWidth / 100,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [currentIndex, visibleCount]);

  // Navigation functions
  const goToNext = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    resetAutoSlide();
  };

  const goToPrev = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    resetAutoSlide();
  };

  const goToSlide = (index) => {
    clearInterval(intervalRef.current);
    setCurrentIndex(index);
    resetAutoSlide();
  };

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-400 mb-4">
            Gaming Peripherals
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Premium gear designed for competitive gamers and streamers
          </p>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={goToPrev}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            disabled={currentIndex === 0}
          >
            <FiChevronLeft size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-purple-600 w-6"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            disabled={currentIndex >= totalSlides - 1}
          >
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* Products Slider */}
        <div className="overflow-hidden relative mb-8">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${(productData.length / visibleCount) * 100}%` }}
          >
            {productData.map((product, index) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4 px-2"
                ref={(el) => (cardsRef.current[index] = el)}
                style={{ opacity: 0 }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform will-change-transform h-full">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.category === "headphone" ? "Headset" : "Keyboard"}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <div className="flex items-center text-yellow-500">
                        <FiStar className="mr-1" />
                        <span className="text-sm font-medium">
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="mb-4">
                      {product.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-1"
                        >
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price & CTA */}
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      <button className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all">
                        <FiShoppingCart className="mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all">
            View All Products
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}