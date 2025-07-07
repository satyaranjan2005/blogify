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

To begin with React and Tailwind CSS, you'll need to set up a new project. Here's how:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Configure your \`tailwind.config.js\` file to include all your template files.

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
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

## Best Practices

When working with React and Tailwind, consider these best practices:

- **Component Organization**: Keep components small and focused
- **Custom Components**: Create reusable components for common UI patterns
- **Responsive Design**: Use Tailwind's responsive utilities
- **Performance**: Purge unused CSS in production

## Conclusion

React and Tailwind CSS together provide an excellent foundation for modern web development. Their combination offers both developer experience and end-user performance benefits.`,
        excerpt: 'Learn how to build beautiful user interfaces with React and Tailwind CSS.',
        author: 'John Doe',
        category: 'Technology',
        createdAt: new Date().toISOString(),
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          {blog.coverImage ? (
            <div className="relative h-80 md:h-96 overflow-hidden">
              <img 
                src={blog.coverImage} 
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              
              {/* Category badge overlay */}
              <div className="absolute top-6 left-6">
                <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                  {blog.category}
                </span>
              </div>
            </div>
          ) : (
            <div className="relative h-32 bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center">
              <div className="text-center text-white">
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full">
                  {blog.category}
                </span>
              </div>
            </div>
          )}
          
          <div className="p-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {blog.title}
            </h1>

            {/* Author and Date */}
            <div className="flex items-center mb-8 pb-6 border-b">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-semibold text-sm">
                  {blog.author.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{blog.author}</div>
                <div className="text-sm text-gray-500">{formatDate(blog.createdAt)}</div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: blog.content.replace(/\n/g, '<br>').replace(/#{1,6}\s(.*)/g, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
                }} 
              />
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link to="/" className="btn-primary">
            View More Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
