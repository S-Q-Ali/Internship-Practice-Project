import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { FiClock, FiChevronRight } from "react-icons/fi";
import keyboard_1 from "../../assets/keyborads/keyboard_1.png";
import keyboard_2 from "../../assets/keyborads/keyboard_2.png";
import keyboard_3 from "../../assets/keyborads/keyboard_3.png";
import headphone_1 from "../../assets/headphones/headphone_1.png";
import headphone_2 from "../../assets/headphones/headphone_2.png";
// import headphone_3 from "../../assets/headphones/headphone_3.png";
import mouse_1 from "../../assets/mouses/mouse_1.png";
import mouse_2 from "../../assets/mouses/mouse_2.png";
import mouse_3 from "../../assets/mouses/mouse_3.png";

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
    <section className="py-20 bg-gradient-to-b from-purple-300 to-zinc-600 dark:from-gray-700 dark:to-gray-950 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-orange-500">
            HOT DEALS
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Limited-time offers on premium gaming gear
          </p>
        </div>

        {/* controls (optional) */}
        <div className="flex justify-center mb-4 gap-2">
          <button onClick={prev} className="p-2 bg-gradient-to-r from-orange-600 to-yellow-400/45 rounded-md">
            Prev
          </button>
          <button onClick={next} className="p-2 bg-gradient-to-r from-orange-600 to-yellow-400/45 rounded-md">
            Next
          </button>
        </div>

        {/* slider viewport */}
        <div className="overflow-hidden">
          <div ref={sliderRef} className="flex" style={trackStyle}>
            {pages.map((page, pageIdx) => (
              <div
                key={pageIdx}
                data-slide={pageIdx}
                className="flex"
                style={{ width: `${100 / slidesCount}%` }} // each slide occupies 1 / slidesCount of track
              >
                {page.map((deal) => (
                  <div
                    key={deal.id}
                    className="p-4"
                    style={{ width: `${100 / cardsPerPage}%` }}
                  >
                    <div className="deal-card relative dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-1 px-3 rounded-full shadow-md z-10">
                        {deal.discount}
                      </div>

                      <div className="h-40 flex items-center justify-cente dark:bg-gray-700">
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
                        <ul className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          {deal.features.map((f, i) => (
                            <li key={i}>• {f}</li>
                          ))}
                        </ul>

                        <div className="flex items-center justify-between text-xl py-2">
                          <span className="line-through text-red-500">
                            {deal.originalPrice}
                          </span>
                          <span className="font-semibold text-amber-50">
                            {deal.dealPrice}
                          </span>
                        </div>

                        <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          <FiClock className="text-orange-500" />
                          <span className="font-mono dark:text-amber-600">
                            {deal.timeLeft}
                          </span>
                        </div>

                        <button className="w-full mt-3 bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 rounded-lg flex items-center justify-center">
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
                i === slideIndex ? "bg-red-500 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const deals = [
  {
    id: 1,
    title: "Mechanical Gaming Keyboard",
    discount: "15% OFF",
    originalPrice: "$152.93",
    dealPrice: "$129.99",
    image: keyboard_1,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    features: ["RGB Backlit", "Tactile Switches", "Anti-Ghosting"],
  },
  {
    id: 2,
    title: "Wireless Gaming Headset",
    discount: "12% OFF",
    originalPrice: "$181.81",
    dealPrice: "$159.99",
    image: headphone_1,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    features: ["7.1 Surround", "Noise Cancelling", "50mm Drivers"],
  },
  {
    id: 3,
    title: "Compact Tenkeyless Keyboard",
    discount: "10% OFF",
    originalPrice: "$111.10",
    dealPrice: "$99.99",
    image: keyboard_2,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    features: ["87 Keys", "Low Profile", "Fast Actuation"],
  },
  {
    id: 4,
    title: "Pro Gaming Keyboard",
    discount: "20% OFF",
    originalPrice: "$249.99",
    dealPrice: "$199.99",
    image: keyboard_3,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    features: ["Premium Build", "Custom Switches", "USB-C Connection"],
  },
  {
    id: 5,
    title: "Pro Gaming Mouse",
    discount: "20% OFF",
    originalPrice: "$99.99",
    dealPrice: "$79.99",
    image: mouse_1,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    features: ["Ultra-light", "Adjustable DPI", "RGB Lighting"],
  },
  {
    id: 6,
    title: "Ergonomic Wireless Mouse",
    discount: "14% OFF",
    originalPrice: "$81.39",
    dealPrice: "$69.99",
    image: mouse_2,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    features: ["Ergonomic Shape", "Rechargeable", "Silent Clicks"],
  },
  {
    id: 7,
    title: "High-Precision Gaming Mouse",
    discount: "11% OFF",
    originalPrice: "$100.89",
    dealPrice: "$89.99",
    image: mouse_3,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    features: ["16K DPI", "Programmable Buttons", "Onboard Memory"],
  },
  {
    id: 8,
    title: "Pro Gaming Headphones",
    discount: "20% OFF",
    originalPrice: "$249.99",
    dealPrice: "$199.99",
    image: headphone_2,
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
    features: ["Memory Foam", "Detachable Mic", "Hi-Res Audio"],
  },
  // {
  //   id: 9,
  //   title: "Studio Quality Headphones",
  //   discount: "16% OFF",
  //   originalPrice: "$297.61",
  //   dealPrice: "$249.99",
  //   image: headphone_3,
  //   endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
  //   features: ["Studio-Grade Sound", "Comfort Fit", "Noise Isolation"],
  // },
];
