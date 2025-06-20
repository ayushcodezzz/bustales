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
    let finalImageUrl = '';
    
    if (post.type === 'video') {
      // For videos, try to get thumbnail from thumbnails array first
      if (post.thumbnails && post.thumbnails.length > 0) {
        const thumbnail = post.thumbnails[0];
        if (thumbnail.thumbnails?.full?.url) {
          finalImageUrl = thumbnail.thumbnails.full.url;
        } else if (thumbnail.thumbnails?.large?.url) {
          finalImageUrl = thumbnail.thumbnails.large.url;
        } else if (thumbnail.thumbnails?.small?.url) {
          finalImageUrl = thumbnail.thumbnails.small.url;
        } else if (thumbnail.url) {
          finalImageUrl = thumbnail.url;
        }
      }
      
      // If no thumbnail found, try the image array (which might contain video thumbnail)
      if (!finalImageUrl && post.image && post.image.length > 0) {
        const imageThumbnail = getImageUrl(post.image);
        finalImageUrl = imageThumbnail;
      }
    } else {
      const imageThumbnail = getImageUrl(post.image);
      finalImageUrl = imageThumbnail;
    }
    
    return finalImageUrl;
  }, [post.image, post.type, post.thumbnails]);

  // Handle image error with useCallback to prevent re-renders
  const handleImageError = useCallback(() => {
    console.warn('Image failed to load:', imageUrl);
    setImageError(true);
  }, [imageUrl]);

  // Use error state to determine final URL
  const finalImageUrl = imageError ? null : imageUrl;

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-2xl cursor-pointer hover:shadow-2xl hover:transition-shadow duration-300"
      onClick={() => onClick(post)}
    >
      <div className="relative w-full aspect-[4/5]">
        <Image
          src={finalImageUrl || null}
          alt={post.type === 'video' ? 'Video thumbnail' : 'Bus photo'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-lg"
          onError={handleImageError}
          priority={false}
          loading="lazy"
          quality={75}
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
          {post.caption || post.title || post.description || 'No caption'}
        </div>
      </div>
    </div>
  );
};

export default MediaCard;