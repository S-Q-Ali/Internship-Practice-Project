import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useCartDrawer } from "./CartDrawerContext";
import { Link } from "react-router-dom";
import Button from "./Button";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiMinus,FiPlus } from "react-icons/fi";



export default function CartDrawer() {
  const {
    open,
    setOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    totalItems,
  } = useCartDrawer();

  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <Transition show={open} as={Fragment}>
      <Dialog className="relative z-50" onClose={setOpen}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        {/* Drawer container */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              {/* Sliding panel */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-400"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-transparent shadow-xl border-l border-indigo-500/20">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-500/20 bg-gradient-to-r from-indigo-900/10 to-transparent">
                      <Dialog.Title className="text-xl font-bold text-white">
                        YOUR CART ({totalItems})
                      </Dialog.Title>
                      <Button
                        handleclick={() => setOpen(false)}
                        styles={"p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-all"}
                      >
                        <XMarkIcon className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Cart content */}
                    <div className="flex-1 overflow-y-auto p-6">
                      {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <div className="w-24 h-24 bg-gradient-to-r from-red-900 via-purple-900 to-zinc-900 rounded-full flex items-center justify-center mb-4">
                           < MdOutlineShoppingCart className="text-6xl text-amber-50" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-300">
                            Your cart is empty
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 ">
                            Start adding some products!
                          </p>
                          <Button
                            handleclick={() => setOpen(false)}
                            styles={"mt-6 px-4 py-2 bg-gradient-to-r from-red-900 via-purple-900 to-zinc-900 text-white rounded-md transition-colors hover:bg-gradient-to-r hover:from-red-600 hover:via-purple-600 hover:to-zinc-800 transition-all duration-1000 cursor-pointer"}
                          >
                            Browse Products
                          </Button>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-800">
                          {cartItems.map((product) => (
                            <li key={product.id} className="py-6">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md bg-gray-800 border border-gray-700">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-white">
                                      <h3>{product.name}</h3>
                                      <p className="ml-4">
                                        $
                                        {(
                                          product.price * product.quantity
                                        ).toFixed(2)}
                                      </p>
                                    </div>
                                    {product.color && (
                                      <p className="mt-1 text-sm text-indigo-400">
                                        {product.color}
                                      </p>
                                    )}
                                  </div>

                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        handleclick={() =>
                                          updateQuantity(
                                            product.id,
                                            product.quantity - 1
                                          )
                                        }
                                        styles={"text-gray-400 text-xl hover:text-white p-1"}
                                      >
                                        <span className="sr-only">
                                          Decrease quantity
                                        </span>
                                        <FiMinus />
                                      </Button>
                                      <span className="text-white font-medium">
                                        {product.quantity}
                                      </span>
                                      <Button
                                        handleclick={() =>
                                          updateQuantity(
                                            product.id,
                                            product.quantity + 1
                                          )
                                        }
                                        styles={"text-gray-400 hover:text-white text-xl p-1"}
                                      >
                                        <span className="sr-only">
                                          Increase quantity
                                        </span>
                                        <FiPlus />
                                      </Button>
                                    </div>

                                    <Button
                                      handleclick={() => removeFromCart(product.id)}
                                      styles={"text-gray-500 hover:text-red-500 transition-colors cursor-pointer"}
                                    >
                                      <TrashIcon className="h-5 w-5" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Footer with checkout */}
                    {cartItems.length > 0 && (
                      <div className="border-t border-gray-800 px-6 py-4 bg-gray-800/50">
                        <div className="flex justify-between text-base font-medium text-white mb-4">
                          <p>Subtotal</p>
                          <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-400 mb-6">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <Link
                          to="/checkout"
                          onClick={() => setOpen(false)}
                          className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                        <div className="mt-4 flex justify-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <Button
                              type="Button"
                              styles={"text-indigo-400 hover:text-indigo-300 font-medium"}
                              handleclick={() => setOpen(false)}
                            >
                              Continue Shopping
                            </Button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
