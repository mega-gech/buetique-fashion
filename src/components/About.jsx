import React from 'react';

const About = () => {
  return (
    <section className="py-24 bg-[#fafafa]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Images */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 w-4/5 aspect-[3/4] overflow-hidden reveal">
              <img 
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop" 
                alt="Boutique Interior" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-1/4 right-0 w-3/5 aspect-square border-8 border-[#fafafa] z-20 overflow-hidden shadow-2xl reveal" style={{transitionDelay: '0.2s'}}>
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1fac084092?w=800&auto=format&fit=crop" 
                alt="Fashion Detail" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/10 rounded-full -z-10"></div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 lg:pl-10">
            <div className="reveal">
              <span className="text-accent text-sm font-medium tracking-[0.2em] uppercase mb-4 block">The Brand Story</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                Elegance Redefined in the Heart of Addis
              </h2>
              <p className="text-gray-600 mb-6 font-light leading-relaxed">
                Founded with a passion for timeless aesthetics, Mega brings curated luxury fashion to Addis Ababa. We believe that true style is an expression of individuality, blending classic silhouettes with contemporary design.
              </p>
              <p className="text-gray-600 mb-10 font-light leading-relaxed">
                Every piece in our collection is meticulously selected to ensure exceptional quality, luxurious feel, and impeccable elegance. Whether you are looking for the perfect evening gown or sophisticated everyday wear, our boutique offers a personalized shopping experience tailored to your unique taste.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="border-l-2 border-accent pl-4">
                  <h4 className="text-2xl font-serif font-bold text-primary mb-1">Curated</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Collections</p>
                </div>
                <div className="border-l-2 border-accent pl-4">
                  <h4 className="text-2xl font-serif font-bold text-primary mb-1">Premium</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Quality</p>
                </div>
              </div>

              <a 
                href="#about" 
                onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="inline-block px-8 py-3 border-b-2 border-primary text-primary font-medium tracking-wider uppercase hover:text-accent hover:border-accent transition-colors duration-300"
              >
                Read Our Story
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
