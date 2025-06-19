import React from 'react';
import Navigation from '../components/Navigation';

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh] bg-gray-50">
      <Navigation currentPage="contact" />
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h2>
          <p className="text-lg text-gray-700 mb-4">
            Have a question, suggestion, or want to collaborate? Reach out to us!
          </p>
          <ul className="text-md text-gray-600 space-y-2">
            <li>Email: <a href="mailto:hello@bustales.com" className="text-blue-600 underline">hello@bustales.com</a></li>
            <li>Instagram: <a href="https://instagram.com/bustales" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">@bustales</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
} 