import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles

interface CoffeeItemProps {
  name: string;
  image: string;
}

const CoffeeItem: React.FC<CoffeeItemProps> = ({ name, image }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false, 
      delay: 200, // Delay before the animation starts
    });
  }, []);

  return (
    <div
      className="bg-white shadow-lg rounded-2xl py-4 w-64 text-center"
      data-aos="fade-up" // Animation type on page load
    >
      <img
        src={image}
        alt={name}
        className="w-30 h-30 mx-auto rounded-full shadow-md transition-transform duration-300 ease-in-out hover:scale-110"
      />
      <h3 className="text-2xl font-bold my-6">{name}</h3>
      <button className="my-3 bg-[#FFB22C] text-black px-8 py-2 flex rounded-ee-lg rounded-se-lg font-bold hover:scale-105 transition-transform duration-300 ease-in-out">
        Purchase <span className="ml-2">🛒</span>
      </button>
    </div>
  );
};

export default CoffeeItem;
