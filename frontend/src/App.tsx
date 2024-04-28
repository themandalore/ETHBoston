
import React, {  } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation';
import AboutPage from './components/about';
import HomePage from "./components/home";
import AppPage from "./apppage";


export default function App() {
  return (
    <Router>
      <div className="bg-gray-800 min-h-screen text-white">
        <Navigation />
        <div className="container mx-auto pt-4">
          <Routes>
            <Route path="/about" Component={AboutPage} />
            <Route path="/home" Component={HomePage} />
            <Route path="/app" Component={AppPage} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
