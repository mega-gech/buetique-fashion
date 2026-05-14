import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const Location = () => {
  return (
    <section className="py-24 bg-white relative" id="location">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Visit Our Boutique</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Experience our collection in person. Our style consultants are ready to help you find the perfect piece for any occasion.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch h-full">
          {/* Map Container */}
          <div className="w-full lg:w-2/3 h-[400px] lg:h-[500px] bg-gray-200 rounded-lg overflow-hidden relative reveal">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.11521743605!2d38.68364177531405!3d9.010793400000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1714415848281!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Boutique Location"
              className="absolute inset-0 grayscale contrast-125 opacity-90"
            ></iframe>
          </div>

          {/* Info Card */}
          <div className="w-full lg:w-1/3 bg-primary text-white p-10 rounded-lg shadow-xl flex flex-col justify-center reveal" style={{ transitionDelay: '0.2s' }}>
            <h3 className="text-2xl font-serif font-bold mb-8 text-accent">Store Information</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="text-accent flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Address</h4>
                  <p className="text-gray-300 font-light leading-relaxed">
                    Bole Medhanialem Area,<br />
                    Namibia St, Block 4<br />
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="text-accent flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Contact</h4>
                  <p className="text-gray-300 font-light">+251 911 234 567</p>
                  <p className="text-gray-300 font-light">info@mega-addis.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="text-accent flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-lg mb-1">Opening Hours</h4>
                  <p className="text-gray-300 font-light">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-gray-300 font-light">Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/20 flex flex-col gap-4">
              <a
                href="https://maps.google.com/?q=Bole+Medhanialem,Addis+Ababa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-accent text-white font-medium uppercase tracking-wider hover:bg-accent/80 transition-colors flex items-center justify-center space-x-2"
              >
                <Navigation size={18} />
                <span>Get Directions</span>
              </a>
              <a
                href="tel:+251911234567"
                className="w-full py-3 border border-white text-white font-medium uppercase tracking-wider hover:bg-white hover:text-primary transition-colors flex items-center justify-center space-x-2"
              >
                <Phone size={18} />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
