import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import {categories} from "../data/data"



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
