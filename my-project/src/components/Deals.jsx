import { useRef, useEffect,useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiClock, FiChevronRight } from "react-icons/fi";
import keyboard_1 from "../../assets/headphones/image_2.png";
import keyboard_2 from "../../assets/headphones/image_3.png";
import headset from "../../assets/headphones/image_1.png";
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function DealsSection() {
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef(null);
  const dealCardsRef = useRef([]);
  const countdownRefs = useRef([]);
  console.log(deals);
  useEffect(() => {
    // Simulate loading (remove this in production)
    const timer = setTimeout(() => setIsLoading(false), 500);

    return () => clearTimeout(timer);
  }, []);
  // Animation on component mount
    useEffect(() => {
    if (isLoading) return;

    // Animation on component mount
    dealCardsRef.current.forEach((card, index) => {
      // Only animate if card exists
      if (!card) return;
      

      card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        rotateY: 6,
        rotateX: 2,
        duration: 0.5,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    // Feature list animation
    gsap.from(card.querySelectorAll(".deal-feature"), {
      x: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15
    });
  });

  // Enhanced badge animation
  gsap.to(".discount-badge", {
    scale: 1.05,
    y: -2,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "sine.inOut",
    stagger: 0.2
  });

  // Image parallax
  gsap.to(".deal-image", {
    yPercent: -10,
    ease: "none",
    scrollTrigger: {
      trigger: ".deal-card",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  // Cleanup
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    dealCardsRef.current.forEach(card => {
      if (card) {
        card.removeEventListener('mouseenter');
        card.removeEventListener('mouseleave');
      }
    });
  };
}, [isLoading]);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="section-header text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 mb-4">
            Hot Deals
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Limited-time offers on premium gaming gear
          </p>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              ref={(el) => (dealCardsRef.current[index] = el)}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transform-style-preserve-3d perspective-1000 hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Discount Badge */}
              <div className="discount-badge absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-2 px-4 rounded-full z-10 shadow-lg">
                {deal.discount}
              </div>

              {/* Product Image */}
              <div className="h-48 relative overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {/* Added flex centering */}
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="max-w-full max-h-full object-contain p-2"
                  onError={(e) => {
                    console.error("Failed to load:", deal.image);
                    e.target.src = "/fallback-image.png"; // Add a fallback
                  }}
                />
                {/* Price Stripe */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-red-500/90 to-orange-500/90 text-white py-3 px-6 flex justify-between items-center">
                  <span className="line-through opacity-80">
                    {deal.originalPrice}
                  </span>
                  <span className="text-xl font-bold">{deal.dealPrice}</span>
                </div>
              </div>

              {/* Deal Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {deal.title}
                </h3>

                {/* Features */}
                <ul className="mb-4 space-y-2">
                  {deal.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Countdown Timer */}
                <div
                  ref={(el) => (countdownRefs.current[index] = el)}
                  className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4"
                >
                  <FiClock className="text-orange-500" />
                  <span className="font-mono text-sm font-medium">
                    Ends in:{" "}
                    <span className="text-red-500">{deal.timeLeft}</span>
                  </span>
                </div>

                {/* CTA Button */}
                <button className="w-full flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all group">
                  <span>Grab Deal</span>
                  <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-white bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            View All Deals
            <FiChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}


const deals = [
  {
    id: 1,
    title: "Mechanical Keyboard Pro",
    discount: "40% OFF",
    originalPrice: "$129.99",
    dealPrice: "$77.99",
    image: keyboard_1,
    timeLeft: "12:45:30",
    features: ["RGB Backlit", "Cherry MX Switches", "Aluminum Frame"],
  },
  {
    id: 2,
    title: "Wireless Gaming Headset",
    discount: "35% OFF",
    originalPrice: "$159.99",
    dealPrice: "$103.99",
    image: headset,
    timeLeft: "08:30:15",
    features: ["7.1 Surround", "Noise Cancelling", "30h Battery"],
  },
  {
    id: 3,
    title: "RGB KeyBoard",
    discount: "25% OFF",
    originalPrice: "$79.99",
    dealPrice: "$59.99",
    image: keyboard_2,
    timeLeft: "23:15:45",
    features: ["16K DPI", "11 Programmable Buttons", "Ergonomic"],
  },
];
