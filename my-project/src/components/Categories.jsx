import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import keyboard_1 from "../../assets/keyborads/keyboard_1.png";
import keyboard_2 from "../../assets/keyborads/keyboard_2.png";
import keyboard_3 from "../../assets/keyborads/keyboard_3.png";
import headphone_1 from "../../assets/headphones/headphone_1.png";
import headphone_2 from "../../assets/headphones/headphone_2.png";
import headphone_3 from "../../assets/headphones/headphone_3.png";
import mouse_1 from "../../assets/mouses/mouse_1.png"
import mouse_2 from "../../assets/mouses/mouse_2.png"
import mouse_3 from "../../assets/mouses/mouse_3.png"
import speaker_1 from "../../assets/speakers/speaker_1.png"
import speaker_2 from "../../assets/speakers/speaker_2.png"
import speaker_3 from "../../assets/speakers/speaker_3.png"


console.log(headphone_1===true);


const CategoryPage = () => {
  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      sectionRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, []);

  const categories = [
    {
      title: "BUY HEADPHONES",
      products: [
        {
          id: 1,
          name: "Wireless Noise-Canceling Headphones",
          category: "headphones",
          price: 199.99,
          rating: 4.7,
          image: headphone_1,
          features: ["Bluetooth 5.0", "ANC", "40h Battery"],
        },
        {
          id: 2,
          name: "Wireless Noise-Canceling Headphones",
          category: "headphones",
          price: 199.99,
          rating: 4.7,
          image: headphone_2,
          features: ["Bluetooth 5.0", "ANC", "40h Battery"],
        },
        {
          id: 2,
          name: "Wireless Noise-Canceling Headphones",
          category: "headphones",
          price: 199.99,
          rating: 4.7,
          image: headphone_3,
          features: ["Bluetooth 5.0", "ANC", "40h Battery"],
        },
      ],
      
    },
    {
      title: "BUY MOUSES",
      products: [
        {
          id: 1,
          name: "Ergonomic Wireless Mouse",
          category: "mouse",
          price: 59.99,
          rating: 4.5,
          image: mouse_1,
          features: ["Silent Click", "Rechargeable", "Adjustable DPI"],
        },
        {
          id: 2,
          name: "Ergonomic Wireless Mouse",
          category: "mouse",
          price: 59.99,
          rating: 4.5,
          image: mouse_2,
          features: ["Silent Click", "Rechargeable", "Adjustable DPI"],
        },

        {
          id: 3,
          name: "Ergonomic Wireless Mouse",
          category: "mouse",
          price: 59.99,
          rating: 4.5,
          image: mouse_3,
          features: ["Silent Click", "Rechargeable", "Adjustable DPI"],
        },

      ],
    },
    {
      title: "BUY SPEAKERS",
      products: [
        {
          id: 1,
          name: "Portable Bluetooth Speaker",
          category: "speaker",
          price: 89.99,
          rating: 4.6,
          image: speaker_1,
          features: ["Waterproof", "12h Playtime", "Deep Bass"],
        },
        {
          id: 2,
          name: "Portable Bluetooth Speaker",
          category: "speaker",
          price: 89.99,
          rating: 4.6,
          image: speaker_2,
          features: ["Waterproof", "12h Playtime", "Deep Bass"],
        },
        {
          id: 3,
          name: "Portable Bluetooth Speaker",
          category: "speaker",
          price: 89.99,
          rating: 4.6,
          image: speaker_3,
          features: ["Waterproof", "12h Playtime", "Deep Bass"],
        },
      ],
    },
    {
      title: "BUY KEYBOARDS",
      products: [
        {
          id: 1,
          name: "Mechanical Gaming Keyboard",
          category: "keyboard",
          price: 129.99,
          rating: 4.8,
          image: keyboard_1,
          features: ["RGB Backlit", "Tactile Switches", "Anti-Ghosting"],
        },
        {
          id: 2,
          name: "Mechanical Gaming Keyboard",
          category: "keyboard",
          price: 129.99,
          rating: 4.8,
          image: keyboard_2,
          features: ["RGB Backlit", "Tactile Switches", "Anti-Ghosting"],
        },
        {
          id: 3,
          name: "Mechanical Gaming Keyboard",
          category: "keyboard",
          price: 129.99,
          rating: 4.8,
          image: keyboard_3,
          features: ["RGB Backlit", "Tactile Switches", "Anti-Ghosting"],
        },
      ],
    },
  ];

  return (
    <main className="bg-gradient-to-r from-red-500 to-zinc-800 min-h-screen py-10 px-6 ">
      {categories.map((category, index) => (
        <section key={index} ref={addToRefs} className="my-12">
          <h2 className="text-3xl font-bold mb-6">{category.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {category.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 cursor-pointer hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>
                <p className="text-xl font-semibold mt-2">${product.price}</p>
                <p className="text-yellow-500">⭐ {product.rating}</p>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
                  {product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default CategoryPage;
