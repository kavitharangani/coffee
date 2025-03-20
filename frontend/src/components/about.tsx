import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import aboutCoffee from "../../public/img/coffee-white.png";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: false,
    });

    // Refresh AOS on window load
    window.addEventListener("load", AOS.refresh);

    return () => {
      window.removeEventListener("load", AOS.refresh);
    };
  }, []);

  return (
    <div className="py-16">
        <div className="text-center mb-20">
          <h1
            style={{ fontFamily: "Pacifico, Sriracha, cursive" }}
            className="text-5xl font-bold text-gray-800"
          >
            About Coffee Shop
          </h1>
        </div>
      <div
        className="flex justify-center items-center gap-10 text-[22px]"
        data-aos="fade-up"
      >
        <p
          className="text-gray-800 leading-relaxed bg-white p-8 shadow-xl rounded-lg border-l-8 border-[#FF9D23] ml-6 mr-6 mt-4 mb-4 text-justify"
          data-aos="fade-right"
        >
          Java Lounge is yet another venture from the Sri Lankan entrepreneur
          and E-Commerce Guru Dulith Herath. Java Lounge came into existence
          mainly because of his addiction to coffee, any workaholic would agree
          and bear witness to a condition called{" "}
          <span className="font-bold text-[#D2691E]">"Procaffeinating"</span>—
          the tendency to not start anything without a cup of coffee.
          <br />
          <br />
          Java Lounge is yet another venture from the Sri Lankan entrepreneur
          and E-Commerce Guru Dulith Herath. Java Lounge came into existence
          mainly because of his addiction to coffee, any workaholic would agree
          and bear witness to a condition called{" "}
          <span className="font-bold text-[#D2691E]">"Procaffeinating"</span>—
          the tendency to not start anything without a cup of coffee.
        </p>

        <img
          src={aboutCoffee}
          alt="About Coffee"
          className="w-[620px] h-[550px] rounded-md drop-shadow-[10px_-10px_12px_rgba(0,0,0,1)]  animate-slide-in-left animate-spin-slow"
        />
      </div>
    </div>
  );
};

export default About;
