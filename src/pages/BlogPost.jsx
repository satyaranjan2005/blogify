import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/blogs/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      // Mock data for demo when backend is not available
      setBlog({
        _id: id,
        title: 'Getting Started with React and Tailwind CSS',
        content: `# Introduction

React and Tailwind CSS make a powerful combination for building modern web applications. In this comprehensive guide, we'll explore how to set up and use these technologies together effectively.

## Why React and Tailwind?

React provides a component-based architecture that makes building user interfaces intuitive and maintainable. Tailwind CSS, on the other hand, offers a utility-first approach to styling that speeds up development and ensures consistency.

### Benefits of This Stack:

1. **Rapid Development** - Tailwind's utility classes allow for quick styling
2. **Consistency** - Design system built into the CSS framework
3. **Maintainability** - React components promote code reuse
4. **Performance** - Both tools are optimized for production

## Getting Started

To begin with React and Tailwind CSS, you'll need to set up a new project. Here's how to get started with the installation and basic configuration.

## Building Components

With React and Tailwind, creating components becomes a breeze. You can focus on functionality while maintaining consistent styling throughout your application.

## Conclusion

The combination of React and Tailwind CSS provides developers with powerful tools to create modern, responsive, and maintainable web applications efficiently.`,
        excerpt: 'Learn how to build beautiful user interfaces with React and Tailwind CSS.',
        author: 'John Doe',
        category: 'Technology',
        createdAt: new Date().toISOString(),
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <article className="max-w-4xl mx-auto">
        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative h-80 md:h-96 mb-8 overflow-hidden rounded-t-2xl">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-full border border-white/20">
                {blog.category}
              </span>
            </div>

            {/* Back Button */}
            <div className="absolute top-6 right-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium rounded-full border border-white/20 hover:bg-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
            </div>
          </div>
        )}

        <div className="bg-white rounded-b-2xl shadow-lg border border-gray-200">
          <div className="px-6 md:px-12 py-8 md:py-12">
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {blog.title}
              </h1>
              
              {/* Simple Author Section */}
              <div className="flex items-center gap-4 text-gray-600 mb-6 pb-6 border-b border-gray-100">
                <Link 
                  to={blog.authorId ? `/profile/${blog.authorId}` : '/profile'} 
                  className="flex items-center gap-3 hover:text-blue-600 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {blog.author?.charAt(0).toUpperCase() || 'A'}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{blog.author}</p>
                    <p className="text-sm text-gray-500">View Profile</p>
                  </div>
                </Link>
                
                <div className="w-px h-12 bg-gray-200"></div>
                
                <div>
                  <time className="font-medium text-gray-900">{formatDate(blog.createdAt)}</time>
                  <p className="text-sm text-gray-500">Published</p>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              <div 
                className="text-gray-800 leading-loose whitespace-pre-line"
                style={{ 
                  lineHeight: '1.8',
                  fontSize: '1.1rem'
                }}
              >
                {blog.content}
              </div>
            </div>

            {/* Article Footer - Back to Home Button */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex justify-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Back to Home
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
