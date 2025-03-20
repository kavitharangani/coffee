import React from 'react';
import { Link } from 'react-router-dom';
import background3 from '../../public/img/adminDashbord.jpg';
import smallImage from '../../public/img/coffee2.png'; 

const AdminDashboard: React.FC = () => {
  return (
    <div
      className="admin-dashboard min-h-screen p-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${background3})` }}
    >
      {/* Overlay to improve readability */}
      <div className="absolute inset-0 bg-black opacity-70 py-20">

        {/* Dashboard Content */}
        <div className="relative z-10 text-white">
          {/* Dashboard Header Section */}
          <div className="mb-15 text-center" data-aos="fade-down">
            <h1 className="text-5xl font-extrabold mb-4" data-aos="fade-up">
              Welcome to the Admin Dashboard
            </h1>
            
            <p className="text-xl mb-4" data-aos="fade-up" data-aos-delay="200">
              Manage users and stock items efficiently from here.
            </p>
            
            {/* Small Image Below Header */}
            <div className="flex justify-center mb-10" data-aos="fade-up" data-aos-delay="300">
              <img
                src={smallImage}
                alt="Admin Overview"
                className="w-[267px] h-[267px] rounded-full shadow-lg  border-white animate-slide-in-left animate-spin-slow "
              />
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="flex justify-center gap-10 mb-12" data-aos="fade-up" data-aos-delay="400">
            {/* Button linking to the User Management page */}
            <Link
              to="/user"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="600"
            >
              User Management
            </Link>

            {/* Button linking to the Stock Management page */}
            <Link
              to="/items"
              className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600 transition-all transform hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              Stock Management
            </Link>
          </div>

          {/* Additional Information Section */}
          <div className="-mt-8 text-center" data-aos="fade-up" data-aos-delay="1000">
            <h2 className="text-2xl font-semibold mb-4">What You Can Do:</h2>
            <ul className="list-disc list-inside mx-auto max-w-xl text-lg space-y-2">
              <li>Manage and view all user accounts.</li>
              <li>Track and manage stock items and quantities.</li>
              <li>Get insights and reports for better decision-making.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
