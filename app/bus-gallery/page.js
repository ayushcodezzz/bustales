"use client";
import React, { useEffect, useState, Suspense } from 'react';
import Navigation from '../components/Navigation';
import MediaCard from '../components/MediaCard';
import MediaModal from '../components/MediaModal';
import { useSearchParams } from 'next/navigation';

// Separate component that uses useSearchParams
function PhotoGalleryContent() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Always call useSearchParams to follow Rules of Hooks
  const searchParams = useSearchParams();

  const categories = [
    { id: 'all', name: 'All Buses', icon: '🚌' },
    { id: 'volvo', name: 'Volvo', icon: '🔵' },
    { id: 'mercedes', name: 'Mercedes', icon: '⭐' },
    { id: 'tata', name: 'Tata', icon: '🟢' },
    { id: 'leyland', name: 'Leyland', icon: '🔶' }
  ];

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/bustales');
        const data = await res.json();
        if (data && data.records) {
          const filtered = data.records
            .map((r) => ({ ...r.fields, airtableId: r.id }))
            .filter((item) => item.type === 'photo');
          setPhotos(filtered);
          setFilteredPhotos(filtered);
        }
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // Check URL for post parameter and open modal if present
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const postId = searchParams?.get('post');
      if (postId) {
        // Find the photo in the current photos array
        const photo = photos.find(p => p.airtableId === postId);
        if (photo) {
          setSelectedPhoto(photo);
          setIsModalOpen(true);
        }
      }
    } catch (error) {
      console.error('Error reading search params:', error);
    }
  }, [mounted, searchParams, photos]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPhotos(photos);
    } else {
      const filtered = photos.filter(photo => 
        photo.buscategory && 
        photo.buscategory.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredPhotos(filtered);
    }
  }, [selectedCategory, photos]);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  if (loading) {
    return null
  }

  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: '#fefcf7' }}>
      <Navigation currentPage="bus-gallery" />
      
      {/* Simple Header */}
      <div className="pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Bus Photo Gallery</h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-orange-400 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-orange-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full border">
              {filteredPhotos.length} photos
            </span>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No photos found</h3>
              <p className="text-gray-500">
                {selectedCategory === 'all' 
                  ? 'No photos available yet.' 
                  : `No ${categories.find(c => c.id === selectedCategory)?.name} photos found.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.airtableId}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Category Tag */}
                  {photo.buscategory && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 border">
                        {photo.buscategory.charAt(0).toUpperCase() + photo.buscategory.slice(1)}
                      </div>
                    </div>
                  )}
                  
                  {/* Media Card */}
                  <div className="relative overflow-hidden">
                    <MediaCard 
                      post={photo} 
                      onClick={handlePhotoClick} 
                    />
                  </div>
                  
                  {/* Photo Info */}
                  {(photo.title || photo.description) && (
                    <div className="p-4 bg-white border-t border-gray-100">
                      {photo.title && (
                        <h3 className="font-medium text-gray-800 mb-1 text-sm">
                          {photo.title}
                        </h3>
                      )}
                      {photo.description && (
                        <p className="text-gray-600 text-xs line-clamp-2">
                          {photo.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Simple Footer Stats */}
      {photos.length > 0 && (
        <div className="border-t border-orange-100 py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f2' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 text-center">
              {categories.slice(1).map((category) => {
                const count = photos.filter(photo => 
                  photo.buscategory && 
                  photo.buscategory.toLowerCase() === category.id.toLowerCase()
                ).length;
                
                return count > 0 ? (
                  <div key={category.id} className="flex items-center space-x-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm text-gray-600">{category.name}: <span className="font-medium">{count}</span></span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      )}

      {/* Media Modal */}
      <MediaModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPhoto}
      />
    </div>
  );
}

// Loading fallback component
function PhotoGalleryLoading() {
  return (
    <div className="min-h-[100dvh]" style={{ backgroundColor: '#fefcf7' }}>
      <Navigation currentPage="bus-gallery" />
      <div className="pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Bus Photo Gallery</h1>
          <div className="w-24 h-1 bg-orange-400 mx-auto rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    </div>
  );
}

// Main page component with Suspense
export default function PhotoGalleryPage() {
  return (
    <Suspense fallback={<PhotoGalleryLoading />}>
      <PhotoGalleryContent />
    </Suspense>
  );
}