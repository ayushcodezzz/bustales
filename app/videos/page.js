"use client";
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import MediaCard from '../components/MediaCard';
import MediaModal from '../components/MediaModal';
import { useSearchParams } from 'next/navigation';

export default function VideoGalleryPage() {
  const searchParams = useSearchParams();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Videos', icon: '🎬' },
    { id: 'volvo', name: 'Volvo', icon: '🔵' },
    { id: 'mercedes', name: 'Mercedes', icon: '⭐' },
    { id: 'tata', name: 'Tata', icon: '🟢' },
    { id: 'leyland', name: 'Leyland', icon: '🔶' }
  ];
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/bustales');
        const data = await res.json();
        if (data && data.records) {
          const filtered = data.records
            .map((r) => ({ ...r.fields, airtableId: r.id }))
            .filter((item) => item.type === 'video');
          setVideos(filtered);
          setFilteredVideos(filtered);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  // Check URL for post parameter and open modal if present
  useEffect(() => {
    const postId = searchParams.get('post');
    if (postId) {
      // Find the video in the current videos array
      const video = videos.find(v => v.airtableId === postId);
      if (video) {
        setSelectedVideo(video);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, videos]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(video => 
        video.buscategory && 
        video.buscategory.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredVideos(filtered);
    }
  }, [selectedCategory, videos]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  if (loading) {
    return null
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fefcf7' }}>
      <Navigation currentPage="videos" />
      
      {/* Simple Header */}
      <div className="pt-24 pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Bus Video Gallery</h1>
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
              {filteredVideos.length} videos
            </span>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No videos found</h3>
              <p className="text-gray-500">
                {selectedCategory === 'all' 
                  ? 'No videos available yet.' 
                  : `No ${categories.find(c => c.id === selectedCategory)?.name} videos found.`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video, index) => (
                <div
                  key={video.airtableId}
                  className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Category Tag */}
                  {video.buscategory && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 border">
                        {video.buscategory.charAt(0).toUpperCase() + video.buscategory.slice(1)}
                      </div>
                    </div>
                  )}
                  
                  {/* Media Card */}
                  <div className="relative overflow-hidden">
                    <MediaCard 
                      post={video} 
                      onClick={handleVideoClick} 
                    />
                  </div>
                  
                  {/* Video Info */}
                  {(video.title || video.description) && (
                    <div className="p-4 bg-white border-t border-gray-100">
                      {video.title && (
                        <h3 className="font-medium text-gray-800 mb-1 text-sm">
                          {video.title}
                        </h3>
                      )}
                      {video.description && (
                        <p className="text-gray-600 text-xs line-clamp-2">
                          {video.description}
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
      {videos.length > 0 && (
        <div className="border-t border-orange-100 py-6 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#faf8f2' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 text-center">
              {categories.slice(1).map((category) => {
                const count = videos.filter(video => 
                  video.buscategory && 
                  video.buscategory.toLowerCase() === category.id.toLowerCase()
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
        post={selectedVideo}
      />
    </div>
  );
} 