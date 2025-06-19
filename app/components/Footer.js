"use client"
import React from 'react';
import { Camera, Instagram, Mail } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-2 rounded-lg transform hover:scale-110 transition-transform">
                <Camera className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold">Bus Tales</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Documenting the fascinating world of buses through photography and storytelling.
              Join us in celebrating the beauty and engineering of these incredible machines.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <div className="space-y-3 text-sm">
              <Link href="/">
                <Button 
                  className="block text-gray-400 hover:text-white transition-colors transform hover:translate-x-1 w-full text-left"
                >
                  Home
                </Button>
              </Link>
              <Link href="/bus-gallery">
                <Button 
                  className="block text-gray-400 hover:text-white transition-colors transform hover:translate-x-1 w-full text-left"
                >
                  Bus Gallery
                </Button>
              </Link>
              <Link href="/videos">
                <Button 
                  className="block text-gray-400 hover:text-white transition-colors transform hover:translate-x-1 w-full text-left"
                >
                  Videos
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  className="block text-gray-400 hover:text-white transition-colors transform hover:translate-x-1 w-full text-left"
                >
                  About
                </Button>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Connect With Us</h4>
            <div className="space-y-4 text-sm">
              <a 
                href="https://www.instagram.com/bustales_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-400 hover:text-white transition-colors group"
              >
                <div className="bg-gray-800 p-2 rounded-lg mr-3 group-hover:bg-amber-600 transition-colors">
                  <Instagram size={16} />
                </div>
                <span>@bustales_</span>
              </a>
              <a 
                href="mailto:talesofbuses@gmail.com" 
                className="flex items-center text-gray-400 hover:text-white transition-colors group"
              >
                <div className="bg-gray-800 p-2 rounded-lg mr-3 group-hover:bg-amber-600 transition-colors">
                  <Mail size={16} />
                </div>
                <span>talesofbuses@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400 mb-2">
            © {new Date().getFullYear()} Bus Tales. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Bus Tales Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 