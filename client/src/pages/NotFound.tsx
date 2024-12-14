import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page not found</p>
      <a href="/" className="text-blue-500 hover:underline mt-4">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
