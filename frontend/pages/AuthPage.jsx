import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Globe
} from 'lucide-react';

/**
 * Premium Ecommerce Login Component
 * 
 * A production-ready, minimalist login page tailored for high-end fashion brands.
 * Features:
 * - Responsive design (Mobile, Tablet, Desktop)
 * - Controlled inputs with real-time validation
 * - Password visibility toggle
 * - Elegant loading and error states
 * - Accessibility (ARIA labels, focus management)
 * - Social authentication UI
 */
const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();
  
  // Form State
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Input change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Blur handler for validation
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  // Field validation logic
  const validateField = (name, value) => {
    let error = '';
    if (name === 'email') {
      if (!value) error = 'Email address is required';
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        error = 'Please enter a valid email address';
      }
    }
    if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 8) error = 'Password must be at least 8 characters';
    }
    
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation check
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);
    
    if (emailError || passwordError) {
      // Set all fields to touched to show validation errors
      setTouched({ email: true, password: true });
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    // Simulate API authentication call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      
      // Store dummy token as requested
      localStorage.setItem('boutique_token', 'dummy-token-12345');
      
      // Check for pending cart actions
      const pendingItemStr = localStorage.getItem('pending_cart_item');
      
      if (pendingItemStr) {
        const pendingItem = JSON.parse(pendingItemStr);
        if (pendingItem.action === 'add_to_cart') {
          // Automatically add to cart
          addToCart(pendingItem.product, pendingItem.size, pendingItem.qty);
          // Clear the pending item
          localStorage.removeItem('pending_cart_item');
          // Redirect to shopping page (home) as per user request
          navigate('/');
          return;
        }
      }

      // Default redirection if no pending item
      const from = location.state?.from || '/';
      navigate(from);
      
      console.log('Authentication Successful', formData);
    } catch (err) {
      setErrors({ form: 'The email or password you entered is incorrect.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased text-stone-900">
      {/* Background Subtle Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-stone-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-stone-200/40 rounded-full blur-[120px]" />
      </div>

      <div 
        className={`w-full max-w-md relative z-10 transition-all duration-1000 ease-out transform ${
          isMounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        {/* Brand/Logo Area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm border border-stone-100 mb-6 group hover:scale-105 transition-transform duration-300">
            <span className="text-2xl font-serif font-bold tracking-tighter text-stone-900">L.</span>
          </div>
          <h1 className="text-3xl font-serif font-medium tracking-tight text-stone-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-stone-500 font-medium text-sm">
            Sign in to continue your curated shopping experience.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-stone-100 p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Form-level Error Message */}
            {errors.form && (
              <div role="alert" className="bg-red-50/80 backdrop-blur-sm text-red-600 p-4 rounded-2xl text-sm font-medium flex items-center gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{errors.form}</p>
              </div>
            )}

            {/* Email Input Field */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-xs font-bold uppercase tracking-widest text-stone-400 ml-1"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-900 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@email.com"
                  className={`block w-full pl-11 pr-4 py-4 bg-stone-50/50 border border-stone-100 rounded-2xl text-stone-900 placeholder-stone-400 focus:ring-4 focus:ring-stone-900/5 focus:border-stone-900 focus:bg-white transition-all duration-300 outline-none text-[15px] ${
                    errors.email && touched.email ? 'border-red-300 bg-red-50/30' : ''
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {touched.email && !errors.email && formData.email && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-emerald-500 animate-in fade-in zoom-in">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
              {errors.email && touched.email && (
                <p id="email-error" className="text-xs font-semibold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label 
                  htmlFor="password" 
                  className="block text-xs font-bold uppercase tracking-widest text-stone-400"
                >
                  Password
                </label>
                <a 
                  href="#forgot" 
                  className="text-xs font-bold text-stone-500 hover:text-stone-900 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400 group-focus-within:text-stone-900 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className={`block w-full pl-11 pr-12 py-4 bg-stone-50/50 border border-stone-100 rounded-2xl text-stone-900 placeholder-stone-400 focus:ring-4 focus:ring-stone-900/5 focus:border-stone-900 focus:bg-white transition-all duration-300 outline-none text-[15px] ${
                    errors.password && touched.password ? 'border-red-300 bg-red-50/30' : ''
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-900 transition-colors outline-none focus:text-stone-900"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && touched.password && (
                <p id="password-error" className="text-xs font-semibold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center ml-1">
              <div className="relative flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="peer h-5 w-5 opacity-0 absolute cursor-pointer"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <div className="h-5 w-5 bg-stone-100 border border-stone-200 rounded-lg flex items-center justify-center transition-all peer-checked:bg-stone-900 peer-checked:border-stone-900 peer-focus:ring-2 peer-focus:ring-stone-900/10">
                  <div className={`w-2 h-2 bg-white rounded-full transition-all ${formData.rememberMe ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                </div>
                <label 
                  htmlFor="rememberMe" 
                  className="ml-3 block text-sm font-medium text-stone-500 cursor-pointer select-none hover:text-stone-700 transition-colors"
                >
                  Keep me signed in
                </label>
              </div>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-4.5 px-6 bg-stone-900 text-white rounded-[1.25rem] font-bold text-sm tracking-widest uppercase overflow-hidden group transition-all duration-300 hover:bg-black hover:shadow-xl active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <span className={`inline-flex items-center justify-center gap-2 transition-all duration-300 ${isLoading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </div>
              )}
            </button>

            {/* Divider with Text */}
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-stone-100"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-[10px] font-black tracking-[0.2em] text-stone-300 uppercase">
                  Secure Access
                </span>
              </div>
            </div>

            {/* Social Authentication Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-stone-100 rounded-2xl font-bold text-xs text-stone-700 hover:bg-stone-50 hover:border-stone-200 transition-all duration-200 active:scale-[0.97]"
              >
                <Globe className="w-4 h-4" />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-3 py-3.5 px-4 bg-white border border-stone-100 rounded-2xl font-bold text-xs text-stone-700 hover:bg-stone-50 hover:border-stone-200 transition-all duration-200 active:scale-[0.97]"
              >
                <Globe className="w-4 h-4" />
                <span>Apple</span>
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-stone-400">
              New to the Atelier?{' '}
              <a 
                href="#signup" 
                className="text-stone-900 font-bold hover:underline underline-offset-8 decoration-2 transition-all"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>

        {/* Branding/Legal Footer */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-stone-300 font-bold tracking-[0.3em] uppercase">
            &copy; 2026 LUMIÈRE ATELIER &bull; Paris &bull; London &bull; NYC
          </p>
        </div>
      </div>

      {/* Global Style Injector for Custom Animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-5px); }
          40% { transform: translateX(5px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        /* Custom Padding Utility */
        .py-4\.5 {
          padding-top: 1.125rem;
          padding-bottom: 1.125rem;
        }

        /* Subtle Fade In Animation */
        .animate-in {
          animation-duration: 400ms;
          animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          animation-fill-mode: forwards;
        }
        .fade-in { animation-name: fadeIn; }
        .slide-in-from-top-1 { animation-name: slideInTop; }
        .zoom-in { animation-name: zoomIn; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInTop { from { transform: translateY(-4px); } to { transform: translateY(0); } }
        @keyframes zoomIn { from { transform: scale(0.95); } to { transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default AuthPage;
