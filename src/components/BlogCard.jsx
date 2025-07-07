import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technology: 'bg-blue-100 text-blue-700 border-blue-200',
      Design: 'bg-pink-100 text-pink-700 border-pink-200',
      Business: 'bg-green-100 text-green-700 border-green-200',
      Lifestyle: 'bg-purple-100 text-purple-700 border-purple-200',
      Health: 'bg-red-100 text-red-700 border-red-200',
      Food: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      Travel: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      Photography: 'bg-gray-100 text-gray-700 border-gray-200',
      Writing: 'bg-orange-100 text-orange-700 border-orange-200',
      Music: 'bg-violet-100 text-violet-700 border-violet-200',
      Environment: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Finance: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      Education: 'bg-lime-100 text-lime-700 border-lime-200',
      Fashion: 'bg-rose-100 text-rose-700 border-rose-200',
      Wellness: 'bg-teal-100 text-teal-700 border-teal-200',
      Gardening: 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={blog.coverImage || `https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80`} 
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
          }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${getCategoryColor(blog.category)} backdrop-blur-sm`}>
            {blog.category}
          </span>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          <Link to={`/blog/${blog._id}`} className="hover:underline">
            {blog.title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {blog.excerpt || blog.content.substring(0, 150) + '...'}
        </p>

        {/* Author and Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <Link 
            to={blog.authorId ? `/profile/${blog.authorId}` : '/profile'} 
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {blog.author?.charAt(0).toUpperCase() || 'A'}
            </div>
            <span className="font-medium">{blog.author}</span>
          </Link>
          <time className="text-gray-400">{formatDate(blog.createdAt)}</time>
        </div>

        {/* Read More Button */}
        <div className="flex items-center justify-end">
          <Link 
            to={`/blog/${blog._id}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group/link"
          >
            Read More
            <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
