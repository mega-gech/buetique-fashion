import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import API from "../services/axios"
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMsg('');
    
    // Collect form data
    const formData = new FormData(e.target);
    const shipping = {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address: formData.get('address'),
      city: formData.get('city'),
      phone: formData.get('phone')
    };
    
    // Prepare items for backend (mapping _id to productId)
    const items = cartItems.map(item => ({
      productId: item._id,
      name: item.name,
      image: item.image,
      size: item.size,
      qty: item.qty,
      price: item.price
    }));
    
    try {
      const response = await API.post('checkout', {
          items,
          shipping,
        }
      );

      if (response.status === 201) {
        clearCart();
        setIsSuccess(true);
      } else {
        setErrorMsg(response.data?.message || 'Error processing checkout');
      }
      
    } catch (error) {
      const message =
      error.response?.data?.message || "Error processing checkout";
       setErrorMsg(message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-[#fafafa] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white p-12 rounded-lg shadow-sm max-w-lg w-full flex flex-col items-center">
          <CheckCircle size={64} className="text-green-500 mb-6" />
          <h2 className="text-3xl font-serif text-primary mb-4">Order Confirmed</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for shopping with Mega. Your luxurious pieces are being prepared and will be shipped to you shortly in Addis Ababa.
          </p>
          <button 
            onClick={() => navigate('/')} 
            className="px-8 py-3 bg-primary text-white font-medium uppercase tracking-wider hover:bg-accent transition-colors w-full"
          >
            Return to Boutique
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-[#fafafa] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-serif text-primary mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">You have no items in your shopping cart to checkout.</p>
        <Link to="/" className="px-8 py-3 bg-primary text-white font-medium uppercase tracking-wider hover:bg-accent transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-[#fafafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center px-4 py-2 bg-white text-sm text-primary hover:bg-accent hover:text-white transition-all duration-300 rounded-full font-medium tracking-wide shadow-sm hover:shadow-md">
            <ChevronLeft size={18} className="mr-1" /> Continue Shopping
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Checkout Form */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-3xl font-serif font-bold text-primary mb-8">Checkout</h1>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Shipping Information */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-medium text-primary mb-6 uppercase tracking-wider text-sm border-b pb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input name="email" required type="email" className="w-full p-3 border border-gray-300 rounded focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input name="firstName" required type="text" className="w-full p-3 border border-gray-300 rounded focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input name="lastName" required type="text" className="w-full p-3 border border-gray-300 rounded focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input name="address" required type="text" className="w-full p-3 border border-gray-300 rounded focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" placeholder="Street Address, Building, Apartment" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City / Sub-city</label>
                    <input name="city" required type="text" className="w-full p-3 border border-gray-300 rounded focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" defaultValue="Addis Ababa" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input name="phone" required type="tel" className="w-full p-3 border border-gray-300 rounded focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors" placeholder="+251 911 234 567" />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-medium text-primary mb-6 uppercase tracking-wider text-sm border-b pb-4">Payment Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border border-accent bg-accent/5 rounded-lg cursor-pointer transition-all">
                    <input type="radio" name="paymentMethod" value="cod" defaultChecked className="w-4 h-4 text-accent focus:ring-accent" />
                    <div className="ml-4">
                      <span className="block font-medium text-primary">Cash on Delivery</span>
                      <span className="block text-xs text-gray-500">Pay when your items arrive at your doorstep in Addis Ababa.</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-not-allowed opacity-60 transition-all">
                    <input type="radio" name="paymentMethod" value="telebirr" disabled className="w-4 h-4 text-gray-400" />
                    <div className="ml-4">
                      <span className="block font-medium text-gray-400">Telebirr (Coming Soon)</span>
                      <span className="block text-xs text-gray-400">Secure mobile payment for our Ethiopian customers.</span>
                    </div>
                  </label>
                </div>
              </div>
              {/* Action Button */}
              {errorMsg && <div className="p-4 bg-red-50 text-red-600 rounded border border-red-100">{errorMsg}</div>}
              <button 
                type="submit" 
                disabled={isProcessing}
                className={`w-full text-white py-4 font-medium uppercase tracking-wider transition-colors shadow-lg hover:shadow-xl flex justify-center items-center ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-accent'}`}
              >
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  `Place Order - ${cartTotal.toLocaleString()} ETB`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-xl font-medium text-primary mb-6 uppercase tracking-wider text-sm border-b pb-4">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.cartId} className="flex gap-4">
                    <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-serif font-medium text-primary line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 uppercase">Size: {item.size} | Qty: {item.qty}</p>
                      <p className="text-accent font-medium mt-1">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{cartTotal.toLocaleString()} ETB</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping (Addis Ababa)</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (15% VAT Included)</span>
                  <span>Calculated in price</span>
                </div>
                
                <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-2">
                  <span className="font-serif text-lg font-bold text-primary">Total</span>
                  <span className="font-serif text-2xl font-bold text-primary">{cartTotal.toLocaleString()} ETB</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
