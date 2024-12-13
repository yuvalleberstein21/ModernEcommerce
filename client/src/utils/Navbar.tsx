import { useState } from 'react';
import { ShoppingCart, Menu, X, User, Search, Heart } from 'lucide-react';
import Login from '../pages/Login';
import { useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';

const Navbar = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart?.cartItems);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Products', href: '/products' },
    { name: 'Deals', href: '/deals' },
    { name: 'Contact', href: '/contact' },
  ];
  return (
    <header>
      <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-800">
                DESIGN.YL
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Profile and Cart Always Visible */}
            <div className="flex items-center space-x-4">
              <a
                href="/favorites"
                className="text-gray-700 hover:text-blue-600"
              >
                <Heart size={24} />
              </a>
              <a
                href="/cart"
                className="relative text-gray-700 hover:text-blue-600"
              >
                <ShoppingCart size={24} />
                {/* Cart Badge */}
                <span
                  className="absolute -top-2 -right-2 bg-red-500 text-white 
                rounded-full w-5 h-5 flex items-center justify-center 
                text-xs font-bold"
                >
                  {totalQuantity}
                </span>
              </a>

              <span
                onClick={openModal}
                className="text-gray-700 hover:text-blue-600"
              >
                <User size={24} />
              </span>
              {isModalOpen && <Login onClose={closeModal} />}

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                    <Search
                      className="absolute right-3 top-3 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
