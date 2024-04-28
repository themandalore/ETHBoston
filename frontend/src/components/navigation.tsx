import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-start items-center">
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          </li>
          <li>
            <Link to="/app" className="text-white hover:text-gray-300">App</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
