// import { useState } from 'react';
// import notification from "../../public/img/notification.png";
// import logout from "../../public/img/log-out.png";
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-[rgba(88,88,88,0.42)] mt-3 mx-2 rounded-[10px] p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-white text-4xl font-extrabold italic">
//           <span className='text-[#FF9D23]'>C</span>OFFEE <span className='text-[#FF9D23]'>S</span>HOP
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex space-x-10 text-xl">
//         <a href="/home" className="font-semibold hover:underline">Register</a>
//           <a href="/home" className="font-semibold hover:underline">
//             about
//           </a>
//           <a href="/services" className="text-white hover:text-gray-400">
//             Cart
//           </a>
//           <Link to="/payment" className="text-white hover:text-gray-400">Payment</Link>
//           <a className="text-white hover:text-gray-400">
//             Menu
//           </a>
//           <a href="/contact" className="text-white hover:text-gray-400">
//             Contact
//           </a>
//           <a className="text-white hover:text-gray-400">
//           <img src={notification} alt="Instagram" className="w-8 h-8" />
//           </a>
//           <a className="text-white hover:text-gray-400">
//           <img src={logout} alt="Instagram" className="w-8 h-8" />
//           </a>
//         </div>
//       </div>

//       {/* Hamburger Menu (Mobile) */}
//       <div className="md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-white focus:outline-none"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16m-7 6h7"
//               ></path>
//             </svg>
//           </button>
//         </div>

//       {/* Mobile Links (Dropdown) */}
//       {isOpen && (
//         <div className="md:hidden mt-4">
//           <a href="/" className="block text-white py-2 hover:bg-gray-700">
//             Home
//           </a>
//           <a href="/about" className="block text-white py-2 hover:bg-gray-700">
//             About
//           </a>
//           <a href="/services" className="block text-white py-2 hover:bg-gray-700">
//             Services
//           </a>
//           <a href="/contact" className="block text-white py-2 hover:bg-gray-700">
//             Contact
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import notification from "../../public/img/notification.png";
import logout from "../../public/img/log-out.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Redirect to Home page
  };

  return (
    <nav className="bg-gradient-to-r bg-black/50 border border-black/20 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-3xl font-bold">
              <span className="text-[#FF9D23]">C</span>
              <span className="text-white">OFFEE</span>
              <span className="text-[#FF9D23]"> S</span>
              <span className="text-white">HOP</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/home"
              className="text-gray-200 hover:text-[#FF9D23] transition duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-200 hover:text-[#FF9D23] transition duration-300 font-medium"
            >
              About
            </Link>
            
            <Link
              to="/payment"
              className="text-gray-200 hover:text-[#FF9D23] transition duration-300 font-medium"
            >
              Payment
            </Link>
            <Link
              to="/menu"
              className="text-gray-200 hover:text-[#FF9D23] transition duration-300 font-medium"
            >
              Menu
            </Link>
            <Link
              to="/contact"
              className="text-gray-200 hover:text-[#FF9D23] transition duration-300 font-medium"
            >
              Contact
            </Link>
            <Link
              to="/delivery"
              className="text-gray-200 hover:text-[#FF9D23] transition duration-300 font-medium"
            >
              Delivery
            </Link>
            <Link
              to="/adminPanel"
              className="text-gray-200 hover:text-[#FF9D23] transition duration-300 font-medium"
            >
              Admin Panel
            </Link>
            <button className="hover:opacity-80 transition duration-300">
              <img src={notification} alt="Notifications" className="w-6 h-6" />
            </button>
            <button
              className="hover:opacity-80 transition duration-300"
              onClick={handleLogin}
            >
              <img src={logout} alt="Logout" className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#FF9D23] focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/home"
                className="text-gray-200 hover:text-[#FF9D23] transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-200 hover:text-[#FF9D23] transition duration-300"
              >
                About
              </Link>
              
              <Link
                to="/payment"
                className="text-gray-200 hover:text-[#FF9D23] transition duration-300"
              >
                Payment
              </Link>
              <Link
                to="/menu"
                className="text-gray-200 hover:text-[#FF9D23] transition duration-300"
              >
                Menu
              </Link>
              <Link
                to="/contact"
                className="text-gray-200 hover:text-[#FF9D23] transition duration-300"
              >
                Contact
              </Link>
              <Link
              to="/delivery"
              className="text-gray-200 hover:text-[#FF9D23] transition duration-300 font-medium"
            >
              Delivery
            </Link>
            <Link
              to="/adminPanel"
              className="text-gray-200 hover:text-[#FF9D23] transition duration-300 font-medium"
            >
              Admin Panel
            </Link>
              <div className="flex space-x-4">
                <button className="hover:opacity-80 transition duration-300">
                  <img
                    src={notification}
                    alt="Notifications"
                    className="w-6 h-6"
                  />
                </button>
                <button
                  className="hover:opacity-80 transition duration-300"
                  onClick={handleLogin}
                >
                  <img src={logout} alt="Logout" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
