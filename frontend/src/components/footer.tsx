import footerImg from "../../public/img/coffeecuplogoJava_5406.png"

const Footer = () => {
    return (
      <footer className="bg-[#C1BAA1] text-black px-20 py-10 mt-20">
        <div className="flex justify-center gap-40">
          <div>
            <img src={footerImg} className="w-[180px] h-[198px]" />
            <h2 className="text-3xl font-bold drop-shadow-[2px_2px_2px_black]">
              <span className="text-black"><span className="text-[#FF9D23]">C</span>OFFEE</span>{" "}
              <span className="text-[#000000]"><span className="text-[#FF9D23]">S</span>HOP</span>
            </h2>
          </div>
          {/* Left: Logo + Info */}
          <div>
            <h3 className="text-3xl font-bold">Info</h3>
            <ul className="mt-4 text-[20px] font-medium">
              <li className="flex gap-2 items-center">📞 Call - +9477 777 7777</li>
              <li className="flex gap-2 items-center">📧 Email - info@coffeeshop.lk</li>
              <li>🔐 Privacy Policy</li>
            </ul>
          </div>

          {/* Right: About */}
          <div className="max-w-md">
            <h3 className="text-3xl font-bold mb-3">About Coffee Shop</h3>
            <p className="text-[20px] font-medium">
              Coffee Shop Colombo is one of the oldest coffee houses in Sri Lanka.
              Java is well known for emphasizing on serving quality coffee all the time.
            </p>
          </div>
        </div>

        {/* Horizontal Line */}
        <div className="border-t border-black mt-6"></div>
        <p className="flex justify-center">© Copyright 2025 Cofffee Shop. All Rights Reserved
        Designed by Panda.</p>
      </footer>

    );
  };
  
  export default Footer;