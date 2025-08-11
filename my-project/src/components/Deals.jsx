import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { FiClock, FiChevronRight } from "react-icons/fi";
import {deals} from "../data/data"

/* ---------------------------
  Helper: chunk array into pages
---------------------------- */
function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function DealsSection() {
  const [dealsData, setDealsData] = useState(deals);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  // responsive cardsPerPage
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCardsPerPage(1);
      else if (w < 1024) setCardsPerPage(2);
      else setCardsPerPage(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // chunk deals into pages based on cardsPerPage
  const pages = useMemo(
    () => chunkArray(dealsData, cardsPerPage),
    [dealsData, cardsPerPage]
  );
  const slidesCount = Math.max(1, pages.length);

  // clamp slideIndex when pages change
  useEffect(() => {
    if (slideIndex >= slidesCount) setSlideIndex(0);
  }, [slidesCount, slideIndex]);

  // live countdown per deal
  useEffect(() => {
    const timer = setInterval(() => {
      setDealsData((prev) =>
        prev.map((d) => {
          const diff = new Date(d.endTime) - new Date();
          if (diff <= 0) return { ...d, timeLeft: "00:00:00" };
          const hh = String(Math.floor(diff / (1000 * 60 * 60))).padStart(
            2,
            "0"
          );
          const mm = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
            2,
            "0"
          );
          const ss = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
          return { ...d, timeLeft: `${hh}:${mm}:${ss}` };
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // autoplay page-by-page
  useEffect(() => {
    if (slidesCount <= 1) return;
    const id = setInterval(() => {
      setSlideIndex((s) => (s + 1) % slidesCount);
    }, 3500);
    return () => clearInterval(id);
  }, [slidesCount]);

  // animation: slow, smooth scale + fade for ALL visible cards at once
  useEffect(() => {
    if (!sliderRef.current) return;
    // select only visible cards of current slide
    const visibleSlide = sliderRef.current.querySelector(
      `[data-slide="${slideIndex}"]`
    );
    if (!visibleSlide) return;
    const nodes = visibleSlide.querySelectorAll(".deal-card");
    if (!nodes.length) return;

    // clear any previous animation state quickly (prevent stacking)
    gsap.killTweensOf(nodes);

    gsap.fromTo(
      nodes,
      { opacity: 50, scale: 0.95, y: 12 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.8, // slower, smooth
        ease: "power2.out",
        stagger: 0, // all animate together; set >0 to cascade
      }
    );
  }, [slideIndex, cardsPerPage, dealsData]);

  // helper to navigate manually if needed
  const prev = () => setSlideIndex((s) => (s - 1 + slidesCount) % slidesCount);
  const next = () => setSlideIndex((s) => (s + 1) % slidesCount);

  const trackStyle = {
    width: `${slidesCount * 100}%`,
    transform: `translateX(-${slideIndex * (100 / slidesCount)}%)`,
    transition: "transform 0.7s cubic-bezier(.22,.9,.25,1)",
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-300 via-red-700 to-red-800 dark:from-gray-700 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-700 to-red-400 mb-2">
            HOT DEALS
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Limited-time offers on premium gaming gear
          </p>
        </div>

        {/* controls */}
        <div className="flex justify-center mb-4 gap-2">
          <button
            onClick={prev}
            className="p-2 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-md text-black font-semibold shadow-md hover:scale-105 transition"
          >
            Prev
          </button>
          <button
            onClick={next}
            className="p-2 bg-gradient-to-r from-amber-500 to-yellow-300 rounded-md text-black font-semibold shadow-md hover:scale-105 transition"
          >
            Next
          </button>
        </div>

        {/* slider */}
        <div className="overflow-hidden">
          <div ref={sliderRef} className="flex" style={trackStyle}>
            {pages.map((page, pageIdx) => (
              <div
                key={pageIdx}
                className="flex"
                style={{ width: `${100 / slidesCount}%` }}
              >
                {page.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4"
                    style={{ width: `${100 / cardsPerPage}%` }}
                  >
                    <div className="deal-card relative dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                      {/* discount badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold py-1 px-3 rounded-full shadow-md z-10">
                        {deal.discount}
                      </div>

                      <div className="h-40 flex items-center justify-center dark:bg-gray-700">
                        <img
                          src={deal.image}
                          alt={deal.title}
                          className="max-h-full p-2"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-lg dark:text-zinc-200">
                          {deal.title}
                        </h3>
                        <ul className="text-sm text-amber-400 dark:text-gray-300 mb-3">
                          {deal.features.map((f, i) => (
                            <li key={i}>• {f}</li>
                          ))}
                        </ul>

                        <div className="flex items-center justify-between text-xl py-2">
                          <span className="line-through text-amber-500">
                            {deal.originalPrice}
                          </span>
                          <span className="font-semibold text-yellow-300">
                            {deal.dealPrice}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          <FiClock className="text-amber-400" />
                          <span className="font-mono text-red-500 dark:text-yellow-400">
                            {deal.timeLeft}
                          </span>
                        </div>

                        <button className="w-full mt-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold py-2 rounded-lg flex items-center justify-center hover:scale-105 transition">
                          Grab Deal <FiChevronRight className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: slidesCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === slideIndex ? "bg-amber-500 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

