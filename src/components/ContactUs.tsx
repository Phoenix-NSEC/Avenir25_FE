export default function ContactUs() {
  return (
    <footer className="relative border-t border-purple-900/50 bg-black text-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-950/10 to-black pointer-events-none" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
              AVENIR
            </h3>
            <p className="text-white/70 mb-4">
              NSEC's premier technical festival where magic meets technology for an unforgettable experience.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Instagram', 'GitHub'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-white/70 hover:text-purple-400 transition-colors"
                  aria-label={social}
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {["Home", "Events", "About", "Sponsors", "Schedule", "FAQ"].map((link) => (
                <a 
                  key={link} 
                  href="#" 
                  className="text-white/70 hover:text-purple-400 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-purple-400 mr-2">📍</span>
                <span className="text-white/70">
                  Netaji Subhash Engineering College
                  <br />
                  Techno City, Garia, Kolkata - 700152
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 mr-2">✉️</span>
                <a href="mailto:avenir@nsec.com" className="text-white/70 hover:text-purple-400 transition-colors">
                  avenir@nsec.com
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-purple-400 mr-2">📞</span>
                <a href="tel:+919876543210" className="text-white/70 hover:text-purple-400 transition-colors">
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-white/70 mb-3">Subscribe to our newsletter for the latest updates.</p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-black/50 border border-purple-900/50 text-white p-2 rounded"
              />
              <button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white p-2 rounded">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-purple-900/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Avenir | NSEC's Tech Fest. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Code of Conduct"].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-white/60 hover:text-purple-400 text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}