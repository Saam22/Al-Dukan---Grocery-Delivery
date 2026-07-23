import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BikeIcon, SearchIcon, ShoppingCart, User, LogOut, LayoutDashboard, Receipt, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(5);
  const [cartOpen, setCartOpen] = useState(false);
  
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const user = {
    name: "Saad Mohamed",
    email: "saad@example.com",
    isAdmin: true,
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800 shrink-0">
            <BikeIcon className="w-6 h-6 text-orange-500" />
            <span>Al-Dukan</span>
          </Link>

          {/* Middle Section */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-orange-500 transition-colors">Products</Link>
            <Link to="/deals" className="text-orange-500 font-semibold">Deals</Link>
          </div>

          {/* Search */}
          <form className="hidden sm:flex flex-1 max-w-md">
            <div className="relative w-full">
              <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all"
              />
            </div>
          </form>

          {/* Right Section - Enhanced */}
          <div className="flex items-center gap-2">
            
            {/* Cart Button - Improved */}
            <button 
              onClick={() => setCartOpen(true)} 
              className="relative p-2.5 rounded-full hover:bg-orange-50 transition-all duration-200 group"
              aria-label="Open shopping cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[10px] font-bold min-w-[1.25rem] h-5 px-1.5 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* User Menu - Enhanced */}
            <div ref={menuRef} className="relative">
              {user ? (
                <>
                  <button 
                    onClick={() => setUserMenuOpen(!userMenuOpen)} 
                    className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 ${
                      userMenuOpen 
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' 
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium">
                      {user.name}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Menu - Enhanced */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      {/* User Info Header */}
                      <div className="px-4 py-4 bg-gradient-to-r from-orange-50 to-white border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                            {user.isAdmin && (
                              <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full">
                                Admin
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link 
                          to="/profile" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </Link>
                        
                        <Link 
                          to="/orders" 
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          <Receipt className="w-4 h-4" />
                          My Orders
                        </Link>

                        {user.isAdmin && (
                          <Link 
                            to="/admin/dashboard" 
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors border-t border-gray-100"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                          </Link>
                        )}

                        <button 
                          onClick={handleLogout} 
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-200 hover:scale-105 active:scale-95 text-sm font-medium"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;