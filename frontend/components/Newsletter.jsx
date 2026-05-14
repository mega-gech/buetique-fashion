import React, { useState } from 'react';
import API from "../services/axios"

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | 'loading'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await API.post('newsletter', {
         email 
      });

      const data = response.data;

      if (response.status === 201) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect. Please try again later.');
    }

    setTimeout(() => {
      setStatus(null);
      setMessage('');
    }, 5000);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="newsletter">
      <div className="absolute inset-0 bg-primary z-0">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white reveal">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Join Our Exclusive List</h2>
        <p className="text-gray-300 font-light mb-10 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive early access to new collections, exclusive event invitations, and style inspiration.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-grow px-6 py-4 bg-white/10 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white/20 transition-colors backdrop-blur-sm"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`px-8 py-4 font-medium uppercase tracking-wider transition-colors duration-300 sm:ml-4 mt-4 sm:mt-0 ${status === 'loading'
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-accent text-white hover:bg-white hover:text-primary'
              }`}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="mt-6 text-sm bg-green-500/20 border border-green-400/30 text-green-300 px-6 py-3 rounded-full inline-block">
            ✓ {message}
          </div>
        )}
        {status === 'error' && (
          <div className="mt-6 text-sm bg-red-500/20 border border-red-400/30 text-red-300 px-6 py-3 rounded-full inline-block">
            ✗  {message}
          </div>
        )}

        {!status && (
          <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest">
            We respect your privacy. No spam.
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
