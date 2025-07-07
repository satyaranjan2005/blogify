import React, { useState, useEffect, useCallback } from 'react';
import BlogCard from '../components/BlogCard';
import Header from '../components/Header';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Use useCallback to memoize the fetchBlogs function
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      params.append('page', currentPage);
      params.append('limit', 10);
      
      const response = await axios.get(`${API_URL}/blogs?${params}`);
      setBlogs(response.data.blogs || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Fallback to mock data if backend is not available
    const mockBlogs = [
      {
        _id: '1',
        title: 'Getting Started with React and Tailwind CSS',
        content: 'Learn how to build beautiful user interfaces with React and Tailwind CSS. This comprehensive guide will walk you through the setup process and best practices.',
        excerpt: 'Learn how to build beautiful user interfaces with React and Tailwind CSS.',
        author: 'John Doe',
        category: 'Technology',
        createdAt: new Date().toISOString(),
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '2',
        title: 'Modern Web Development Trends in 2025',
        content: 'Explore the latest trends in web development including AI integration, serverless architecture, and progressive web apps.',
        excerpt: 'Explore the latest trends in web development including AI integration.',
        author: 'Jane Smith',
        category: 'Technology',
        createdAt: new Date(Date.now() - 86400000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '3',
        title: 'The Art of Minimalist Design',
        content: 'Discover how minimalist design principles can improve user experience and create more engaging digital products.',
        excerpt: 'Discover how minimalist design principles can improve user experience.',
        author: 'Mike Johnson',
        category: 'Design',
        createdAt: new Date(Date.now() - 172800000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '4',
        title: 'Building Scalable Node.js Applications',
        content: 'A comprehensive guide to building robust and scalable backend applications using Node.js and Express.',
        excerpt: 'Learn the best practices for building scalable Node.js applications.',
        author: 'Sarah Williams',
        category: 'Technology',
        createdAt: new Date(Date.now() - 259200000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '5',
        title: 'Digital Marketing Strategies for 2025',
        content: 'Explore the evolving landscape of digital marketing and discover new strategies to reach your audience.',
        excerpt: 'Stay ahead with the latest digital marketing trends and strategies.',
        author: 'David Brown',
        category: 'Business',
        createdAt: new Date(Date.now() - 345600000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '6',
        title: 'Healthy Living in a Digital Age',
        content: 'Tips and strategies for maintaining physical and mental wellness while navigating our increasingly digital world.',
        excerpt: 'Balance technology and wellness for a healthier lifestyle.',
        author: 'Emily Davis',
        category: 'Lifestyle',
        createdAt: new Date(Date.now() - 432000000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '7',
        title: 'The Future of Artificial Intelligence',
        content: 'An in-depth look at how AI is reshaping industries and what it means for the future of work.',
        excerpt: 'Exploring the transformative impact of AI across various industries.',
        author: 'Alex Chen',
        category: 'Technology',
        createdAt: new Date(Date.now() - 518400000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '8',
        title: 'Creative Writing Techniques That Work',
        content: 'Unlock your creative potential with proven writing techniques and exercises.',
        excerpt: 'Master the art of creative writing with these proven techniques.',
        author: 'Maria Rodriguez',
        category: 'Lifestyle',
        createdAt: new Date(Date.now() - 604800000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '9',
        title: 'Mastering React Hooks: A Complete Guide',
        content: 'Deep dive into React hooks and learn how to use them effectively in your applications.',
        excerpt: 'Everything you need to know about React hooks and their practical applications.',
        author: 'Tom Wilson',
        category: 'Technology',
        createdAt: new Date(Date.now() - 691200000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '10',
        title: 'Sustainable Fashion: A Modern Approach',
        content: 'Exploring eco-friendly fashion choices and their impact on the environment.',
        excerpt: 'How to make conscious fashion choices for a better planet.',
        author: 'Lisa Green',
        category: 'Lifestyle',
        createdAt: new Date(Date.now() - 777600000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '11',
        title: 'Financial Planning for Millennials',
        content: 'Smart strategies for building wealth and securing your financial future.',
        excerpt: 'Practical financial advice tailored for the millennial generation.',
        author: 'Robert Kim',
        category: 'Business',
        createdAt: new Date(Date.now() - 864000000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '12',
        title: 'The Psychology of Color in Design',
        content: 'Understanding how colors influence user behavior and design decisions.',
        excerpt: 'Learn how color psychology can enhance your design projects.',
        author: 'Anna Foster',
        category: 'Design',
        createdAt: new Date(Date.now() - 950400000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '13',
        title: 'Cloud Computing: The Complete Beginner\'s Guide',
        content: 'An introduction to cloud computing concepts, services, and benefits.',
        excerpt: 'Start your journey into cloud computing with this comprehensive guide.',
        author: 'Chris Anderson',
        category: 'Technology',
        createdAt: new Date(Date.now() - 1036800000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '14',
        title: 'Mindfulness and Productivity',
        content: 'How mindfulness practices can boost your productivity and well-being.',
        excerpt: 'Discover the connection between mindfulness and peak performance.',
        author: 'Dr. Sarah Chen',
        category: 'Lifestyle',
        createdAt: new Date(Date.now() - 1123200000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '15',
        title: 'Database Design Best Practices',
        content: 'Learn the fundamentals of database design and optimization.',
        excerpt: 'Essential principles for designing efficient and scalable databases.',
        author: 'Mike Zhang',
        category: 'Technology',
        createdAt: new Date(Date.now() - 1209600000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '16',
        title: 'Content Marketing in the Digital Era',
        content: 'Strategies for creating compelling content that drives engagement.',
        excerpt: 'Master content marketing to grow your online presence.',
        author: 'Rachel Lee',
        category: 'Business',
        createdAt: new Date(Date.now() - 1296000000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '17',
        title: 'UX Research Methods That Actually Work',
        content: 'Practical approaches to user experience research and testing.',
        excerpt: 'Effective UX research methods for better product design.',
        author: 'Jessica Park',
        category: 'Design',
        createdAt: new Date(Date.now() - 1382400000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '18',
        title: 'Home Workout Routines for Busy Schedules',
        content: 'Effective fitness routines you can do at home in minimal time.',
        excerpt: 'Stay fit with these quick and effective home workout routines.',
        author: 'Fitness Coach Alex',
        category: 'Health',
        createdAt: new Date(Date.now() - 1468800000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '19',
        title: 'Remote Work Best Practices',
        content: 'Tips for staying productive and maintaining work-life balance while working remotely.',
        excerpt: 'Master remote work with these proven strategies and tips.',
        author: 'Sarah Johnson',
        category: 'Business',
        createdAt: new Date(Date.now() - 1555200000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '20',
        title: 'Mobile App Development Trends',
        content: 'Latest trends and technologies shaping mobile app development.',
        excerpt: 'Stay updated with the current mobile development landscape.',
        author: 'Dev Expert Tom',
        category: 'Technology',
        createdAt: new Date(Date.now() - 1641600000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '21',
        title: 'Interior Design on a Budget',
        content: 'Transform your space without breaking the bank with these creative ideas.',
        excerpt: 'Beautiful interior design ideas that won\'t exceed your budget.',
        author: 'Design Guru Lisa',
        category: 'Design',
        createdAt: new Date(Date.now() - 1728000000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '22',
        title: 'Photography Tips for Beginners',
        content: 'Essential photography techniques to improve your skills quickly.',
        excerpt: 'Start your photography journey with these fundamental tips.',
        author: 'Laura Davis',
        category: 'Photography',
        createdAt: new Date(Date.now() - 1814400000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '23',
        title: 'API Development with Express.js',
        content: 'Build robust RESTful APIs using Express.js and Node.js.',
        excerpt: 'Complete guide to creating professional APIs with Express.js.',
        author: 'Kevin Zhang',
        category: 'Technology',
        createdAt: new Date(Date.now() - 1900800000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '24',
        title: 'Typography in Modern Web Design',
        content: 'How to choose and implement effective typography for web projects.',
        excerpt: 'Master the art of web typography for better user experience.',
        author: 'Grace Chen',
        category: 'Design',
        createdAt: new Date(Date.now() - 1987200000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90bi1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '25',
        title: 'Travel Photography: Capturing Memories',
        content: 'Learn how to take stunning travel photos that tell your story.',
        excerpt: 'Tips and techniques for capturing amazing travel photographs.',
        author: 'Marco Silva',
        category: 'Travel',
        createdAt: new Date(Date.now() - 2073600000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '26',
        title: 'Healthy Meal Prep for Busy Professionals',
        content: 'Simple and nutritious meal prep ideas for maintaining a healthy diet.',
        excerpt: 'Stay healthy and save time with these meal prep strategies.',
        author: 'Chef Nina Rodriguez',
        category: 'Health',
        createdAt: new Date(Date.now() - 2160000000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      },
      {
        _id: '27',
        title: 'Sustainable Living: Small Changes, Big Impact',
        content: 'Discover how small lifestyle changes can make a significant environmental impact.',
        excerpt: 'Easy steps to live more sustainably and reduce your carbon footprint.',
        author: 'Emma Green',
        category: 'Environment',
        createdAt: new Date(Date.now() - 2246400000).toISOString(),


        coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      }
    ];

    // Filter blogs based on search and category
    let filteredBlogs = mockBlogs;
    
    if (searchTerm) {
      filteredBlogs = filteredBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'all') {
      filteredBlogs = filteredBlogs.filter(blog => blog.category === selectedCategory);
    }

    // Calculate pagination
    const limit = 6;
    const totalBlogs = filteredBlogs.length;
    const totalPagesCalc = Math.ceil(totalBlogs / limit);
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

    setBlogs(paginatedBlogs);
    setTotalPages(totalPagesCalc);
    setLoading(false);
  }, [currentPage, searchTerm, selectedCategory]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs/meta/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Extract unique categories from mock data
      const mockBlogs = [
        { category: 'Technology' },
        { category: 'Design' },
        { category: 'Business' },
        { category: 'Lifestyle' },
        { category: 'Health' },
        { category: 'Photography' },
        { category: 'Travel' },
        { category: 'Environment' }
      ];
      
      const uniqueCategories = [...new Set(mockBlogs.map(blog => blog.category))];
      setCategories(uniqueCategories);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setSearchParams(value ? { search: value } : {});
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const categoryIcons = {
    'Technology': '💻',
    'Design': '🎨', 
    'Business': '💼',
    'Lifestyle': '🌟',
    'Health': '🏥',
    'Photography': '📸',
    'Travel': '✈️',
    'Environment': '🌱'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header onSearch={handleSearch} searchTerm={searchTerm} />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header onSearch={handleSearch} searchTerm={searchTerm} />
      
      {/* Category Filter Bar - Sticky below header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">Filter by category:</span>
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-base">{categoryIcons[category] || '📚'}</span>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchTerm ? (
              <>Search results for "<span className="text-primary-600">{searchTerm}</span>"</>
            ) : selectedCategory !== 'all' ? (
              <>
                <span className="text-2xl mr-2">{categoryIcons[selectedCategory] || '📚'}</span>
                {selectedCategory} Articles
              </>
            ) : (
              'Latest Articles'
            )}
          </h1>
          <p className="text-gray-600">
            {searchTerm || selectedCategory !== 'all' 
              ? `${blogs.length} article${blogs.length !== 1 ? 's' : ''} found`
              : 'Discover our latest blog posts and insights'
            }
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm 
                  ? `No articles match your search for "${searchTerm}"`
                  : `No articles found in the ${selectedCategory} category`
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSearchParams({});
                }}
                className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Show all articles
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg shadow-sm ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
