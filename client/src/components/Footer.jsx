import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-200 py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 cursor-pointer"
        />

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center flex-1">
          © {new Date().getFullYear()} GreatStack.dev. All Rights Reserved.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <img
            src={assets.facebook_icon}
            alt="Facebook"
            className="w-9 h-9 cursor-pointer transition duration-300 hover:scale-110 hover:opacity-80"
          />
          <img
            src={assets.twitter_icon}
            alt="Twitter"
            className="w-9 h-9 cursor-pointer transition duration-300 hover:scale-110 hover:opacity-80"
          />
          <img
            src={assets.instagram_icon}
            alt="Instagram"
            className="w-9 h-9 cursor-pointer transition duration-300 hover:scale-110 hover:opacity-80"
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;