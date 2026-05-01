import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
  
  const navigate = useNavigate();
  const location = useLocation();

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modals are open
  useEffect(() => {
    if (isSearchOpen || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen, isCartOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'New Arrivals', href: '/#new-arrivals' },
    { name: 'About Us', href: '/#about' },
    { name: 'Location', href: '/#location' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // For hash links like /#new-arrivals
    if (href.startsWith('/#')) {
      const sectionId = href.replace('/#', '');
      
      if (location.pathname === '/') {
        // Already on home — just scroll
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate home first, then scroll after a brief delay
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" onClick={(e) => handleNavClick(e, '/')} className="font-serif text-2xl font-bold tracking-wider text-primary">
                Mega<span className="text-accent">.</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium tracking-wide text-primary hover:text-accent transition-colors duration-300 uppercase"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => setIsSearchOpen(true)} className="text-primary hover:text-accent transition-colors">
                <Search size={20} />
              </button>
              <button onClick={() => setIsCartOpen(true)} className="text-primary hover:text-accent transition-colors relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button onClick={() => setIsCartOpen(true)} className="text-primary relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-primary focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[400px] opacity-100 py-4' : 'max-h-0 opacity-0 overflow-hidden py-0'}`}>
          <div className="flex flex-col space-y-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-base font-medium text-primary hover:text-accent uppercase tracking-wide py-2 border-b border-gray-100 last:border-0"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }} className="flex items-center space-x-2 text-primary hover:text-accent w-full py-2">
                <Search size={20} />
                <span className="font-medium uppercase tracking-wide">Search</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm transition-all duration-500 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="absolute top-8 right-8 text-primary hover:text-accent transition-colors">
          <X size={32} />
        </button>
        <div className="w-full max-w-3xl px-4 flex flex-col max-h-[90vh]">
          <h2 className="text-3xl font-serif text-center mb-8 shrink-0">What are you looking for?</h2>
          <div className="relative shrink-0">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for dresses, accessories, etc." 
              className="w-full text-xl font-light py-4 border-b-2 border-gray-300 focus:outline-none focus:border-accent bg-transparent placeholder-gray-400"
              autoFocus={isSearchOpen}
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:text-accent transition-colors">
              <Search size={28} />
            </button>
          </div>
          
          {/* Live Search Results */}
          <div className="mt-8 overflow-y-auto grow">
            {searchQuery && searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-8">
                {searchResults.map(product => (
                  <div key={product.id} className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer" onClick={() => { 
                    setIsSearchOpen(false); 
                    setSearchQuery(''); 
                    navigate(`/product/${product.id}`); 
                  }}>
                    <div className="w-20 h-28 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{product.category}</p>
                      <h3 className="text-lg font-serif text-primary mb-1">{product.name}</h3>
                      <p className="text-accent font-medium">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-10 text-gray-500 font-light">
                No products found matching "{searchQuery}"
              </div>
            ) : (
              <div className="flex gap-4 justify-center flex-wrap text-sm font-light text-gray-500">
                <span>Popular:</span>
                <button onClick={() => setSearchQuery('Dress')} className="hover:text-accent transition-colors">Dresses</button>
                <button onClick={() => setSearchQuery('Coat')} className="hover:text-accent transition-colors">Outerwear</button>
                <button onClick={() => setSearchQuery('Skirt')} className="hover:text-accent transition-colors">Bottoms</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsCartOpen(false)}>
        <div 
          className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-in-out transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-2xl font-serif font-medium">Shopping Cart ({cartCount})</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-primary transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <ShoppingBag size={48} className="mb-4 text-gray-300" />
                <p>Your cart is empty.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cartId} className="flex gap-4">
                  <div 
                    className="w-24 h-32 flex-shrink-0 overflow-hidden bg-gray-100 rounded-sm cursor-pointer"
                    onClick={() => { setIsCartOpen(false); navigate(`/product/${item.id}`); }}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h3 
                          className="font-serif font-medium text-lg text-primary cursor-pointer hover:text-accent transition-colors"
                          onClick={() => { setIsCartOpen(false); navigate(`/product/${item.id}`); }}
                        >
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 uppercase">Size: {item.size}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-accent font-semibold mt-1">{item.price}</p>
                    <div className="mt-auto flex items-center border border-gray-200 w-fit rounded-sm">
                      <button onClick={() => updateQuantity(item.cartId, -1)} className="px-3 py-1 text-gray-500 hover:text-primary transition-colors">-</button>
                      <span className="px-3 py-1 text-sm">{item.qty}</span>
                      <button onClick={() => updateQuantity(item.cartId, 1)} className="px-3 py-1 text-gray-500 hover:text-primary transition-colors">+</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif text-lg text-gray-600">Subtotal</span>
              <span className="font-serif text-2xl font-bold text-primary">{cartTotal.toLocaleString()} ETB</span>
            </div>
            <p className="text-sm text-gray-500 mb-6 font-light">Taxes and shipping calculated at checkout.</p>
            <button 
              onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}
              disabled={cartCount === 0}
              className={`w-full py-4 font-medium uppercase tracking-wider transition-colors flex justify-center items-center gap-2 group ${cartCount === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-primary text-white hover:bg-accent'}`}
            >
              Checkout 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
