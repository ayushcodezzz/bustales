import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';

const MediaCard = ({ post, onClick }) => {
  const [imageError, setImageError] = useState(false);
  
  // Memoize the image URL calculation to prevent unnecessary re-calculations
  const imageUrl = useMemo(() => {
    // Helper function to get the best available image URL
    function getImageUrl(imageArray) {
      if (!Array.isArray(imageArray) || imageArray.length === 0) {
        return null;
      }
      
      
      const imageObj = imageArray[0];
      if (!imageObj) return null;
      
      // Try different URL sources in order of preference
      // 1. Try large thumbnail (good balance of quality and loading speed)
      if (imageObj.thumbnails?.large?.url) {
        return imageObj.thumbnails.large.url;
      }
      
      // 2. Try full size thumbnail (best quality)
      if (imageObj.thumbnails?.full?.url) {
        return imageObj.thumbnails.full.url;
      }
      
      // 3. Try small thumbnail (lowest quality but most likely to work)
      if (imageObj.thumbnails?.small?.url) {
        return imageObj.thumbnails.small.url;
      }
      
      // 4. Fall back to main URL if it's reasonable length
      if (imageObj.url && imageObj.url.length > 50 && imageObj.url.length < 500) {
        return imageObj.url;
      }
      
      return null;
    }

    // Get the best available image URL from Airtable data
    let finalImageUrl = '/images/placeholder.jpg';
    
    if (post.type === 'video') {
      finalImageUrl = post.videoUrl || getImageUrl(post.image) || '/images/placeholder.jpg';
    } else {
      finalImageUrl = getImageUrl(post.image) || '/images/placeholder.jpg';
    }
    
    return finalImageUrl;
  }, [post.image, post.type, post.videoUrl]);

  // Only log debug info in development and limit frequency
  useMemo(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('MediaCard Debug for Post ID:', post.id);
      console.log('Post Type:', post.type);
      console.log('Selected imageUrl:', imageUrl);
      console.log('Has valid Airtable URL:', imageUrl.includes('airtableusercontent.com'));
    }
  }, [post.id, post.type, imageUrl]);

  // Handle image error with useCallback to prevent re-renders
  const handleImageError = useCallback(() => {
    console.warn('Image failed to load:', imageUrl);
    setImageError(true);
  }, [imageUrl]);

  // Use placeholder if there's an error
  const finalImageUrl = imageError ? '/images/placeholder.jpg' : imageUrl;
  const isAirtableImage = finalImageUrl.includes('airtableusercontent.com');

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:transition-shadow duration-300"
      onClick={() => onClick(post)}
    >
      <div className="relative w-full aspect-[4/5]">
        <Image
          src={finalImageUrl}
          alt={post.type === 'video' ? 'Video thumbnail' : 'Bus photo'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-lg"
          onError={handleImageError}
          // Use unoptimized for Airtable images to avoid Next.js optimization issues
          unoptimized={isAirtableImage}
          priority={false}
          // Add loading strategy
          loading="lazy"
          // Add quality setting for better performance
          quality={isAirtableImage ? 100 : 75}
        />
        {post.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      {/* Always show the caption at the bottom, no hover overlays, no zoom */}
      <div className="p-2 sm:p-3 md:p-4">
        <div className="font-semibold text-xs sm:text-base md:text-lg lg:text-xl text-gray-900 truncate leading-tight">
          {post.caption || 'No caption'}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;