import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import background1 from "../../public/img/backGround/background1.jpg";
import background2 from "../../public/img/backGround/background6.jpg";
import background3 from "../../public/img/backGround/background5.jpg";
import background4 from "../../public/img/backGround/background4.jpg";
import coffeeIcon from "../../public/img/coffee2.png";
import SocialLinks from "../components/socialIcon";
import Contact from "../components/contact";
import Footer from "../components/footer";
import About from "../components/about";
import Services from "../components/service";
import MenuDetails from "../components/menuDetails";
import Reviews from "../components/review";

const backgrounds = [background1, background2, background3, background4];

const text1 = "Enjoy your coffee";
const text2 = "before your activity";
const description =
  "Boost your productivity and build your mood with a glass of coffee in the morning.";

// Function to split text into words
const splitText = (text: any) => text.split(" ").map((word: any) => `${word} `);

const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: any) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

function Home() {
  const [animationKey, setAnimationKey] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);

    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
      once: false, // Allow animations to repeat
    });

    // Change background image every 5 seconds
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="relative text-white w-full h-screen overflow-hidden ">
        {/* Background Image */}
        <motion.img
          key={bgIndex}
          src={backgrounds[bgIndex]}
          alt="Coffee Background"
          className="absolute top-0 left-0 w-full h-full object-cover "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          data-aos="fade-in"
        />

        {/* Content Wrapper */}
        <motion.div
          key={animationKey} // Triggers animation on reload
          className="absolute top-0 left-0 w-full h-full flex items-center px-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Left Content */}
          <div className="text-left flex">
            {/* Coffee Icon */}
            <motion.img
              src={coffeeIcon}
              alt="Coffee Icon"
              className="w-[428px] h-[415px] animate-spin-slow"
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              data-aos="fade-up"
            />

            <div className="relative content-center w-[600px] left-20">
              {/* Animated Heading */}
              <h1 className="text-6xl font-extrabold">
                {splitText(text1).map((word: any, i: any) => (
                  <motion.span
                    key={i}
                    className={word === "coffee " ? "text-[#FF9D23]" : ""}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                    data-aos="fade-right"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <h1 className="text-6xl font-extrabold">
                {splitText(text2).map((word: any, i: any) => (
                  <motion.span
                    key={i}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i + text1.split(" ").length}
                    data-aos="fade-right"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              {/* Animated Description */}
              <motion.p
                className="text-2xl font-medium mt-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                data-aos="fade-up"
              >
                {description}
              </motion.p>

              {/* Animated Button */}
              <motion.button
                className="bg-gradient-to-r from-[#A27B5C] to-[#FF9D23] text-white text-lg font-bold py-3 px-6 rounded-xl mt-6 hover:bg-orange-600 transition flex"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Contact
                <svg
                  className="mx-2"
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="27" height="27" fill="url(#pattern0_27_8)" />
                  <defs>
                    <pattern
                      id="pattern0_27_8"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use href="#image0_27_8" transform="scale(0.015625)" />
                    </pattern>
                    <image
                      id="image0_27_8"
                      width="64"
                      height="64"
                      preserveAspectRatio="none"
                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACGElEQVR4nO2aS07DMBRF3U74TRB7oCPERvhtoLCGtoAqkJDCDBbAXzBBsCkoQyZI0B0cZCWowWoLie3ESd+RPKja9L17bT87iZUSBEEQwgVoArtA36Lp65uqigB7uGFXVRHi3nNBpCo8BdrA2T/bOfBZGwOyADSAi1qNgIzirw3RHzNhAON7/g44rb0BTBava0dUawOYIj75vr4G8Id4pwYAS8AO0LPckU1rh0DLouDpzw3jd3YGEAfSiQ0phldX4q0NIC4izwUJ/5cBWcS7MODQTA64ybAjy9pOgFVX4q0MIJ7zQ6O4zKmSyCPe1oDt1IUvVRRva8BB6sIrFfBS58uAKHfxCKDnJ9xKtytjAA7EG7fS7UxPhCjRANth7yqJqAwDghBflgHBiC/DgKDEF21Azh1eC3gDBtN2j8EbQP4d3nHq90eVNACLYe89P4ox4DJrzxeWH54DAOt5xdfFgBXgPfn/yxw7vGoboAGWgTWVg1oYYIMYgIyASKbACKkByjVIEURWAXzOMUtkFUBWgUhWgRGyCqjKFRlLpAYgNSCSGjBCaoByDbCfcvhGBQZwm8qv6yPAlnE0prQDEibAfPJS5IcNH0EWga9UkPsQTEjEP6Ty0qfCF3wF2+c3g+SQVL+kdmv0vKbjRXzqzc0T4fKY9XF6XhN6xnQoGz3sO97Fj6kJujB2PZ4T/Kvp2Jve5rwgCIKaQb4B6cgc+JkZCZYAAAAASUVORK5CYII="
                    />
                  </defs>
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Social Icons */}
          <SocialLinks />
        </motion.div>
      </div>

      <section className="relative py-10 px-28">
        <Services />
      </section>

      <MenuDetails />

      <About />

      <Contact />

      <Reviews />

      <Footer />
    </div>
  );
}

export default Home;
