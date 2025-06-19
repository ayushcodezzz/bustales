"use client"
import React, { useState } from 'react';
import { Camera, Instagram, Menu, X } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

const Logo = () => (
  <div className="flex items-center space-x-2 group">
    <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-2 rounded-lg transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
      <Camera className="text-white" size={24} />
    </div>
    <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
      Bus Tales
    </span>
  </div>
);

const Navigation = ({ currentPage = 'home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/bus-gallery', label: 'Bus Gallery', key: 'bus-gallery' },
    { href: '/videos', label: 'Videos', key: 'videos' },
    { href: '/about', label: 'About', key: 'about' },
    // { href: '/contact', label: 'Contact', key: 'contact' }
  ];

  const getLinkClasses = (isActive, isMobile = false) => {
    const baseClasses = isMobile
      ? "block w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out border-l-4 no-underline"
      : "relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out hover:-translate-y-0.5 no-underline";
    
    if (isActive) {
      return isMobile
        ? `${baseClasses} text-amber-400 bg-amber-500/20 border-amber-400 translate-x-1`
        : `${baseClasses} text-amber-400 bg-amber-500/20 shadow-lg`;
    }
    
    return isMobile
      ? `${baseClasses} text-gray-200 hover:text-amber-400 hover:bg-amber-500/10 border-transparent hover:border-amber-400 hover:translate-x-1`
      : `${baseClasses} text-gray-200 hover:text-amber-400 hover:bg-amber-500/10`;
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md border-b border-orange-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <Logo />
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={getLinkClasses(currentPage === item.key)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="https://www.instagram.com/bustales_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-medium"
            >
              <Instagram size={18} />
              <span>Follow</span>
            </a>
          </div>
          {/* Mobile Menu Button */}
          <Button 
            className="lg:hidden p-2 rounded-lg hover:bg-orange-500/20 transition-colors border border-orange-500/30" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-orange-400" />
            ) : (
              <Menu size={24} className="text-orange-400" />
            )}
          </Button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl border-t border-orange-500/20`}>
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={getLinkClasses(currentPage === item.key, true)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 mt-3 border-t border-orange-500/20">
            <a 
              href="https://www.instagram.com/bustales_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center space-x-2 shadow-lg font-medium"
            >
              <Instagram size={18} />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;