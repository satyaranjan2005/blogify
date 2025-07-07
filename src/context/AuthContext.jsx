import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('auth_token');
      
      if (token) {
        try {
          // Set the authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Validate token and get fresh user data
          const response = await axios.get('http://localhost:5000/api/auth/me');
          
          setUser(response.data);
          setIsAuthenticated(true);
          
          // Update cookie with fresh user data
          Cookies.set('user_data', JSON.stringify(response.data), { expires: 7 });
          
        } catch (error) {
          console.error('Token validation failed:', error);
          // Token is invalid or expired, clear everything
          Cookies.remove('auth_token');
          Cookies.remove('user_data');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;
      
      // Store in cookies with security options
      Cookies.set('auth_token', token, { 
        expires: 7,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict'
      });
      Cookies.set('user_data', JSON.stringify(user), { 
        expires: 7,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict'
      });
      
      // Set user state
      setUser(user);
      setIsAuthenticated(true);
      
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true, user };
      
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password
      });

      const { token, user } = response.data;
      
      // Store in cookies with security options
      Cookies.set('auth_token', token, { 
        expires: 7,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict'
      });
      Cookies.set('user_data', JSON.stringify(user), { 
        expires: 7,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict'
      });
      
      // Set user state
      setUser(user);
      setIsAuthenticated(true);
      
      // Set default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true, user };
      
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  };

  const logout = () => {
    // Clear cookies
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
    
    // Clear axios default header
    delete axios.defaults.headers.common['Authorization'];
    
    // Clear user state
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (updatedUserData) => {
    try {
      const token = Cookies.get('auth_token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.put('http://localhost:5000/api/auth/profile', updatedUserData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const updatedUser = response.data;
      setUser(updatedUser);
      Cookies.set('user_data', JSON.stringify(updatedUser), { 
        expires: 7,
        secure: window.location.protocol === 'https:',
        sameSite: 'strict'
      });
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update user error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
