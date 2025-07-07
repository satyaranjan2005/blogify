# Blogify - Modern Blog Web Application

A beautiful, full-stack blog application built with React.js, Tailwind CSS, Node.js, Express.js, and MongoDB.

![Blogify Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=Blogify+Blog+Application)

## ✨ Features

- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ✍️ **Rich Content Editor** - Create and edit blog posts with ease
- 🔍 **Smart Search** - Find articles quickly with full-text search
- 🏷️ **Tag System** - Organize content with tags and categories
- ⭐ **Featured Posts** - Highlight your best content
- 📊 **Analytics** - View and like counters for posts
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS
- 🚀 **Fast Performance** - Optimized for speed and user experience

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router** - Declarative routing for React applications
- **Axios** - Promise-based HTTP client for API calls
- **Vite** - Next-generation frontend build tool

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework for Node.js
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - Elegant MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing library

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blogify.git
   cd blogify
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blogify
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

7. **Start the frontend development server**
   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```

8. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## 📁 Project Structure

```
blogify/
├── src/                    # Frontend React application
│   ├── components/         # Reusable React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── BlogCard.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── BlogPost.jsx
│   │   ├── CreatePost.jsx
│   │   ├── EditPost.jsx
│   │   └── About.jsx
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles with Tailwind
├── backend/               # Backend Node.js/Express application
│   ├── models/            # MongoDB models
│   │   ├── Blog.js
│   │   └── User.js
│   ├── routes/            # Express.js routes
│   │   ├── blogRoutes.js
│   │   └── authRoutes.js
│   ├── server.js          # Express server setup
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── public/                # Static assets
├── .github/               # GitHub specific files
│   └── copilot-instructions.md
├── package.json           # Frontend dependencies
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # Project documentation
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 📚 API Endpoints

### Blog Routes
- `GET /api/blogs` - Get all blogs with pagination and filtering
- `GET /api/blogs/:id` - Get a specific blog post
- `POST /api/blogs` - Create a new blog post
- `PUT /api/blogs/:id` - Update a blog post
- `DELETE /api/blogs/:id` - Delete a blog post
- `POST /api/blogs/:id/like` - Like a blog post
- `GET /api/blogs/featured` - Get featured blog posts
- `GET /api/blogs/meta/categories` - Get all categories

### Authentication Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:

1. **Modifying the Tailwind config** (`tailwind.config.js`)
2. **Updating component styles** in individual component files
3. **Adding custom CSS** in `src/index.css`

### Features
You can extend the application by:

1. **Adding new pages** in the `src/pages` directory
2. **Creating new components** in the `src/components` directory
3. **Extending the API** by adding new routes in the `backend/routes` directory
4. **Adding new database models** in the `backend/models` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing React library
- **Tailwind CSS** for the utility-first CSS framework
- **MongoDB** for the flexible NoSQL database
- **Express.js** for the fast web framework
- **Vite** for the lightning-fast build tool

## 📞 Support

If you have any questions or need help with setup, please open an issue in the GitHub repository.

---

**Happy Blogging with Blogify! 🎉**
