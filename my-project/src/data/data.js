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

export const heroProducts = [
  {
    id: 1,
    name: "Mechanical Gaming Keyboard",
    description: "RGB backlit with ultra-responsive switches",
    price: "$129.99",
    image: keyboard_1,
    type: "keyboard",
  },
  {
    id: 2,
    name: "Wireless Gaming Headset",
    description: "7.1 surround sound with noise cancellation",
    price: "$159.99",
    image: headphone_1,
    type: "headphone",
  },
  {
    id: 3,
    name: "Compact Tenkeyless Keyboard",
    description: "Perfect for FPS gaming with fast actuation",
    price: "$99.99",
    image: keyboard_2,
    type: "keyboard",
  },
  {
    id: 4,
    name: "Pro Gaming Headphones",
    description: "50mm drivers for immersive audio",
    price: "$199.99",
    image: headphone_2,
    type: "headphone",
  },
];



export const productData = [
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
    name: "Wireless Gaming Headset",
    category: "headphone",
    price: 159.99,
    rating: 4.7,
    image: headphone_1,
    features: ["7.1 Surround", "Noise Cancelling", "50mm Drivers"],
  },
  {
    id: 3,
    name: "Compact Tenkeyless Keyboard",
    category: "keyboard",
    price: 99.99,
    rating: 4.5,
    image: keyboard_2,
    features: ["87 Keys", "Low Profile", "Fast Actuation"],
  },
  {
    id: 4,
    name: "Pro Gaming Keyboard",
    category: "keyboard",
    price: 199.99,
    rating: 4.9,
    image: keyboard_3,
    features: ["Premium Build", "Custom Switches", "USB-C Connection"],
  },
  {
    id: 5,
    name: "Pro Gaming Mouse",
    category: "mouse",
    price: 79.99,
    rating: 4.6,
    image: mouse_1,
    features: ["Ultra-light", "Adjustable DPI", "RGB Lighting"],
  },
  {
    id: 6,
    name: "Ergonomic Wireless Mouse",
    category: "mouse",
    price: 69.99,
    rating: 4.5,
    image: mouse_2,
    features: ["Ergonomic Shape", "Rechargeable", "Silent Clicks"],
  },
  {
    id: 7,
    name: "High-Precision Gaming Mouse",
    category: "mouse",
    price: 89.99,
    rating: 4.7,
    image: mouse_3,
    features: ["16K DPI", "Programmable Buttons", "Onboard Memory"],
  },
  {
    id: 8,
    name: "Pro Gaming Headphones",
    category: "headphone",
    price: 199.99,
    rating: 4.9,
    image: headphone_2,
    features: ["Memory Foam", "Detachable Mic", "Hi-Res Audio"],
  },
  // {
  //   id: 9,
  //   name: "Studio Quality Headphones",
  //   category: "headphone",
  //   price: 249.99,
  //   rating: 4.9,
  //   image: headphone_3,
  //   features: ["Studio-Grade Sound", "Comfort Fit", "Noise Isolation"],
  // },
];



export const categories = [
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





  export const deals = [
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
