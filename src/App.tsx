import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import BlogPage from './components/BlogPage';
import ArticlePage from './components/ArticlePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import { LanguageProvider } from './contexts/LanguageContext';

// --- Layout ---

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <Routes>
          {/* Redirect root to default language */}
          <Route path="/" element={<Navigate to="/fr" replace />} />
          
          {/* Language-prefixed routes */}
          <Route path="/:lang" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<ArticlePage />} />
          </Route>

          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/fr" replace />} />
        </Routes>
      </LanguageProvider>
    </Router>
  );
}
