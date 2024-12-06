import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">ShopNow</h3>
          <p className="text-gray-600 text-sm">
            Your one-stop destination for quality products and exceptional
            shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-700">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Shop
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-700">Customer Service</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Shipping
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Returns
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter and Social */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-700">Stay Connected</h4>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-600">
          © 2024 YUVAL.LEBERSTEIN. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
