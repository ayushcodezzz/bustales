import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Pause } from 'lucide-react';
import axios from 'axios';
import Button from './Button';
import SafeHtml from '../helpers/SafeHtml';
import { useRouter, useSearchParams } from 'next/navigation';
import MediaFullPage from './MediaFullPage';

function useIsMdOrLarger() {
  const [isMd, setIsMd] = useState(true);
  useEffect(() => {
    const check = () => setIsMd(window.matchMedia('(min-width: 768px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMd;
}

const MediaModal = ({ isOpen, onClose, post }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likescount || 0);
  const [currentPost, setCurrentPost] = useState(post);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);
  const isMdOrLarger = useIsMdOrLarger();

  // Check URL for post ID on component mount
  useEffect(() => {
    const postId = searchParams.get('post');
    if (postId && !currentPost) {
      // Fetch the post data from API
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/bustales/${postId}`);
          if (response.data && !response.data.error) {
            setCurrentPost(response.data);
          }
        } catch (error) {
          console.error('Error fetching post:', error);
        }
      };
      fetchPost();
    }
  }, [searchParams, currentPost]);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      const postId = searchParams.get('post');
      if (!postId && isOpen) {
        // If post parameter is removed from URL and modal is open, close it
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [searchParams, isOpen, onClose]);

  // Update URL when modal opens/closes
  useEffect(() => {
    if (isOpen && post) {
      // Update URL with post ID
      const url = new URL(window.location);
      url.searchParams.set('post', post.airtableId);
      window.history.pushState({}, '', url);
    } else if (!isOpen) {
      // Remove post ID from URL when modal closes
      const url = new URL(window.location);
      url.searchParams.delete('post');
      window.history.pushState({}, '', url);
    }
  }, [isOpen, post]);

  // Check localStorage for liked state when modal opens
  useEffect(() => {
    if (isOpen && currentPost) {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      setIsLiked(likedPosts.includes(currentPost.id));
      setLikeCount(currentPost?.likescount || 0);
    }
  }, [isOpen, currentPost]);

  // Auto-start video when modal opens
  useEffect(() => {
    if (isOpen && currentPost?.type === 'video' && videoRef.current) {
      // Small delay to ensure video is ready
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().then(() => {
            setIsVideoPlaying(true);
          }).catch(error => {
            console.log('Auto-play failed:', error);
          });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentPost]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset loading state when modal opens
      setIsMediaLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    console.log('Current post data:', currentPost);
    console.log('Post fields:', currentPost ? Object.keys(currentPost) : 'No post');
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentPost]);

  const handleMediaLoad = () => {
    setIsMediaLoaded(true);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  const handleClose = () => {
    // Remove post ID from URL
    const url = new URL(window.location);
    url.searchParams.delete('post');
    window.history.pushState({}, '', url);
    onClose();
  };

  const handleLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    // Update like count locally
    const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;
    setLikeCount(newLikeCount);
    
    // Get current liked posts from localStorage
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    
    if (newLikedState) {
      // Add post to liked posts if not already there
      if (!likedPosts.includes(currentPost.id)) {
        likedPosts.push(currentPost.id);
      }
    } else {
      // Remove post from liked posts
      const index = likedPosts.indexOf(currentPost.id);
      if (index > -1) {
        likedPosts.splice(index, 1);
      }
    }
    
    // Save back to localStorage
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    
    // Post to API using axios
    try {
      const response = await axios.post('/api/likes', {
        postId: currentPost.airtableId,
        likeCount: newLikeCount
      });
      
      if (response.status === 200 && response.data.success) {
        // Update the like count with the actual value from Airtable
        setLikeCount(response.data.currentLikeCount);
      } else {
        console.error('Failed to update like count in API');
        // Revert the like count if API call fails
        setLikeCount(likeCount);
        setIsLiked(!newLikedState);
      }
    } catch (error) {
      console.error('Error updating like count:', error);
      // Revert the like count if API call fails
      setLikeCount(likeCount);
      setIsLiked(!newLikedState);
    }
  };

  // Determine if modal should be open based on URL or props
  const shouldBeOpen = isOpen || searchParams.get('post') !== null;
  const displayPost = currentPost || post;

  if (!shouldBeOpen || !displayPost) return null;

  // On screens smaller than md, show full page
  if (!isMdOrLarger) {
    return <MediaFullPage post={displayPost} onClose={handleClose} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 40% black background overlay */}
      <div 
        className="absolute inset-0 bg-black/40" 
        onClick={handleClose}
      ></div>
      
      {/* Main modal container */}
      <div className="relative z-10 max-w-5xl w-full h-[90vh] mx-4 mt-4 bg-white rounded-lg overflow-hidden flex items-stretch">
        {/* Close button - always at top-right inside modal */}
        <Button
          onClick={handleClose}
          className="absolute top-2 right-4 text-white rounded-full p-2 transition-colors z-20"
          style={{ zIndex: 20 }}
        >
          <X size={20} color="black" />
        </Button>
        
        {/* Loading state */}
        {!isMediaLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-gray-500">Loading...</div>
          </div>
        )}
        
        {/* Left side - Media */}
        <div className="bg-black flex items-center justify-center relative">
          {displayPost.type === 'video' ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                src={displayPost.videoUrl || displayPost.video || displayPost.image[0].url}
                poster={displayPost.videothumbnail || displayPost.thumbnails[0].thumbnails.full}
                onLoadedData={handleMediaLoad}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                className="max-w-full max-h-full object-contain cursor-pointer"
                onClick={handleVideoClick}
              />
              {/* Custom play/pause button overlay */}
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                onClick={handleVideoClick}
              >
                {!isVideoPlaying && (
                  <Play size={60} color="white" />
                )}
              </div>
            </div>
          ) : (
            <img
              src={displayPost.image[0].url}
              alt={displayPost.caption || displayPost.title || 'Image'}
              className="max-w-full max-h-full object-cover"
              onLoad={handleMediaLoad}
            />
          )}
        </div>
        
        {/* Right side - Post details */}
        <div className="max-w-xl w-full flex flex-col">
          
          {/* Header with user info */}
          <div className="p-4 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">B</span>
            </div>
            <span className="font-semibold text-sm">bustales_</span>
          </div>
          <div className="ml-4 mt-0.5 mb-2 h-px w-full bg-gray-200" />
          
          {/* Description/Caption area with overflow */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="flex items-start mb-4">
              <div className="flex-1">
                {(displayPost.fullcaption || displayPost.description || displayPost.caption) && (
                  <SafeHtml html={displayPost.fullcaption || displayPost.description || displayPost.caption} />
                )}
              </div>
            </div>
            
            {/* Additional post details if available */}
            {displayPost.details && (
              <div className="text-xs text-gray-600 space-y-1">
                {displayPost.details.map((detail, index) => (
                  <div key={index}>{detail}</div>
                ))}
              </div>
            )}
          </div>
          <div className="ml-4 mt-0.5 h-px w-full bg-gray-200" />
          
          {/* Action buttons area */}
          <div className="p-4 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <Button 
                  className="hover:opacity-50 transition-colors duration-200"
                  onClick={handleLike}
                >
                  <svg 
                    className="w-6 h-6" 
                    fill={isLiked ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: isLiked ? '#ef4444' : '#6b7280' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Button>
              </div>
            </div>
            
            {/* Likes and comments */}
            <div className="text-sm">
              <div className="font-semibold mb-1">{likeCount} likes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;