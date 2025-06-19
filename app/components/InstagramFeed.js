import React from 'react';
import MediaCard from './MediaCard';

const InstagramFeed = ({ openModal, posts }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Bus Captures</h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
          {posts.map((post) => (
            <MediaCard key={post.airtableId} post={post} onClick={openModal} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;