import { useState } from "react";
import { motion } from "framer-motion";
import { useCartDrawer } from "./CartDrawerContext";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { 
    cartItems, 
    totalPrice, 
    removeFromCart, 
    updateQuantity,
    clearCart,
  } = useCartDrawer();
  
  const navigate = useNavigate();
  const handleViewitem = (category) => {
    navigate("/categories", { state: { scrollTo: category } });
  };
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    payment: "credit-card"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) return;
    setLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would send the order to your backend here
      // const response = await api.post('/orders', { 
      //   items: cartItems, 
      //   total: totalPrice,
      //   customer: formData
      // });

      setOrderPlaced(true);
      clearCart();
      
      // Redirect after 3 seconds
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-md w-full shadow-xl"
        >
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Thank you for your purchase. A confirmation has been sent to {formData.email}.
          </p>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            Redirecting to home page...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50 dark:bg-gray-900">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
          <XMarkIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Add some items before checking out
        </p>
        <Button
           handleclick={() => handleViewitem('category')}
          styles="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
        >
          Browse items
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            handleclick={() => navigate(-1)}
            styles="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Link to='/'><ArrowLeftIcon className="h-6 w-6" /></Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">
            Checkout ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Order
            </h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {cartItems.map((item) => (
                <div key={item.id} className="py-4 flex items-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <p className="font-medium dark:text-amber-50">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <Button
                        handleclick={() => updateQuantity(item.id, item.quantity - 1)}
                        styles="p-1 text-gray-500 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        -
                      </Button>
                      <span className="mx-2 w-8 text-center dark:text-amber-50">{item.quantity}</span>
                      <Button
                        handleclick={() => updateQuantity(item.id, item.quantity + 1)}
                        styles="p-1 text-gray-500 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        +
                      </Button>
                      <Button
                        handleclick={() => removeFromCart(item.id)}
                        styles="ml-4 text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600 dark:text-amber-50">Subtotal</span>
                <span className="font-medium dark:text-amber-50">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 ">
                <span className="text-gray-600 dark:text-amber-50">Shipping</span>
                <span className="font-medium dark:text-amber-50">Free</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold dark:text-amber-50">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Customer Information
            </h2>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Shipping Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Payment Method
                  </label>
                  <select
                    name="payment"
                    value={formData.payment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="credit-card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full mt-6 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition-all ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}