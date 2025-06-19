import React from 'react';
import Image from 'next/image';

const PhotoCard = ({ post, onClick }) => (
  <div
    className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
    onClick={() => onClick(post)}
  >
    <div className="aspect-w-4 aspect-h-3 relative">
      <Image
        src={post.imageUrl || '/images/placeholder.jpg'}
        alt={post.caption || 'Photo'}
        fill
        className="object-cover"
      />
    </div>
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-sm font-medium">{post.caption}</p>
        <p className="text-xs mt-1">Click to view details</p>
      </div>
    </div>
  </div>
);

export default PhotoCard; 