import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
      <div className="bg-blue-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <p className="mt-5 text-lg text-gray-300">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-sm font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg transition-all duration-300">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
