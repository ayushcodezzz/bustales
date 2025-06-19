export const instagramPosts = [
  {
    id: 'photo-1',
    type: 'photo',
    imageUrl: '/images/instagram/sample1.jpg',
    caption: 'Beautiful sunset at the beach',
    timestamp: '2024-03-20T10:00:00Z',
    likes: 150,
    comments: 12
  },
  {
    id: 'photo-2',
    type: 'photo',
    imageUrl: '/images/instagram/sample2.jpg',
    caption: 'City lights at night',
    timestamp: '2024-03-19T15:30:00Z',
    likes: 200,
    comments: 25
  },
  {
    id: 'photo-3',
    type: 'photo',
    imageUrl: '/images/instagram/sample3.jpg',
    caption: 'Morning coffee vibes',
    fullCaption: 'Morning coffee vibes at the beach',
    timestamp: '2024-03-18T08:45:00Z',
  }
];

export const instagramVideos = [
  {
    id: 'video-1',
    type: 'video',
    videoUrl: '/videos/instagram/sample1.mp4',
    thumbnailUrl: '/images/instagram/thumb1.jpg',
    caption: 'Amazing dance moves',
    timestamp: '2024-03-20T14:20:00Z',
    likes: 300,
    comments: 40,
    duration: '00:30'
  },
  {
    id: 'video-2',
    type: 'video',
    videoUrl: '/videos/instagram/sample2.mp4',
    thumbnailUrl: '/images/instagram/thumb2.jpg',
    caption: 'Cooking tutorial',
    timestamp: '2024-03-19T12:15:00Z',
    likes: 250,
    comments: 35,
    duration: '01:00'
  },
  {
    id: 'video-3',
    type: 'video',
    videoUrl: '/videos/instagram/sample3.mp4',
    thumbnailUrl: '/images/instagram/thumb3.jpg',
    caption: 'Travel vlog',
    timestamp: '2024-03-18T16:40:00Z',
    likes: 400,
    comments: 50,
    duration: '00:45'
  }
];

// Latest 6 posts (combination of photos and videos)
export const latestBurCapture = [
  ...instagramPosts.slice(0, 3),
  ...instagramVideos.slice(0, 3)
].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 6); 