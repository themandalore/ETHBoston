import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
    return (
      <nav className="bg-gray-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white font-semibold text-xl">Recon Network</h1>
          <ul className="grid col-auto">
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
