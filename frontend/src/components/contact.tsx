import location from "../../public/img/location.png";
import mail from "../../public/img/email.png";
import phone from "../../public/img/telephone-call.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="py-39 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="text-center mb-35">
        <h1
          style={{ fontFamily: "Pacifico, cursive" }}
          className="text-5xl font-bold text-yellow-500 drop-shadow-lg"
        >
          Contact Us
        </h1>
        <p className="text-gray-300 mt-3 text-lg">
          Get in touch with us for any queries or assistance
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-20 px-4">
        {/** Contact Cards */}
        <div
          data-aos="fade-up"
          className="bg-gray-900 p-6 w-72 h-fit rounded-2xl text-center shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <img
            src={location}
            className="text-yellow-500 text-4xl mb-3 mx-auto w-20 h-20 animate-pulse"
          />
          <p className="text-2xl font-semibold">Location</p>
          <p className="text-gray-400 mt-2">123 Main Street, City</p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-gray-900 p-6 w-72 h-fit rounded-2xl text-center shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <img
            src={mail}
            className="text-yellow-500 text-4xl mb-3 mx-auto w-20 h-20 animate-pulse"
          />
          <p className="text-2xl font-semibold">E-Mail</p>
          <p className="text-gray-400 mt-2">
            <a
              href="mailto:coffeShop@gmail.com"
              className="text-yellow-500 hover:text-yellow-400"
            >
              coffeShop@gmail.com
            </a>
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="bg-gray-900 p-6 w-72 h-fit rounded-2xl text-center shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <img
            src={phone}
            className="text-yellow-500 text-4xl mb-3 mx-auto w-20 h-20 animate-pulse"
          />
          <p className="text-2xl font-semibold">Phone</p>
          <p className="text-gray-400 mt-2">+123 456 7890</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
