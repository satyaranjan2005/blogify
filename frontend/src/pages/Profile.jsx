import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const Profile = () => {
  const { userId } = useParams(); // Get userId from URL params
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState(null); // User whose profile we're viewing
  const [userStats, setUserStats] = useState({
    postsCount: 0,
    viewsCount: 0
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null); // Store post ID for delete confirmation
  const [deleteLoading, setDeleteLoading] = useState(false); // Loading state for delete operation
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    avatar: ''
  });

  // Determine if this is the current user's profile or someone else's
  const isOwnProfile = !userId || (user && (user.id === userId || user._id === userId));
  const displayUser = isOwnProfile ? user : profileUser;

  // Helper function to format dates
  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  }, []);

  // Load user data function
  const loadUserDataForUser = useCallback(async (targetUser) => {
    setLoading(true);
    
    try {
      const targetUserName = targetUser?.username;
      
      // Fetch user's blog posts
      let userBlogs = [];
      if (targetUserName) {
        try {
          const blogsResponse = await axios.get(`${API_URL}/blogs?author=${targetUserName}&limit=10`);
          userBlogs = blogsResponse.data.blogs || [];
        } catch (error) {
          console.error('Error fetching user blogs:', error);
          // Try fetching all blogs and filter by author
          try {
            const allBlogsResponse = await axios.get(`${API_URL}/blogs`);
            const allBlogs = allBlogsResponse.data.blogs || allBlogsResponse.data || [];
            userBlogs = allBlogs.filter(blog => blog.author === targetUserName);
          } catch (fallbackError) {
            console.error('Error fetching blogs:', fallbackError);
            userBlogs = [];
          }
        }
      }
      
      // Calculate stats
      const totalViews = userBlogs.reduce((sum, blog) => sum + (blog.views || 0), 0);
      
      setUserStats({
        postsCount: userBlogs.length,
        viewsCount: totalViews
      });

      // Format recent posts
      const formattedPosts = userBlogs.map(blog => ({
        id: blog._id,
        title: blog.title,
        excerpt: blog.excerpt || blog.content?.substring(0, 100) + '...',
        publishedAt: formatDate(blog.createdAt),
        views: blog.views || 0,
        status: blog.published ? 'published' : 'draft',
        coverImage: blog.coverImage || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      })).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

      setRecentPosts(formattedPosts);
      
    } catch (error) {
      console.error('Error loading user data:', error);
      // Fallback to mock data
      setUserStats({
        postsCount: 0,
        viewsCount: 0
      });
      setRecentPosts([]);
    }
    
    setLoading(false);
  }, [formatDate]);

  useEffect(() => {
    const loadProfileData = async () => {
      let targetUser = null;
      
      if (userId && userId !== user?.id && userId !== user?._id) {
        // Viewing someone else's profile - fetch their data
        try {
          const response = await axios.get(`${API_URL}/auth/profile/${userId}`);
          targetUser = response.data;
          setProfileUser(targetUser);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          // Set mock data for demo
          targetUser = {
            id: userId,
            username: 'Demo User',
            email: 'demo@example.com',
            bio: 'This is a demo profile. Backend connection needed for real data.',
            avatar: '',
            location: 'Demo Location',
            website: 'https://demo.com'
          };
          setProfileUser(targetUser);
        }
      } else if (user) {
        // Viewing own profile - use current user data
        targetUser = user;
        setFormData({
          username: user.username || '',
          email: user.email || '',
          bio: user.bio || 'Passionate writer and storyteller',
          avatar: user.avatar || ''
        });
      }

      // Load user stats and posts for any profile
      if (targetUser) {
        await loadUserDataForUser(targetUser);
      }
    };

    loadProfileData();
  }, [user, userId, loadUserDataForUser]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 2MB for avatars)
      if (file.size > 2 * 1024 * 1024) {
        alert('Avatar file size must be less than 2MB. Please choose a smaller image.');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate new dimensions (max size: 400px for avatars)
          let { width, height } = img;
          const maxSize = 400;
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress image
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.9); // 90% quality for avatars
          setAvatarPreview(compressedDataUrl);
          setFormData({...formData, avatar: compressedDataUrl});
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    try {
      const result = await updateUser(formData);
      
      if (result.success) {
        setIsEditing(false);
        setAvatarPreview('');
        setAvatarFile(null);
        alert('Profile updated successfully!');
      } else {
        alert(result.error || 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview('');
    setAvatarFile(null);
    // Reset form data to original user data
    setFormData({
      username: user.username || '',
      email: user.email || '',
      bio: user.bio || 'Passionate writer and storyteller',
      avatar: user.avatar || ''
    });
  };

  // Handle blog post edit
  const handleEditPost = (postId) => {
    navigate(`/edit/${postId}`);
  };

  // Handle blog post delete
  const handleDeletePost = async (postId) => {
    if (deleteConfirm === postId) {
      setDeleteLoading(true);
      try {
        // Get token from cookies using js-cookie
        const Cookies = await import('js-cookie');
        const token = Cookies.default.get('auth_token');

        if (!token) {
          alert('Authentication required. Please log in.');
          setDeleteLoading(false);
          return;
        }

        await axios.delete(`${API_URL}/blogs/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Remove the deleted post from the state
        setRecentPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        
        // Update stats
        setUserStats(prevStats => ({
          ...prevStats,
          postsCount: prevStats.postsCount - 1
        }));

        setDeleteConfirm(null);
        alert('Post deleted successfully!');
      } catch (error) {
        console.error('Error deleting post:', error);
        const errorMessage = error.response?.data?.message || 'Failed to delete post. Please try again.';
        alert(errorMessage);
      } finally {
        setDeleteLoading(false);
      }
    } else {
      // Show confirmation
      setDeleteConfirm(postId);
    }
  };

  // Cancel delete confirmation
  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  if (loading || (!isOwnProfile && !profileUser)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!isOwnProfile && !profileUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User not found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  if (isOwnProfile && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-white p-1">
                  {(avatarPreview || displayUser?.avatar || formData.avatar) ? (
                    <img 
                      src={avatarPreview || displayUser?.avatar || formData.avatar} 
                      alt={displayUser?.username || formData.username} 
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-4xl font-bold">
                      {(displayUser?.username || formData.username)?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
              </div>
              {isEditing && isOwnProfile && (
                <>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-700 transition-colors cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                </>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center lg:text-left">
              {!isEditing ? (
                <>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {displayUser?.username || formData.username}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {displayUser?.bio || formData.bio}
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      {displayUser?.email || formData.email}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                      placeholder="Username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows="4"
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white/50 backdrop-blur-sm"
                      placeholder="Tell us about yourself"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {isOwnProfile && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Profile
                      </button>
                      <Link
                        to="/create"
                        className="inline-flex items-center px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Post
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg disabled:opacity-50"
                      >
                        {loading ? (
                          <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="inline-flex items-center px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Posts Card */}
          <div className="group relative bg-gradient-to-br from-blue-50 via-white to-blue-50/50 backdrop-blur-md rounded-3xl p-8 border border-blue-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{userStats.postsCount}</p>
                  <p className="text-sm font-medium text-gray-600 mt-1">Total Posts</p>
                  <p className="text-xs text-gray-500">Published articles</p>
                </div>
              </div>
              <div className="text-blue-500/20 group-hover:text-blue-500/30 transition-colors duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Views Card */}
          <div className="group relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 backdrop-blur-md rounded-3xl p-8 border border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">{userStats.viewsCount.toLocaleString()}</p>
                  <p className="text-sm font-medium text-gray-600 mt-1">Total Views</p>
                  <p className="text-xs text-gray-500">All-time engagement</p>
                </div>
              </div>
              <div className="text-emerald-500/20 group-hover:text-emerald-500/30 transition-colors duration-300">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Posts</h2>
            <Link
              to="/create"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200"
            >
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <div key={post.id} className={`border-b border-gray-200 last:border-b-0 pb-6 last:pb-0 transition-all duration-200 ${
                  deleteConfirm === post.id ? 'bg-red-50 border-red-200 rounded-lg p-4 -m-2' : ''
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4 flex-1">
                      {/* Cover Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                          <img 
                            src={post.coverImage} 
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      </div>
                      
                      {/* Post Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <Link 
                            to={`/blog/${post.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-primary-600 cursor-pointer truncate transition-colors"
                          >
                            {post.title}
                          </Link>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                            post.status === 'published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {post.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3 text-sm line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span>{post.publishedAt}</span>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {post.views}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    {isOwnProfile && (
                      <div className="ml-4 flex items-center space-x-2 flex-shrink-0">
                        <button 
                          onClick={() => handleEditPost(post.id)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit post"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        {deleteConfirm === post.id ? (
                          <div className="flex items-center space-x-1">
                            <span className="text-xs text-red-600 mr-2 font-medium">Delete this post?</span>
                            <button 
                              onClick={() => handleDeletePost(post.id)}
                              disabled={deleteLoading}
                              className="p-2 text-red-600 hover:text-red-700 transition-colors bg-red-100 hover:bg-red-200 rounded-full disabled:opacity-50"
                              title="Confirm delete"
                            >
                              {deleteLoading ? (
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                            <button 
                              onClick={cancelDelete}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full"
                              title="Cancel delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete post"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
