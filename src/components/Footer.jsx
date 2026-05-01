import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Camera, MessageCircle, Send } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (href === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-primary text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="/" onClick={(e) => handleNavClick(e, '/')} className="font-serif text-3xl font-bold tracking-wider text-white mb-6 inline-block">
              Mega<span className="text-accent">.</span>
            </a>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
              The premier destination for luxury fashion in Addis Ababa. Elevating your style with curated collections and exceptional service.
            </p>
            {/* Social Media Section */}
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent transition-all duration-300">
                <Camera size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent transition-all duration-300">
                <Users size={18} />
              </a>
              <a href="https://wa.me/251911234567" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent transition-all duration-300">
                <MessageCircle size={18} />
              </a>
              <a href="https://t.me/mega_addis" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent transition-all duration-300">
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li><a href="/" onClick={(e) => handleNavClick(e, '/')} className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="/#new-arrivals" onClick={(e) => handleNavClick(e, '/#new-arrivals')} className="hover:text-accent transition-colors">New Arrivals</a></li>
              <li><a href="/#about" onClick={(e) => handleNavClick(e, '/#about')} className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="/#location" onClick={(e) => handleNavClick(e, '/#location')} className="hover:text-accent transition-colors">Store Location</a></li>
              <li><a href="/#new-arrivals" onClick={(e) => handleNavClick(e, '/#new-arrivals')} className="hover:text-accent transition-colors">Collections</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Customer Care</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li><a href="/#location" onClick={(e) => handleNavClick(e, '/#location')} className="hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="tel:+251911234567" className="hover:text-accent transition-colors">Call: +251 911 234 567</a></li>
              <li><a href="mailto:info@mega-boutique.com" className="hover:text-accent transition-colors">Email Us</a></li>
              <li><a href="https://wa.me/251911234567" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">WhatsApp</a></li>
              <li><a href="/#newsletter" onClick={(e) => handleNavClick(e, '/#newsletter')} className="hover:text-accent transition-colors">Subscribe</a></li>
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Business Hours</h4>
            <ul className="space-y-3 text-sm text-gray-400 font-light">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span>9:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-light">
          <p>&copy; {new Date().getFullYear()} Mega Boutique Addis Ababa. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="mailto:info@mega-boutique.com" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="mailto:info@mega-boutique.com" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
