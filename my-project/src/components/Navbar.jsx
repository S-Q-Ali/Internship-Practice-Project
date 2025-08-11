import { Link } from "react-router-dom";
import { 
  FiSearch,
  FiUser,
  FiMenu,
  FiX
} from "react-icons/fi";
import { RiShoppingCartLine } from "react-icons/ri";
import { LuSunMoon,LuSun } from "react-icons/lu";
import { useState } from "react";

export default function Navbar({ darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r to-purple-900/60 from-zinc-900 w-full backdrop-blur-sm border-b border-border sticky top-0 z-30 text-amber-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-brand to-brand-dark rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-brand-foreground font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-brand transition-colors duration-200">
              ShopHub
            </span>
          </Link>

          <div className=" md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-4 pr-12 py-2.5 text-zinc-900 placeholder:text-amber-50 border border-border border-amber-50 rounded-full focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-200 text-sm"

              /> 
              <button className="dark:text-amber-50 absolute right-2 top-1/2 transform -translate-y-1/2 p-2  hover:text-brand transition-colors duration-200">
                <FiSearch className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/"
              className="text-foreground hover:text-brand transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-foreground hover:text-brand transition-colors duration-200 font-medium"
            >
              Products
            </Link>
            {/* <Link
              to="/categories"
              className="text-foreground hover:text-brand transition-colors duration-200 font-medium"
            >
              Categories
            </Link>
            <Link
              to="/deals"
              className="text-foreground hover:text-brand transition-colors duration-200 font-medium"
            >
              Deals
            </Link> */}
            <Link
              to="/about"
              className="text-foreground hover:text-brand transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-foreground hover:text-brand transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center m-3">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="text-2xl hover:text-3xl transition-all duration-300 cursor-pointer"
            >
              {darkMode ? <LuSunMoon /> : <LuSun />}
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button className="hidden sm:flex items-center space-x-1 text-2xl hover:text-3xl transition-all duration-300 cursor-pointer">
              <span className="text-sm font-medium">Track</span>
            </button>

            <button className="flex items-center space-x-1">
              <FiUser className="w-5 h-5 text-2xl hover:text-3xl transition-all duration-300 cursor-pointer" />
              <span className="hidden sm:inline text-sm font-medium">
                Account
              </span>
            </button>

            <button className="relative flex items-center space-x-1 text-2xl hover:text-3xl transition-all duration-300 cursor-pointer">
              <div className="relative">
                <RiShoppingCartLine className="w-5 h-5 text-2xl hover:text-3xl transition-all duration-300 cursor-pointer" />
                <span className="absolute -top-2 -right-2 h-4 w-4 bg-brand text-brand-foreground rounded-full flex items-center justify-center text-xs font-medium">
                  3
                </span>
              </div>
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-brand transition-colors duration-200"
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-2.5 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-200 text-sm"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-brand transition-colors duration-200">
              <FiSearch className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-border mt-2 pt-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-foreground hover:text-brand transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-foreground hover:text-brand transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="text-foreground hover:text-brand transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/deals"
                className="text-foreground hover:text-brand transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-brand transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-foreground hover:text-brand transition-colors duration-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}