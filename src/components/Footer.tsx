import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoenixSquadron,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative border-t border-purple-900/50 bg-black text-white py-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-950/10 to-black pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
              AVENIR'25
            </h3>
            <p className="text-white/70 mb-2">
              Presented by Phoenix, The Official Tech Club of NSEC
            </p>

            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="https://www.facebook.com/share/1BvM7Ws3vS/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-purple-400 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/phoenix_nsec/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-purple-400 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/phoenix-the-official-tech-club-of-netaji-subhash-engineering-college/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-purple-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://phoenixnsec.in/home"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-purple-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaPhoenixSquadron size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-2 text-center">
              Contact Us
            </h3>
            <div className="space-y-2 flex justify-between gap-10">
              <div className="flex items-start justify-center md:justify-start">
                <span className="text-purple-400 mr-2">📍</span>
                <span className="text-white/70">
                  Netaji Subhash Engineering College
                  <br />
                  Techno City, Garia, Kolkata - 700152
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <span className="text-purple-400 mr-2">✉️</span>
                <a
                  href="mailto:avenir@nsec.com"
                  className="text-white/70 hover:text-purple-400 transition-colors"
                >
                  avenir@nsec.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <span className="text-purple-400 mr-2">📞</span>
                <a
                  href="tel:+919876543210"
                  className="text-white/70 hover:text-purple-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 pt-4 border-t border-purple-900/30 flex justify-center items-center">
          <p className="text-white/60 text-sm text-center">
            &copy; {new Date().getFullYear()} Avenir | Phoenix | NSEC. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
