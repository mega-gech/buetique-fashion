import React from 'react';
import { ChevronRight } from 'lucide-react';

const Hero = () => {

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-primary" id="home">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
          alt="Fashion Model"
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
        <span className="block text-accent font-medium tracking-[0.2em] uppercase mb-4 reveal active">
          Discover the New Collection
        </span>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight reveal active" style={{ transitionDelay: '0.2s' }}>
          Elevate Your Style in Addis Ababa
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light reveal active" style={{ transitionDelay: '0.4s' }}>
          Curated luxury fashion for the modern Ethiopian. Experience elegance, quality, and timeless design in our exclusive boutique.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal active" style={{ transitionDelay: '0.6s' }}>
          <a
            href="#new-arrivals"
            onClick={(e) => scrollToSection(e, 'new-arrivals')}
            className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-medium tracking-wider uppercase hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center group"
          >
            Shop Now
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#location"
            onClick={(e) => scrollToSection(e, 'location')}
            className="w-full sm:w-auto px-8 py-4 border border-white text-white font-medium tracking-wider uppercase hover:bg-white/10 transition-all duration-300"
          >
            Visit Store
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center reveal active" style={{ transitionDelay: '1s' }}>
        <span className="text-white/70 text-xs tracking-[0.2em] uppercase mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[bounce_2s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
