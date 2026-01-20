import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Model", href: "#model" },
    { label: "Team", href: "#team" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Khmer<span className="text-blue-600">NER</span>
              </h1>
              <p className="text-xs text-gray-500">Named Entity Recognition</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.href.startsWith("#") ?
                <a
                  key={item.label}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                  {item.label}
                </a>
              : <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm font-medium">
                  {item.label}
                </Link>,
            )}
            <Link
              to="/demo"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium">
              Try Demo
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ?
              <X className="h-6 w-6" />
            : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) =>
                item.href.startsWith("#") ?
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 py-2"
                    onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </a>
                : <Link
                    key={item.label}
                    to={item.href}
                    className="text-gray-700 hover:text-blue-600 py-2"
                    onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>,
              )}
              <Link
                to="/demo"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
                onClick={() => setIsMenuOpen(false)}>
                Try Demo
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
