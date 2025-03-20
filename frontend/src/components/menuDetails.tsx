import React, { useState, useEffect } from "react";
import menu01 from "../../public/img/menu/menu01.png";
import menu02 from "../../public/img/menu/menu02.png";
import menu03 from "../../public/img/menu/menu03.png";
import menu04 from "../../public/img/menu/menu04.png";
import menu05 from "../../public/img/menu/menu05.png";
import menu06 from "../../public/img/menu/menu06.png";
import menu07 from "../../public/img/menu/menu07.png";
import menu08 from "../../public/img/menu/menu08.png";
import menu09 from "../../public/img/menu/menu09.png";
import menu10 from "../../public/img/menu/menu10.png";
import menu11 from "../../public/img/menu/menu11.png";
import menu12 from "../../public/img/menu/menu01.png";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import Card from "./menuCard";

const reviews = [
  {
    main: "NEW",
    name: "Cappuccino",
    image: menu01,
    review: "Category: Coffee",
    rating: "LKR 3,500",
  },
  {
    main: "NEW",
    name: "Caramel Mocha",
    image: menu02,
    review: "Category: Coffee",
    rating: "LKR 2,500",
  },
  {
    main: "NEW",
    name: "Cafe Latte",
    image: menu03,
    review: "Category: Coffee",
    rating: "LKR 2,100",
  },
  {
    main: "NEW",
    name: "Bubble Tea",
    image: menu04,
    review: "Category: Tea",
    rating: "LKR 2,350",
  },
  {
    main: "NEW",
    name: "Espresso",
    image: menu05,
    review: "Category: Coffee",
    rating: "LKR 3,000",
  },
  {
    main: "NEW",
    name: "Matcha Latte",
    image: menu06,
    review: "Category: Tea",
    rating: "LKR 3,800",
  },
  {
    main: "NEW",
    name: "Iced Americano",
    image: menu07,
    review: "Category: Coffee",
    rating: "LKR 3,200",
  },
  {
    main: "NEW",
    name: "Vanilla Frappe",
    image: menu08,
    review: "Category: Beverage",
    rating: "LKR 3,900",
  },
  {
    main: "NEW",
    name: "Hot Chocolate",
    image: menu09,
    review: "Category: Beverage",
    rating: "LKR 3,600",
  },
  {
    main: "NEW",
    name: "Chai Latte",
    image: menu10,
    review: "Category: Tea",
    rating: "LKR 3,700",
  },
  {
    main: "NEW",
    name: "Mocha",
    image: menu11,
    review: "Category: Coffee",
    rating: "LKR 3,450",
  },
  {
    main: "NEW",
    name: "Hazelnut Cappuccino",
    image: menu12,
    review: "Category: Coffee",
    rating: "LKR 3,550",
  },
];

const MenuDetails: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const handleScroll = (direction: "next" | "prev") => {
    setCurrentIndex((prevIndex) => {
      if (direction === "next") {
        return prevIndex + 1 < totalPages ? prevIndex + 1 : 0;
      } else {
        return prevIndex - 1 >= 0 ? prevIndex - 1 : totalPages - 1;
      }
    });
  };

  useEffect(() => {
    // Initialize AOS on component mount
    AOS.init({
      duration: 1000, // Animation duration
      once: false,
      delay: 200, // Delay before animation starts
    });

    const interval = setInterval(() => {
      handleScroll("next");
    }, 3000);

    return () => {
      clearInterval(interval);
      // Cleanup AOS instance on unmount
      AOS.refresh();
    };
  }, [currentIndex]);

  return (
    <div className="relative w-full p-20">
      <div className="text-center mb-20">
        <h1
          style={{ fontFamily: "Pacifico, Sriracha, cursive" }}
          className="text-5xl font-bold text-gray-800"
          data-aos="zoom-in" // Animation for the header
        >
          Popular Items
        </h1>
      </div>

      {/* Cards Container */}
      <div className="flex justify-center gap-25 overflow-hidden">
        {reviews
          .slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
          .map((review, index) => (
            <div
              key={index}
              className="flex-none w-64"
              data-aos="flip-left" // AOS animation for each card
            >
              <Card {...review} />
            </div>
          ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center mt-15 space-x-4">
        <button
          onClick={() => handleScroll("prev")}
          className="w-4 h-4 border-2 bg-white rounded-full hover:bg-black"
          data-aos="fade-up" // Animation for previous button
        ></button>
        <button
          onClick={() => handleScroll("next")}
          className="w-4 h-4 border-2 bg-white rounded-full hover:bg-black"
          data-aos="fade-up" // Animation for next button
        ></button>
      </div>
    </div>
  );
};

export default MenuDetails;
