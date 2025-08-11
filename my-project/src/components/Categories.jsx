import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

import keyboard_1 from "../../assets/keyborads/keyboard_1.png";
import keyboard_2 from "../../assets/keyborads/keyboard_2.png";
import keyboard_3 from "../../assets/keyborads/keyboard_3.png";
import headphone_1 from "../../assets/headphones/headphone_1.png";
import headphone_2 from "../../assets/headphones/headphone_2.png";
import headphone_3 from "../../assets/headphones/headphone_3.png";
import mouse_1 from "../../assets/mouses/mouse_1.png";
import mouse_2 from "../../assets/mouses/mouse_2.png";
import mouse_3 from "../../assets/mouses/mouse_3.png";
import speaker_1 from "../../assets/speakers/speaker_1.png";
import speaker_2 from "../../assets/speakers/speaker_2.png";
import speaker_3 from "../../assets/speakers/speaker_3.png";

const CategoryPage = () => {
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addCardRef = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      }
    );
  }, []);

  const categories = [
    {
      title: "BUY LATEST HEADPHONES",
      gradient: "from-pink-500 to-red-600",
      products: [
        { id: 1, name: "Wireless Noise-Canceling Headphones", category: "headphones", price: 199.99, rating: 4.7, image: headphone_1, features: ["Bluetooth 5.0", "ANC", "40h Battery"] },
        { id: 2, name: "Wireless Noise-Canceling Headphones", category: "headphones", price: 199.99, rating: 4.7, image: headphone_2, features: ["Bluetooth 5.0", "ANC", "40h Battery"] },
        { id: 3, name: "Wireless Noise-Canceling Headphones", category: "headphones", price: 199.99, rating: 4.7, image: headphone_3, features: ["Bluetooth 5.0", "ANC", "40h Battery"] },
      ],
    },
    {
      title: "BUY LATEST MOUSES",
      gradient: "from-orange-500 to-yellow-500",
      products: [
        { id: 1, name: "Ergonomic Wireless Mouse", category: "mouse", price: 59.99, rating: 4.5, image: mouse_1, features: ["Silent Click", "Rechargeable", "Adjustable DPI"] },
        { id: 2, name: "Ergonomic Wireless Mouse", category: "mouse", price: 59.99, rating: 4.5, image: mouse_2, features: ["Silent Click", "Rechargeable", "Adjustable DPI"] },
        { id: 3, name: "Ergonomic Wireless Mouse", category: "mouse", price: 59.99, rating: 4.5, image: mouse_3, features: ["Silent Click", "Rechargeable", "Adjustable DPI"] },
      ],
    },
    { 
      title: "BUY LATEST SPEAKERS",
      gradient: "from-purple-500 to-indigo-600",
      products: [
        { id: 1, name: "Portable Bluetooth Speaker", category: "speaker", price: 89.99, rating: 4.6, image: speaker_1, features: ["Waterproof", "12h Playtime", "Deep Bass"] },
        { id: 2, name: "Portable Bluetooth Speaker", category: "speaker", price: 89.99, rating: 4.6, image: speaker_2, features: ["Waterproof", "12h Playtime", "Deep Bass"] },
        { id: 3, name: "Portable Bluetooth Speaker", category: "speaker", price: 89.99, rating: 4.6, image: speaker_3, features: ["Waterproof", "12h Playtime", "Deep Bass"] },
      ],
    },
    {
      title: "BUY LATEST KEYBOARDS",
      gradient: "from-green-500 to-emerald-700",
      products: [
        { id: 1, name: "Mechanical Gaming Keyboard", category: "keyboard", price: 129.99, rating: 4.8, image: keyboard_1, features: ["RGB Backlit", "Tactile Switches", "Anti-Ghosting"] },
        { id: 2, name: "Mechanical Gaming Keyboard", category: "keyboard", price: 129.99, rating: 4.8, image: keyboard_2, features: ["RGB Backlit", "Tactile Switches", "Anti-Ghosting"] },
        { id: 3, name: "Mechanical Gaming Keyboard", category: "keyboard", price: 129.99, rating: 4.8, image: keyboard_3, features: ["RGB Backlit", "Tactile Switches", "Anti-Ghosting"] },
      ],
    },
  ];

  return (
    <main className="bg-zinc-900 min-h-screen py-12 px-6">
      {categories.map((category, index) => (
        <section key={index} className={`my-12 p-6 rounded-2xl bg-gradient-to-r ${category.gradient}`}>
          <h2 className="text-3xl font-extrabold text-white mb-8 drop-shadow-lg">{category.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {category.products.map((product) => (
              <div
                key={product.id}
                ref={addCardRef}
                className="relative bg-white rounded-2xl shadow-lg overflow-hidden p-4 cursor-pointer hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-[1.05] transition-all duration-300 group"
              >
                {/* Wishlist Button */}
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white transition-colors">
                  <FiHeart size={20} />
                </button>

                {/* Product Image */}
                <img src={product.image} alt={product.name} className="w-full h-48 object-contain rounded-lg mb-4 group-hover:scale-105 transition-transform" />

                {/* Product Info */}
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                <p className="text-xl font-semibold mt-2">${product.price}</p>
                <p className="text-yellow-500 font-semibold">⭐ {product.rating}</p>

                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>

                {/* Add to Cart Button */}
                <button className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                  <FiShoppingCart /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default CategoryPage;
