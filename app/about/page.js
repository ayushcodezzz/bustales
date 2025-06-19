import React from 'react';
import { Camera, Globe, Heart, Users, MapPin, Calendar, Star, TrendingUp, Share2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] bg-orange-50">
      {/* Navigation */}
      <Navigation  />

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full mb-6 shadow-lg">
              <span className="text-3xl">🚌</span>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            About <span className="text-orange-600">Bus Tales</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Where wheels turn, cities move, and stories unfold — Follow our Instagram journey @bustales_ as we celebrate the incredible world of buses
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-orange-100 p-12 mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Bus Tales is more than just a collection of photographs — it's a celebration of the unsung heroes of urban transportation. Every bus has a story, every route tells a tale, and every journey connects communities across cities and countries.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  From the vibrant colors of Indian state transport buses to the sleek designs of modern city transit, we document the fascinating world of buses through photography and storytelling.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/about.png"
                  alt="Bus Tales Journey"
                  width={200}
                  height={100}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-8">
                  <p className="text-white text-md font-bold text-center">
                    Capturing the beauty, diversity, and cultural significance of buses worldwide while building a community of transportation enthusiasts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What We Do */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8 border border-orange-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Photography</h3>
              <p className="text-gray-700 text-sm">
                Capturing stunning images of buses from around the world, showcasing their unique designs and engineering.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-8 border border-orange-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Storytelling</h3>
              <p className="text-gray-700 text-sm">
                Every journey tells a story. We share the tales behind the buses and the communities they serve.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 border border-orange-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-700 text-sm">
                Building a global community of bus enthusiasts and photographers who share our passion.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-8 border border-orange-100 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Heritage</h3>
              <p className="text-gray-700 text-sm">
                Documenting the evolution of bus design and preserving transportation heritage for future generations.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-3xl shadow-lg border border-orange-100 p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Growing Impact</h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">100+</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">Photos Captured</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">300+</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">Followers</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">10+</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">3</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">Posts Shared</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-2">1,234</div>
                <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">Stories Shared</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Follow Our Journey</h2>
            <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
              Join our growing community on Instagram @bustales_ and share your own bus tales! Every journey has a story worth telling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.instagram.com/bustales_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Follow @bustales_
              </a>
              <a href="https://www.instagram.com/stories/camera/?url=https://www.instagram.com/bustales_" target="_blank" rel="noopener noreferrer" className="bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors border-2 border-orange-400 shadow-lg inline-block">
                Share in Stories
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}