import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import API from "../services/axios"
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear'];

const NewArrivals = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [likedItems, setLikedItems] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, setIsCartOpen } = useCart();

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const url = category && category !== 'All' 
        ? `products?category=${encodeURIComponent(category)}` 
        : 'products';
      const response = await API.get(url);
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 bg-white" id="new-arrivals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">New Arrivals</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Discover our latest collection featuring elegant designs, premium fabrics, and impeccable craftsmanship tailored for your sophisticated lifestyle.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 reveal">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
            <div 
              key={product._id || product.id} 
              className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] reveal"
              style={{transitionDelay: `${index * 0.1}s`}}
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay Actions */}
                <div 
                  className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 cursor-pointer"
                  onClick={() => navigate(`/product/${product._id || product.id}`)}
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${product._id || product.id}`); }} 
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 shadow-lg"
                    title="Quick View"
                  >
                    <Eye size={20} />
                  </button>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      const token = localStorage.getItem('token');
                      if (!token) {
                        // Store pending action and product info
                        const pendingItem = {
                          product,
                          size: 'One Size',
                          qty: 1,
                          action: 'add_to_cart'
                        };
                        localStorage.setItem('pending_cart_item', JSON.stringify(pendingItem));
                        // Redirect to login
                        navigate('/login', { state: { from: location.pathname } });
                        return;
                      }
                      addToCart(product, 'One Size', 1);
                      setIsCartOpen(true);
                    }} 
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors duration-300 transform translate-y-4 group-hover:translate-y-0 delay-75 shadow-lg"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={20} />
                  </button>
                  <button 
                    onClick={(e) => toggleLike(product._id || product.id, e)} 
                    className={`absolute top-4 right-4 transition-colors duration-300 ${likedItems[product._id || product.id] ? 'text-red-500' : 'text-white hover:text-red-500'}`}
                    title="Add to Wishlist"
                  >
                    <Heart size={24} className={likedItems[product._id || product.id] ? 'fill-current' : ''} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{product.category}</p>
                <h3 
                  onClick={() => navigate(`/product/${product._id || product.id}`)}
                  className="text-lg font-serif font-medium text-primary mb-2 group-hover:text-accent transition-colors duration-300 cursor-pointer"
                >
                  {product.name}
                </h3>
                <p className="text-primary font-semibold">{Number(product.price).toLocaleString()} ETB</p>
              </div>
            </div>
          ))}
        </div>
        )}
        
        <div className="mt-16 text-center reveal">
          <button 
            onClick={() => { handleCategoryChange('All'); document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-block px-10 py-4 border border-primary text-primary font-medium tracking-wider uppercase hover:bg-primary hover:text-white transition-colors duration-300"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
