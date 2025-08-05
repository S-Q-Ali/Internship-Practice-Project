import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-brand-light/50 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
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

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-4 pr-12 py-2.5 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-200 text-sm"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-brand transition-colors duration-200">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
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
            <Link
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
            </Link>
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

          <div className="flex items-center space-x-4">
            <button className="hidden sm:flex items-center space-x-1 text-muted-foreground hover:text-brand transition-colors duration-200 group">
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium">Track</span>
            </button>

            <button className="flex items-center space-x-1 text-muted-foreground hover:text-brand transition-colors duration-200 group">
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="hidden sm:inline text-sm font-medium">
                Account
              </span>
            </button>

            <button className="relative flex items-center space-x-1 text-muted-foreground hover:text-brand transition-colors duration-200 group">
              <div className="relative">
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6L5 9z"
                  />
                </svg>
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-2.5 bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all duration-200 text-sm"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-muted-foreground hover:text-brand transition-colors duration-200">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
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
