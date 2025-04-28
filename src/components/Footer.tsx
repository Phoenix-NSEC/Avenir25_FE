

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,

} from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export default function Footer() {
  return (
    <footer className="relative border-t border-purple-900/50 bg-black text-white py-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-950/10 to-black pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
              AVENIR'25
            </h3>
            <p className="text-white/70 mb-2 text-sm md:text-base">
              Presented by Phoenix, The Official Tech Club of NSEC
            </p>

            <div className="flex flex-wrap space-x-4 justify-center md:justify-start">
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
                aria-label="Phoenix Squadron"
              >
                <CgWebsite size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className=" md:text-left sm:text-center">
            <h3 className="text-lg font-bold text-white mb-2 text-start ">
              Contact Us
            </h3>
            <div className="space-y-2 flex flex-col md:flex-row justify-between gap-10">
              <div className="flex items-start justify-center md:justify-start">
                <span className="text-purple-400 mr-2">📍</span>
                <span className="text-white/70 text-sm md:text-base">
                  Netaji Subhash Engineering College
                  <br />
                  Techno City, Garia, Kolkata - 700152
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center mb-2">
                  <span className="text-purple-400 mr-2">✉️</span>
                  <a
                    href="mailto:avenir@nsec.com"
                    className="text-white/70 hover:text-purple-400 transition-colors"
                  >
                    mail.avenirphoenix@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-purple-400 mr-2">✉️</span>
                  <a
                    href="mailto:avenir@nsec.com"
                    className="text-white/70 hover:text-purple-400 transition-colors"
                  >
                    mail.phoenixnsec@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center md:items-start md:justify-start space-y-2">
                <div className="flex items-center">
                  <span className="text-purple-400 mr-2">📞</span>
                  <a
                    href="tel:+919874673245"
                    className="text-white/70 hover:text-purple-400 transition-colors"
                  >
                    +91 98746 73245
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-purple-400 mr-2">📞</span>
                  <a
                    href="tel:+917908957844"
                    className="text-white/70 hover:text-purple-400 transition-colors"
                  >
                    +91 79089 57844
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="text-purple-400 mr-2">📞</span>
                  <a
                    href="tel:+916299602959"
                    className="text-white/70 hover:text-purple-400 transition-colors"
                  >
                    +91 6299 602 959
                  </a>
                </div>
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

