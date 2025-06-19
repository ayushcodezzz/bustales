"use client"
import React from 'react';
import { Camera, Play, ArrowRight, Star } from 'lucide-react';
import Button from './Button';
import Link from 'next/link';

const Hero = ({ setCurrentPage }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-16 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-orange-200 to-amber-200 rounded-full opacity-15 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full opacity-25 animate-pulse delay-2000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center min-h-screen py-16">
          
          {/* Left Side - Content */}
          <div className="lg:w-1/2 text-left lg:pr-12">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-lg">
              <Star className="w-4 h-4 text-amber-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Premium Bus Photography & Stories</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Discover the
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Bus Tales
              </span>
              <br />
              Journey
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              From luxurious Volvo coaches to charming local transport, explore the world of buses 
              through stunning photography, detailed specifications, and captivating journey stories.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/bus-gallery">
                <Button 
                  className="group bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all flex items-center justify-center space-x-3 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                >
                  <Camera size={22} className="transform group-hover:rotate-12 transition-transform" />
                  <span className="text-lg font-medium">Explore Gallery</span>
                  <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/videos">
                <Button 
                  className="group bg-white/90 backdrop-blur-sm border-2 border-amber-200 text-amber-700 px-8 py-4 rounded-xl hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all flex items-center justify-center space-x-3 shadow-lg hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <Play size={22} className="transform group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-medium">Watch Videos</span>
                </Button>
              </Link>
            </div>

            {/* Stats */}
            {/* <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">500+</div>
                <div className="text-sm text-gray-600">Photos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">50+</div>
                <div className="text-sm text-gray-600">Bus Models</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">100+</div>
                <div className="text-sm text-gray-600">Stories</div>
              </div>
            </div> */}
          </div>

          {/* Right Side - Visual Element */}
          <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-6 mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl flex items-center justify-center">
                    <Camera size={48} className="text-amber-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Featured Bus</h3>
                <p className="text-gray-600 mb-4">Volvo 9700 Luxury Coach</p>
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">Premium Experience</span>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-amber-500 text-white p-4 rounded-2xl shadow-xl transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <Play size={24} />
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-4 rounded-2xl shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <Camera size={24} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white/20">
          <path d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,69.3C672,64,768,64,864,69.3C960,75,1056,85,1152,85.3C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;