import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiShoppingCart,
  FiStar,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {productData} from "../data/data"
import Button from "./Button";
gsap.registerPlugin(ScrollTrigger);


export default function Products() {
  // slide index (which slide-group is visible)
  const [currentIndex, setCurrentIndex] = useState(0);

  // visible cards per slide: default to desktop; will be corrected on mount/resize
  const [visibleCount, setVisibleCount] = useState(4);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]); // refs for reveal animations
  const intervalRef = useRef(null);

  // recompute chunks whenever visibleCount changes
  const chunkedProducts = useMemo(() => {
    const chunks = [];
    const n = visibleCount;
    for (let i = 0; i < productData.length; i += n) {
      chunks.push(productData.slice(i, i + n));
    }
    return chunks;
  }, [visibleCount]);

  const totalSlides = chunkedProducts.length;

  // clamp index when totalSlides changes (prevents out-of-range index)
  useEffect(() => {
    if (currentIndex >= totalSlides) {
      setCurrentIndex(Math.max(0, totalSlides - 1));
    }
  }, [totalSlides, currentIndex]);

  // responsive breakpoints (run on mount and on resize)
  useEffect(() => {
    const updateVisible = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  // Autoplay (pause/resume on hover)
  const startAuto = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
  }, [totalSlides]);

  const stopAuto = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (totalSlides > 1) startAuto();
    return () => clearInterval(intervalRef.current);
  }, [startAuto, totalSlides]);

  // Card reveal animations (GSAP) — optional, and does not animate the track transform
  useEffect(() => {
    // reset refs array so we don't keep stale refs across chunk changes
    cardsRef.current = cardsRef.current.slice(0, productData.length);

    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [chunkedProducts]); // re-run when chunks change

  // compute track transform percent — shift by one viewport (slide) each increment
  // note: translate% relative to the track; the needed percent is (currentIndex * (100 / totalSlides))%
  const trackStyle = {
    width: `${totalSlides * 100}%`,
    transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
    transition: "transform 600ms cubic-bezier(.22,.9,.3,1)",
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-b from-black to-purple-300 dark:fron-black dark:to-gray-700 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="section-header text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 mb-4 pb-2">
            GAMING PERIPHIRALS
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Premium gear designed for competitive gamers and streamers
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <Button
            aria-label="Previous"
            handleclick={() =>
              setCurrentIndex((p) => (p - 1 + totalSlides) % totalSlides)
            }
            styles={"p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"}
          >
            <FiChevronLeft size={24} />
          </Button>

          <div className="flex space-x-2">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <Button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                handleclick={() => setCurrentIndex(idx)}
                styles={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-purple-600 w-6"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>

          <Button
            aria-label="Next"
            handleclick={() => setCurrentIndex((p) => (p + 1) % totalSlides)}
            styles={"p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"}
          >
            <FiChevronRight size={24} />
          </Button>
        </div>

        {/* Slider (viewport) */}
        <div
          className="overflow-hidden relative mb-8"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          {/* track */}
          <div ref={trackRef} className="flex" style={trackStyle}>
            {chunkedProducts.map((group, slideIndex) => (
              // slide = viewport width; its width MUST be (100 / totalSlides)% of the track
              <div
                key={slideIndex}
                className="flex"
                style={{ width: `${100 / totalSlides}%` }}
              >
                {/* each card inside slide gets width = 100 / visibleCount of the slide */}
                {group.map((product, i) => {
                  const cardIndex = slideIndex * visibleCount + i;
                  return (
                    <div
                      key={product.id}
                      className="px-2"
                      style={{ width: `${100 / visibleCount}%` }}
                      ref={(el) => (cardsRef.current[cardIndex] = el)}
                    >
                      <div className="from-purple-300 to-zinc-900 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                          />
                          <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {product.category === "headphone"
                              ? "Headset"
                              : "Keyboard"}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">
                              {product.name}
                            </h3>
                            <div className="flex items-center text-yellow-500">
                              <FiStar className="mr-1" />
                              <span className="text-sm font-medium">
                                {product.rating}
                              </span>
                            </div>
                          </div>
                          <ul className="mb-4">
                            {product.features.map((f, idx) => (
                              <li
                                key={idx}
                                className="flex items-center text-sm text-gray-900 dark:text-gray-300 mb-1"
                              >
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold">
                              ${product.price}
                            </span>
                            <Button styles={"flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:from-purple-700 hover:to-blue-700"}>
                              <FiShoppingCart className="mr-2" /> Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button styles={"inline-flex items-center px-6 py-3 rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"}>
            View All Products
            <FiArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
