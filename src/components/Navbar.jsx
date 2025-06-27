// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, ShoppingCart, LogIn, LogOut, UserPlus, LayoutDashboard } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">TravelGo</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/">
            <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              <Home size={18} /> Home
            </button>
          </Link>
          <Link to="/cart">
            <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              <ShoppingCart size={18} /> Cart
            </button>
          </Link>
          {role === 'admin' && (
            <Link to="/admin">
              <button className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                <LayoutDashboard size={18} /> Admin
              </button>
            </Link>
          )}
          {token ? (
            <button onClick={handleLogout} className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  <LogIn size={18} /> Login
                </button>
              </Link>
              <Link to="/register">
                <button className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  <UserPlus size={18} /> Register
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 px-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <button className="w-full flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              <Home size={18} /> Home
            </button>
          </Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <button className="w-full flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              <ShoppingCart size={18} /> Cart
            </button>
          </Link>
          {role === 'admin' && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>
              <button className="w-full flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                <LayoutDashboard size={18} /> Admin
              </button>
            </Link>
          )}
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              <LogOut size={18} /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="w-full flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  <LogIn size={18} /> Login
                </button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button className="w-full flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  <UserPlus size={18} /> Register
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
