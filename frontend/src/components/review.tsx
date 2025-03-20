import { useState, useEffect } from "react";
import ReviewCard from "./reviewCard"; // Import the ReviewCard component
import AOS from "aos"; // Import AOS for animations

const Reviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      name: "Dilshad",
      image: "https://picsum.photos/101/101",
      rating: 5,
      text: "Best coffee I've had in ages. Highly recommend the cappuccino!",
    },
    {
      id: 2,
      name: "Sabir Ali",
      image: "https://picsum.photos/102/102",
      rating: 4,
      text: "Great ambiance and friendly staff. The latte was perfect!",
    },
    {
      id: 3,
      name: "Satya Narayan",
      image: "https://picsum.photos/103/103",
      rating: 5,
      text: "The coffee shop has a cozy vibe. Loved their signature brew!",
    },
    // Add 5 more reviews
    {
      id: 4,
      name: "John Doe",
      image: "https://picsum.photos/104/104",
      rating: 4,
      text: "Wonderful place! I really enjoyed the pastry selection.",
    },
    {
      id: 5,
      name: "Emma Wilson",
      image: "https://picsum.photos/105/105",
      rating: 5,
      text: "The best coffee I have ever tasted! The baristas are amazing.",
    },
    {
      id: 6,
      name: "Michael Smith",
      image: "https://picsum.photos/106/106",
      rating: 3,
      text: "Good coffee, but the service could be faster. Still a pleasant experience.",
    },
    {
      id: 7,
      name: "Olivia Taylor",
      image: "https://picsum.photos/107/107",
      rating: 5,
      text: "Absolutely loved the ambience and the coffee. A must-visit!",
    },
    {
      id: 8,
      name: "William Brown",
      image: "https://picsum.photos/108/108",
      rating: 4,
      text: "Nice place to relax with a cup of coffee and a good book.",
    },
  ]);

  useEffect(() => {
    AOS.init(); // Initialize AOS when the component mounts
  }, []);

  return (
    <div className="py-20 bg-gray-50 mb-6">
      <div className="container mx-auto">
        <div className="text-center mb-20" data-aos="fade-down">
          <h1
            style={{ fontFamily: "Pacifico, Sriracha, cursive" }}
            className="text-5xl font-bold text-gray-800"
          >
            Customer Reviews
          </h1>
        </div>

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              name={review.name}
              image={review.image}
              rating={review.rating}
              text={review.text}
              data-aos="flip-up"
              data-aos-delay="300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
