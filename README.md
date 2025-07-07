# 📝 Blogify

A modern, full-stack blogging platform built with React, Node.js, Express, and MongoDB. Create, share, and discover amazing stories with a beautiful, responsive interface.

![Blogify Banner](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=300&q=80)

## ✨ Features

### 🔐 Authentication & User Management
- **Secure Registration & Login** - JWT-based authentication with HTTP-only cookies
- **Profile Management** - Customizable user profiles with avatar uploads
- **Auto-login** - Persistent sessions with automatic token validation
- **Protected Routes** - Route protection for authenticated and unauthenticated users

### 📖 Blog Management
- **Rich Text Editor** - Create and edit blog posts with formatting
- **Image Uploads** - Cover image support with automatic compression
- **Draft & Publish** - Save drafts and publish when ready
- **Edit & Delete** - Full CRUD operations for your own posts
- **Categories** - Organize posts by categories

### 🎨 User Experience
- **Modern UI** - Beautiful, responsive design with Tailwind CSS
- **Search Functionality** - Find articles by title, content, or author
- **Category Filtering** - Browse posts by category
- **Pagination** - Efficient navigation through large collections
- **Mobile Responsive** - Perfect experience on all devices

### 📊 Analytics & Engagement
- **View Tracking** - Monitor post performance
- **User Statistics** - Track your posts and total views
- **Recent Posts** - Quick access to your latest articles

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server
- **js-cookie** - Cookie management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing

## 📁 Project Structure

```
blogify/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Auth, etc.)
│   │   └── App.jsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js backend API
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── server.js           # Express server setup
│   └── package.json        # Backend dependencies
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/satyaranjan2005/blogify.git
cd blogify
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/blogify
# JWT_SECRET=your_super_secret_jwt_key_here
# NODE_ENV=development

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Database Setup
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in backend/.env with your Atlas connection string
```

## 🔧 Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogify
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

## 🚀 Usage

### Starting the Application
1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Open Browser**: Navigate to `http://localhost:5173`

### Creating Your First Blog Post
1. **Register/Login** - Create an account or sign in
2. **Click "Write Article"** - Navigate to the post creation page
3. **Add Content** - Fill in title, content, and upload a cover image
4. **Publish** - Click publish to make your post live

### Managing Your Profile
1. **Go to Profile** - Click on your avatar in the navigation
2. **Edit Profile** - Click "Edit Profile" to update your information
3. **Upload Avatar** - Click the camera icon to upload a profile picture
4. **View Your Posts** - See all your published articles in the "Recent Posts" section

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Blogs
- `GET /api/blogs` - Get all blogs (with search & pagination)
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog (authenticated)
- `PUT /api/blogs/:id` - Update blog (authenticated)
- `DELETE /api/blogs/:id` - Delete blog (authenticated)

## 🎨 Key Features Explained

### Authentication System
- **JWT Tokens** stored in HTTP-only cookies for security
- **Auto-login** on page refresh using token validation
- **Route Protection** prevents unauthorized access
- **Secure Logout** clears tokens and redirects appropriately

### Blog Management
- **Rich Content** creation with image upload support
- **Image Compression** automatically optimizes uploaded images
- **Draft System** allows saving work in progress
- **Author Attribution** links posts to their creators

### User Experience
- **Responsive Design** works on desktop, tablet, and mobile
- **Search & Filter** find content quickly
- **Pagination** handles large amounts of content efficiently
- **Loading States** provide feedback during operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing frontend framework
- **Express.js** for the robust backend framework
- **MongoDB** for the flexible database solution
- **Tailwind CSS** for the beautiful styling system
- **Unsplash** for the high-quality stock images

## 📞 Support

If you have any questions or run into issues, please:
1. Check the existing [Issues](https://github.com/satyaranjan2005/blogify/issues)
2. Create a new issue with detailed information
3. Join our [Discord Community](https://discord.gg/blogify) for real-time help

---

**Built with ❤️ by [satyaranjan]**

*Happy Blogging! 🎉*
