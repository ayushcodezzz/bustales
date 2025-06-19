import React from 'react';
import Image from 'next/image';

const VideoCard = ({ post, onClick }) => (
  <div
    className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
    onClick={() => onClick(post)}
  >
    <div className="aspect-w-9 aspect-h-16 relative">
      <Image
        src={post.videothumbnail || post.thumbnails?.[0]?.thumbnails?.full || post.thumbnail || '/images/placeholder.jpg'}
        alt={post.caption || post.title || post.description || 'Video thumbnail'}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-sm font-medium">{post.caption || post.title || post.description}</p>
        <p className="text-xs mt-1">Click to play video</p>
      </div>
    </div>
  </div>
);

export default VideoCard; 