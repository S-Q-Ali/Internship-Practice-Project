import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import {categories} from "../data/data"
import Button from "../components/Button"
import { useCartDrawer } from "./CartDrawerContext";



const CategoryPage = () => {
  const cardRefs = useRef([]);
  cardRefs.current = [];
  const { addToCart } = useCartDrawer();
  

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

    const handleAddToCart = (product) => {
    addToCart(product);
    // You could add a small animation here if desired
  };


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
                className="relative dark:text-white bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden p-4 cursor-pointer hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-[1.05] transition-all duration-300 group"
              >
                {/* Wishlist Button */}
                <Button>
                  <FiHeart className="dark:text-white absolute top-3 right-3 text-2xl hover:text-red-500 transition-all cursor-pointer" />
                </Button>

                {/* Product Image */}
                <img src={product.image} alt={product.name} className=" w-full h-48 object-contain rounded-lg mb-4 group-hover:scale-105 transition-transform" />

                {/* Product Info */}
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm dark:text-gray-100 text-gray-500 capitalize">{product.category}</p>
                <p className="text-xl dark:text-gray-100 font-semibold mt-2">${product.price}</p>
                <p className="text-yellow-500 font-semibold">⭐ {product.rating}</p>

                <ul className="mt-2 text-sm text-gray-600 dark:text-gray-100 list-disc list-inside">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>

                {/* Add to Cart Button */}
                <Button handleclick={()=>handleAddToCart(product)} styles={" mt-4 w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-1000 dark:hover:bg-gradient-to-r dark:hover:from-zinc-600 dark:hover:via-purple-600 dark:hover:to-red-600 dark:bg-gradient-to-r dark:from-zinc-950 dark:via-purple-950 dark:to-red-950"}>
                  <FiShoppingCart /> Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default CategoryPage;
