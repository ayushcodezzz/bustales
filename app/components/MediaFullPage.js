import React, { useEffect, useState } from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import axios from 'axios';
import Button from './Button';
import SafeHtml from '../helpers/SafeHtml';

const MediaFullPage = ({ post, onClose }) => {
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likescount || 0);

  // Check localStorage for liked state when component mounts
  useEffect(() => {
    if (post) {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
      setIsLiked(likedPosts.includes(post.id));
      setLikeCount(post?.likescount || 0);
    }
  }, [post]);

  // Prevent body scroll when full page is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleMediaLoad = () => {
    setIsMediaLoaded(true);
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
      if (!likedPosts.includes(post.id)) {
        likedPosts.push(post.id);
      }
    } else {
      // Remove post from liked posts
      const index = likedPosts.indexOf(post.id);
      if (index > -1) {
        likedPosts.splice(index, 1);
      }
    }
    
    // Save back to localStorage
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    
    // Post to API using axios
    try {
      const response = await axios.post('/api/likes', {
        postId: post.airtableId,
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

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Navbar with back button */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            onClick={onClose}
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">B</span>
            </div>
            <span className="font-semibold text-sm">bustales_</span>
          </div>
          
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main content */}
      <div className="pt-12 h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto pb-8">
          {/* Media container */}
          <div className="flex flex-col space-y-6">
            {/* Media */}
            <div className="relative w-full max-w-2xl">
              {!isMediaLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-gray-500">Loading...</div>
                </div>
              )}
              
              {post.type === 'video' ? (
                <video
                  src={post.videoUrl}
                  controls
                  className="w-full shadow-lg"
                  poster={post.thumbnailUrl}
                  onLoadedData={handleMediaLoad}
                />
              ) : (
                <img
                  src={post.image[0].url}
                  alt={post.caption}
                  className="w-full shadow-lg"
                  onLoad={handleMediaLoad}
                />
              )}
            </div>

            {/* Like button */}
            <div className="flex items-center border-b border-gray-200 pb-2">
              <Button 
                className="flex px-2 rounded-full transition-colors"
                onClick={handleLike}
              >
                <Heart 
                  size={20} 
                  fill={isLiked ? "#ef4444" : "none"}
                  color={isLiked ? "#ef4444" : "#6b7280"}
                />
              </Button>
              
              <span className="text-gray-600 font-bold">
                {likeCount} {likeCount === 1 ? 'like' : 'likes'}
              </span>
            </div>

            {/* Caption and details */}
            <div className="w-full max-w-2xl space-y-6">
              {post.fullcaption && (
                <div className="px-2">
                  <div className="prose prose-sm max-w-none">
                    <SafeHtml html={post.fullcaption} />
                  </div>
                </div>
              )}
              
              {/* Additional post details if available */}
              {post.details && post.details.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Details</h3>
                  <div className="space-y-2">
                    {post.details.map((detail, index) => (
                      <div key={index} className="text-sm text-gray-700">
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaFullPage; 