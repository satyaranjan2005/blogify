import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BlogPost from './pages/BlogPost';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import About from './pages/About';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRedirect from './components/AuthRedirect';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={(
                <>
                  <Header />
                  <BlogPost />
                </>
              )} />
              <Route path="/create" element={(
                <ProtectedRoute>
                  <Header />
                  <CreatePost />
                </ProtectedRoute>
              )} />
              <Route path="/edit/:id" element={(
                <ProtectedRoute>
                  <Header />
                  <EditPost />
                </ProtectedRoute>
              )} />
              <Route path="/about" element={(
                <>
                  <Header />
                  <About />
                </>
              )} />
              <Route path="/login" element={(
                <AuthRedirect>
                  <Login />
                </AuthRedirect>
              )} />
              <Route path="/register" element={(
                <AuthRedirect>
                  <Register />
                </AuthRedirect>
              )} />
              <Route path="/profile" element={(
                <ProtectedRoute>
                  <Header />
                  <Profile />
                </ProtectedRoute>
              )} />
              <Route path="/profile/:userId" element={(
                <>
                  <Header />
                  <Profile />
                </>
              )} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
