import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaMapMarkerAlt, FaTruck } from "react-icons/fa";
import deliveryBg from "../../public/img/delivery.jpg"; // Ensure the path is correct

const Delivery = () => {
  const [location, setLocation] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("Standard");

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubmit = () => {
    alert(`Delivery to: ${location}, Option: ${deliveryOption}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${deliveryBg})` }}
    >
      <div
        className="bg-black/10 backdrop-blur-lg text-white p-10 rounded-3xl shadow-lg w-full max-w-md transform hover:scale-105 transition-all duration-300 border border-white/30"
        data-aos="zoom-in"
      >
        <h1 className="text-3xl font-bold text-center text-gray-200 mb-6">
          <FaTruck className="inline-block mr-2 text-yellow-500" />
          Send Delivery
        </h1>

        {/* Location Input */}
        <div className="flex items-center bg-black/20 backdrop-blur-md rounded-lg p-3 mb-4 border border-white/30" data-aos="fade-right">
          <FaMapMarkerAlt className="text-yellow-500 mr-3" />
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent outline-none text-white placeholder-gray-300"
          />
        </div>

        {/* Delivery Options */}
        <div className="flex items-center bg-black/20 backdrop-blur-md rounded-lg p-3 mb-4 border border-white/30" data-aos="fade-left">
          <FaTruck className="text-yellow-500 mr-3" />
          <select
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
            className="w-full bg-transparent outline-none text-white"
          >
            <option value="Standard" className="text-black">Standard Delivery</option>
            <option value="Express" className="text-black">Express Delivery</option>
            <option value="Pickup" className="text-black">Pickup from Store</option>
          </select>
        </div>

        {/* Beautiful Cart Section */}
        <div className="bg-black/20 backdrop-blur-md p-4 rounded-lg shadow-md border border-white/30 mb-6" data-aos="flip-up">
          <h2 className="text-lg font-semibold mb-2 flex items-center">
            <FaShoppingCart className="text-yellow-500 mr-2" />
            Your Cart
          </h2>
          <p className="text-gray-300">✔ 2x Espresso</p>
          <p className="text-gray-300">✔ 1x Cappuccino</p>
          <p className="text-gray-300">✔ 1x Latte</p>
          <p className="mt-2 text-yellow-500 font-semibold">Total: $15.99</p>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-black py-3 rounded-lg hover:bg-yellow-600 transition-all shadow-md"
          data-aos="fade-up"
        >
          Confirm Delivery
        </button>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-yellow-500 hover:underline">
            Back to Reviews
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
