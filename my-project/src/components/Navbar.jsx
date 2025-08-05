import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiTruck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <>
      <nav className="w-full bg-amber-100 z-50 px-4 py-6 flex justify-between items-center sticky">
        <Link to="/">
          <div className="left-0 px-4 font-stretch-95% text-2xl">
            E-Commerce Website
          </div>
        </Link>

        <div className="relative w-3/12">
          <input
            type="text"
            placeholder="Search Your Products Here.."
            className="w-full rounded-4xl border-0 border-amber-300 py-2 p-2"
          />
          <span>
            <button className=" absolute top-1 right-1 items-center py-1 px-2.5 text-2xl">
                <IoSearchOutline />
            </button>
          </span>
        </div>
        <div className="text-center ">
          <ul className="hidden md:flex gap-6 items-center">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/products">
              <li>Products</li>
            </Link>
            <Link to="/catagories">
              <li>Catagories</li>
            </Link>
            <Link to="/deals">
              <li>Deals</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/contact">
              <li>Contact</li>
            </Link>
          </ul>
        </div>
        <div className="flex gap-4 ">
          <FiTruck className="text-xl hover:text-2xl cursor-pointer transition-all duration-300 " />
          <FaRegUser className="text-xl transition-all duration-300 hover:text-2xl cursor-pointer" />
          <MdOutlineShoppingBag className="text-xl transition-all duration-300 hover:text-2xl cursor-pointer" />
        </div>
      </nav>
    </>
  );
}

// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Products", path: "/products" },
//     { name: "Categories", path: "/categories" },
//     { name: "Deals", path: "/deals" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const isActiveLink = (path: string) => location.pathname === path;

//   return (
//     <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
//       <div className="container mx-auto px-4">
//         {/* Top bar */}
//         <div className="hidden md:flex justify-between items-center py-2 text-sm text-muted-foreground border-b">
//           <div className="flex items-center gap-4">
//             <span>Free shipping on orders over $50</span>
//             <span>|</span>
//             <span>24/7 Customer Support</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <Link to="/track-order" className="hover:text-foreground transition-colors">
//               Track Order
//             </Link>
//             <span>|</span>
//             <Link to="/help" className="hover:text-foreground transition-colors">
//               Help
//             </Link>
//           </div>
//         </div>

//         {/* Main navbar */}
//         <div className="flex items-center justify-between py-4">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
//               <ShoppingCart className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <span className="text-2xl font-bold text-foreground">ShopHub</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`text-sm font-medium transition-colors hover:text-primary ${
//                   isActiveLink(link.path)
//                     ? "text-primary border-b-2 border-primary pb-1"
//                     : "text-muted-foreground"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Search Bar */}
//           <div className="hidden md:flex items-center max-w-md flex-1 mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search products..."
//                 className="w-full pl-10 pr-4 py-2 bg-muted/50 border-muted focus:bg-background"
//               />
//             </div>
//           </div>

//           {/* Right side icons */}
//           <div className="flex items-center space-x-4">
//             {/* Mobile search */}
//             <Button variant="ghost" size="icon" className="md:hidden">
//               <Search className="h-5 w-5" />
//             </Button>

//             {/* Wishlist */}
//             <Button variant="ghost" size="icon" className="hidden sm:flex">
//               <Heart className="h-5 w-5" />
//             </Button>

//             {/* User menu */}
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                   <User className="h-5 w-5" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-56">
//                 <DropdownMenuItem asChild>
//                   <Link to="/profile">My Profile</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/orders">My Orders</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/wishlist">Wishlist</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/settings">Settings</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link to="/login">Sign In</Link>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>

//             {/* Shopping cart */}
//             <Button variant="ghost" size="icon" className="relative">
//               <ShoppingCart className="h-5 w-5" />
//               <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-primary">
//                 3
//               </Badge>
//             </Button>

//             {/* Mobile menu toggle */}
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         {isMenuOpen && (
//           <div className="lg:hidden border-t bg-background">
//             <div className="px-4 py-4 space-y-4">
//               {/* Mobile search */}
//               <div className="relative md:hidden">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   type="search"
//                   placeholder="Search products..."
//                   className="w-full pl-10 pr-4 py-2"
//                 />
//               </div>

//               {/* Mobile navigation links */}
//               <div className="space-y-2">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.path}
//                     to={link.path}
//                     className={`block py-2 px-4 rounded-md text-sm font-medium transition-colors ${
//                       isActiveLink(link.path)
//                         ? "bg-primary text-primary-foreground"
//                         : "text-muted-foreground hover:text-foreground hover:bg-muted"
//                     }`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>

//               {/* Mobile quick links */}
//               <div className="border-t pt-4 space-y-2">
//                 <Link
//                   to="/wishlist"
//                   className="block py-2 px-4 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Wishlist
//                 </Link>
//                 <Link
//                   to="/orders"
//                   className="block py-2 px-4 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   My Orders
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="block py-2 px-4 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Sign In
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };
