"use client"
import React from 'react';
import { X } from 'lucide-react';
import Button from './Button';

const BusSpecModal = ({ isOpen, onClose, specs, image, caption }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
        <div className="relative">
          <img src={image} alt={caption} className="w-full h-72 object-cover rounded-t-2xl" />
          <Button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-all backdrop-blur-sm"
          >
            <X size={20} />
          </Button>
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-amber-800 mb-6">Bus Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-6 rounded-xl hover:bg-amber-100 transition-colors">
              <p className="text-sm text-amber-600 font-medium mb-1">Brand</p>
              <p className="text-xl font-bold text-amber-800">{specs.brand}</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl hover:bg-amber-100 transition-colors">
              <p className="text-sm text-amber-600 font-medium mb-1">Model</p>
              <p className="text-xl font-bold text-amber-800">{specs.model}</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl hover:bg-amber-100 transition-colors">
              <p className="text-sm text-amber-600 font-medium mb-1">Route</p>
              <p className="text-xl font-bold text-amber-800">{specs.route}</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl hover:bg-amber-100 transition-colors">
              <p className="text-sm text-amber-600 font-medium mb-1">Operator</p>
              <p className="text-xl font-bold text-amber-800">{specs.operator}</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl hover:bg-amber-100 transition-colors md:col-span-2">
              <p className="text-sm text-amber-600 font-medium mb-1">Year</p>
              <p className="text-xl font-bold text-amber-800">{specs.year}</p>
            </div>
          </div>
          <div className="mt-6 p-6 bg-gray-50 rounded-xl">
            <p className="text-gray-700 leading-relaxed">{caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusSpecModal; 