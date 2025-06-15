import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Page not found</p>
      <Link to="/" className="text-blue-600 underline mt-4 block">Back to Home</Link>
    </div>
  );
}

export default NotFound;
