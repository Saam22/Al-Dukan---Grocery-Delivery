import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {ZapIcon,ArrowUpRightIcon,ChevronDownIcon,ShieldIcon, BikeIcon, SearchIcon, ShoppingCart, UserIcon,PackageIcon, MapPinIcon, LogOut, LayoutDashboard, Receipt, ChevronDown, XIcon, MenuIcon, Package } from "lucide-react";
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();   // ✅
  // const [cartOpen, setCartOpen] = useState(false);

  const navigate = useNavigate();
  const menuRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }


//   const user = null; // Replace with actual user 
    const user = {
        name: "Saad Mohamed",
        email: "Saad@example.com",
        isAdmin: true,
    };
  const handleLogout = () => {
    setUserMenuOpen(false);
    navigate("/login");
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
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-[1fr_1fr_1.4fr] items-center h-16">

          {/* Logo - أقصى الشمال */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800 shrink-0 justify-self-start">
            <BikeIcon className="w-6 h-6" />
            <span>Al-Dukkan</span>
          </Link>

          {/* Middle Section - في نص الشاشة بالظبط */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 justify-self-center">
            <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-orange-500 transition-colors">Products</Link>
            <Link to="/deals" className="text-orange-500 font-semibold">Deals</Link>
          </div>

          {/* Right Section: Search + Cart + User */}
          <div className="flex items-center justify-between gap-4">

            {/* Search - أصغر، وأقرب للنص/Deals */}
            <form onSubmit={handleSearch} className="hidden sm:flex w-40 lg:w-52">
              <div className="relative w-full">
                <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                    }
                  }}
                  className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-all"
                />
              </div>
            </form>

            <div className="flex items-center gap-2">

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
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

                {/* User Menu */}
                <div className="relative">
                {user ? (
                    <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-2 p-2">
                    <div className="size-7 rounded-full bg-green-950 text-white flex items-center justify-center font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <ChevronDownIcon className="size-3 text-zinc-500" />
                    </button>
                ) : (
                    <div className="flex items-center gap-2">
                    <Link
                        to="/login"
                        className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-950 rounded-full hover:bg-green-900 transition-colors"
                    >
                        <UserIcon size={16} />
                        Sign In
                    </Link>
                    {userMenuOpen ? (
                        <XIcon className="md:hidden" onClick={() => setUserMenuOpen(!userMenuOpen)} />
                    ) : (
                        <MenuIcon className="md:hidden" onClick={() => setUserMenuOpen(!userMenuOpen)} />
                    )}
                    </div>
                )}

                {userMenuOpen && (
                    <>
                    <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border border-app-border py-2 z-50 animate-fade-in">
                        {user && (
                        <div className="px-4 py-2 border-b border-app-border">
                            <p className="text-sm font-medium text-zinc-900">{user.name}</p>
                            <p className="text-xs text-zinc-500">{user.email}</p>
                        </div>
                        )}

                        <div onClick={() => setUserMenuOpen(false)} className="flex flex-col">
                        {!user && (
                            <Link to="/login" className="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-app-green/5 transition-colors">
                            <UserIcon size={16} />
                            Sign In
                            </Link>
                        )}

                        {user && (
                            <Link to="/myorders" className="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-app-green/5 transition-colors">
                            <PackageIcon size={16} />
                            My Orders
                            </Link>
                        )}

                        {user && (
                            <Link to="/addresses" className="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-app-green/5 transition-colors">
                            <MapPinIcon size={16} />
                            Addresses
                            </Link>
                        )}

                        <Link to="/products" className="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-app-green/5 transition-colors">
                            <ArrowUpRightIcon size={16} />
                            Products
                        </Link>

                        <Link to="/deals" className="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-app-green/5 transition-colors">
                            <ZapIcon size={16} />
                            Deals
                        </Link>

                        {user?.isAdmin && (
                            <Link to="/admin/products" className="dropdown-item flex items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-app-green/5 transition-colors">
                            <ShieldIcon className="text-app-orange-dark" size={16} />
                            <span className="text-app-orange-dark">Admin Panel</span>
                            </Link>
                        )}

                        {user && (
                            <div className="border-t border-app-border pt-1">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-app-error hover:bg-red-50 w-full transition-colors"
                            >
                                <LogOut  size={16} />
                                Logout
                            </button>
                            </div>
                        )}
                        </div>
                    </div>
                    </>
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;