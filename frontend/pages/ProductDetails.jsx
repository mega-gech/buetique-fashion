import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart, ChevronLeft, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import API from "../services/axios"

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, setIsCartOpen } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Scroll to top and fetch product
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setLoading(true);
      console.log("PRODUCT ID:", id);
      try {
        const response = await API.get(`products/${id}`);
        if (response.status === 200) {
          const data = response.data;
          setProduct(data);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error.response?.data?.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif text-primary mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">The product you are looking for does not exist or has been removed.</p>
        <Link to="/" className="px-8 py-3 bg-primary text-white font-medium uppercase tracking-wider hover:bg-accent transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center px-5 py-2.5 bg-gray-100 text-sm text-primary hover:bg-accent hover:text-white transition-all duration-300 rounded-full font-medium tracking-wide shadow-sm hover:shadow-md">
            <ChevronLeft size={18} className="mr-1" /> Back to Home
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden rounded-lg">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center" />
            </div>
            {/* Thumbnail placeholders */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((thumb) => (
                <div key={thumb} className={`aspect-[3/4] bg-gray-100 rounded cursor-pointer overflow-hidden border-2 ${thumb === 1 ? 'border-accent' : 'border-transparent'}`}>
                  <img src={product.image} alt={`${product.name} view ${thumb}`} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col">
            <span className="text-accent text-sm font-medium tracking-[0.2em] uppercase mb-2">{product.category}</span>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-4 leading-tight">{product.name}</h1>
            <p className="text-2xl text-gray-600 font-medium mb-8">{Number(product.price).toLocaleString()} ETB</p>

            <div className="prose text-gray-500 font-light mb-10 leading-relaxed">
              <p>
                Experience the epitome of luxury with this beautifully crafted piece. Designed for the modern elegant lifestyle, it combines premium materials with timeless aesthetics. Perfect for any sophisticated occasion in Addis Ababa or beyond.
              </p>
              <ul className="mt-4 space-y-2 list-disc pl-5">
                <li>Premium imported fabric</li>
                <li>Tailored fit for a flattering silhouette</li>
                <li>Dry clean only</li>
                <li>Made with impeccable craftsmanship</li>
              </ul>
            </div>

            {/* Selectors */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-primary">Size</span>
                <a href="#" className="text-sm text-gray-500 underline hover:text-accent">Size Guide</a>
              </div>
              <div className="flex gap-3">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border rounded flex items-center justify-center transition-colors focus:outline-none ${
                      selectedSize === size 
                        ? 'border-accent bg-accent text-white shadow-md' 
                        : 'border-gray-300 text-primary hover:border-primary hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8">
              <div className="flex-1 flex flex-col gap-2">
                <button 
                  onClick={() => {
                    if (!selectedSize) {
                      setErrorMsg('Please select a size first.');
                      setTimeout(() => setErrorMsg(''), 3000);
                      return;
                    }
                    
                    const token = localStorage.getItem('token');
                    if (!token) {
                      // Store pending action and product info
                      const pendingItem = {
                        product,
                        size: selectedSize,
                        qty: 1,
                        action: 'add_to_cart'
                      };
                      localStorage.setItem('pending_cart_item', JSON.stringify(pendingItem));
                      // Redirect to login
                      navigate('/login', { state: { from: location.pathname } });
                      return;
                    }

                    addToCart(product, selectedSize, 1);
                    setIsCartOpen(true);
                  }}
                  className="w-full bg-primary text-white py-4 font-medium uppercase tracking-wider hover:bg-accent transition-colors flex justify-center items-center gap-2"
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
                {errorMsg && <p className="text-red-500 text-sm font-medium">{errorMsg}</p>}
              </div>
              
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`w-14 h-14 shrink-0 border flex items-center justify-center transition-colors rounded ${
                  isLiked ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-500'
                }`}
              >
                <Heart size={24} className={isLiked ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <Truck className="text-accent mb-2" size={24} />
                <span className="text-sm font-medium text-primary">Fast Delivery</span>
                <span className="text-xs text-gray-500">Within Addis Ababa</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="text-accent mb-2" size={24} />
                <span className="text-sm font-medium text-primary">Secure Payment</span>
                <span className="text-xs text-gray-500">100% Safe Checkout</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw className="text-accent mb-2" size={24} />
                <span className="text-sm font-medium text-primary">Easy Returns</span>
                <span className="text-xs text-gray-500">30 Day Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
