import React, { useState, useEffect, useCallback } from 'react';
import BlogCard from '../components/BlogCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
        }
      ];

      // Filter blogs based on search and category
      let filteredBlogs = mockBlogs;
      
      if (searchTerm) {
        filteredBlogs = filteredBlogs.filter(blog =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedCategory !== 'all') {
        filteredBlogs = filteredBlogs.filter(blog => blog.category === selectedCategory);
      }

      setBlogs(filteredBlogs.slice(0, 10));
      setTotalPages(Math.ceil(filteredBlogs.length / 10));
    }
    
    setLoading(false);
  }, [currentPage, searchTerm, selectedCategory]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs/meta/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Extract unique categories from mock data
      const mockCategories = ['Technology', 'Design', 'Business', 'Lifestyle'];
      setCategories(mockCategories);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    
    if (term) {
      setSearchParams({ search: term });
    } else {
      setSearchParams({});
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const categoryIcons = {
    Technology: '💻',
    Design: '🎨',
    Business: '💼',
    Lifestyle: '🌟',
    Health: '🏥',
    Food: '🍳',
    Travel: '✈️',
    Photography: '📸',
    Writing: '✍️',
    Music: '🎵',
    Environment: '🌱',
    Finance: '💰',
    Education: '📚',
    Fashion: '👗',
    Wellness: '🧘',
    Gardening: '🌻'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header onSearch={handleSearch} searchTerm={searchTerm} />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Category Filter */}
        <div className="sticky top-0 z-20 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4">
              <div className="flex overflow-x-auto gap-2 pb-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>🌟</span>
                  All Categories
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span>{categoryIcons[category] || '📄'}</span>
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading amazing content...</p>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No blogs found</h3>
              <p className="text-gray-600">
                {searchTerm ? `No results for "${searchTerm}"` : 'No blogs available at the moment'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => handleSearch('')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results summary */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {searchTerm && (
                  <span>
                    Search results for "<span className="font-medium text-gray-900">{searchTerm}</span>" • 
                  </span>
                )}
                <span className="ml-1">
                  {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} found
                </span>
              </div>
              {selectedCategory !== 'all' && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Filtered by:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    {categoryIcons[selectedCategory]} {selectedCategory}
                  </span>
                </div>
              )}
            </div>
            
            {/* Blog cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2.5 rounded-lg border transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
