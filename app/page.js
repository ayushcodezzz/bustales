"use client"
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MediaModal from './components/MediaModal';
import InstagramFeed from './components/InstagramFeed';
import Hero from './components/Hero';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const getCurrentPageKey = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname;
  if (path === '/' || path === '') return 'home';
  if (path.startsWith('/bus-gallery')) return 'bus-gallery';
  if (path.startsWith('/videos')) return 'videos';
  if (path.startsWith('/about')) return 'about';
  if (path.startsWith('/contact')) return 'contact';
  return 'home';
};

export default function HomePage() {
  const searchParams = useSearchParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    setCurrentPage(getCurrentPageKey());
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/bustales');
        const data = res.data;
        if (data && data.records) {
          const all = data.records.map((r) => ({ ...r.fields, airtableId: r.id }));
          const sorted = all.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setPosts(sorted.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // Check URL for post parameter and open modal if present
  useEffect(() => {
    const postId = searchParams.get('post');
    if (postId) {
      // Find the post in the current posts array
      const post = posts.find(p => p.airtableId === postId);
      if (post) {
        setSelectedPost(post);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, posts]);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} />
      <main className="relative">
        <Hero />
        <InstagramFeed openModal={handleOpenModal} posts={posts} />
      </main>
      <Footer />
      <MediaModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
      />
    </div>
  );
}