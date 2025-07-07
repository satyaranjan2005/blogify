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
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto">
        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative h-96 mb-8 overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            
            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full">
                {blog.category}
              </span>
            </div>
          </div>
        )}

        <div className="px-6 pb-12">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-600 mb-6">
              <span className="font-medium">{blog.author}</span>
              <span>•</span>
              <time>{formatDate(blog.createdAt)}</time>
            </div>

            {blog.excerpt && (
              <p className="text-xl text-gray-700 leading-relaxed">
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed whitespace-pre-line"
              style={{ lineHeight: '1.8' }}
            >
              {blog.content}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {blog.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{blog.author}</p>
                  <p className="text-gray-600 text-sm">Published on {formatDate(blog.createdAt)}</p>
                </div>
              </div>
              
              <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Back to Home
              </Link>
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
