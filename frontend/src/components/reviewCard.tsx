import React from "react";

// Define the ReviewCardProps interface
interface ReviewCardProps {
  name: string;
  image: string;
  rating: number;
  text: string;
  [key: string]: any;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, image, rating, text, ...props }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-3xl p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-circle"
      {...props}
    >
      <div className="flex items-center mb-6">
        <img
          src={image || "/path/to/default/user-placeholder.jpg"}
          alt={name}
          className="w-16 h-16 rounded-full border-4 border-white shadow-md"
        />
        <div className="ml-4">
          <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>
          <div className="flex items-center mt-1">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`${
                  index < rating ? "text-yellow-400" : "text-gray-300"
                } text-xl`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 text-sm mt-4">{text}</p>
    </div>
  );
};

export default ReviewCard;
