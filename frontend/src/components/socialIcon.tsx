import facebook from '../../public/img/icons8-facebook-50.png';
import instagram from '../../public/img/icons8-instagram-60.png';
import whatsapp from '../../public/img/icons8-whatsapp-50.png';

const SocialLinks = () => {
  return (
    <div className="absolute right-5 flex flex-col gap-4 items-center">
      <a
        href="https://www.facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-bounce"
      >
        <img src={facebook} alt="Facebook" className="w-8 h-8" />
      </a>
      <a
        href="https://www.twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-bounce"
      >
        <img src={instagram} alt="Twitter" className="w-8 h-8" />
      </a>
      <a
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="animate-bounce"
      >
        <img src={whatsapp} alt="Instagram" className="w-8 h-8" />
      </a>
    </div>
  );
};

export default SocialLinks;
