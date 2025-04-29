import { useState, useEffect } from "react"
import { FaFacebook, FaInstagram, FaLinkedin, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa"
import { CgWebsite } from "react-icons/cg"
import { motion } from "framer-motion"

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-purple-900/50 bg-black text-white py-10 overflow-hidden md:px-10">
      {/* Enhanced background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-purple-950/20 to-black opacity-80 pointer-events-none" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500/10 blur-xl animate-float"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              opacity: Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500" />
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          {/* Brand Section - Enhanced with animations and logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3 text-left"
          >

            <h3 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 mb-4">
              AVENIR'25
            </h3>

            {/* Brand logos row */}
            <div className="flex items-center space-x-4 mb-6">
              {/* Phoenix logo */}
              <motion.img
                src="https://scontent.fccu4-3.fna.fbcdn.net/v/t39.30808-6/261065045_4317968181646869_7909860385254315985_n.png?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=QRII1Tjq1jkQ7kNvwGCHW2b&_nc_oc=Adk0D2V49tAFLzGLSzBojhZ7OiXDrNDGW6exYBFnVHiw3M_z72cswHEx0VrJ34DKidtiKlkW-2YnmG6AXIfKb8HB&_nc_zt=23&_nc_ht=scontent.fccu4-3.fna&_nc_gid=7nNPbaxuA3zep_Tjo4G8Dg&oh=00_AfGtwoUcW_PBOaDXKQyDWzBWKyfhX8tstYr6oVgJwzYs9g&oe=6816406C"
                alt="Phoenix Logo"
                className="h-12 w-auto rounded-3xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              {/* College logo */}
              <motion.img
                src="https://images.shiksha.com/mediadata/images/1626242104phpBTnz7j.jpeg"
                alt="NSEC Logo"
                className="h-12 w-auto rounded-3xl"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <p className="text-white/80 mb-6 text-sm md:text-base max-w-md leading-relaxed">
              Presented by Phoenix, The Official Tech Club of NSEC
            </p>

            <div className="flex space-x-6 justify-start">
              {[
                { icon: FaFacebook, href: "https://www.facebook.com/share/1BvM7Ws3vS/", label: "Facebook" },
                { icon: FaInstagram, href: "https://www.instagram.com/phoenix_nsec/", label: "Instagram" },
                {
                  icon: FaLinkedin,
                  href: "https://www.linkedin.com/company/phoenix-the-official-tech-club-of-netaji-subhash-engineering-college/",
                  label: "LinkedIn",
                },
                { icon: CgWebsite, href: "https://phoenixnsec.in/", label: "Website" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-purple-400 transition-all duration-300 transform relative group"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  {/* Hover glow effect */}
                  <span className="absolute -inset-2 bg-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></span>
                  <social.icon size={24} className="relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info Section - Enhanced with animations and better layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-2/3"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Address Section */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="text-left"
              >
                <h4 className="text-purple-400 font-medium text-lg mb-4 flex items-center">
                  <div className="p-2 bg-purple-900/30 rounded-full mr-3">
                    <FaMapMarkerAlt className="text-purple-300" />
                  </div>
                  <span>Our Location</span>
                </h4>
                <div className="group pl-10">
                  <div className="text-white/80 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-300 border-l-2 border-purple-500/30 pl-3">
                    Netaji Subhash Engineering College
                    <br />
                    Techno City, Garia
                    <br />
                    Kolkata - 700152
                  </div>
                </div>
              </motion.div>

              {/* Email Section */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-left"
              >
                <h4 className="text-purple-400 font-medium text-lg mb-4 flex items-center">
                  <div className="p-2 bg-purple-900/30 rounded-full mr-3">
                    <FaEnvelope className="text-purple-300" />
                  </div>
                  <span>Email Us</span>
                </h4>
                <div className="flex flex-col space-y-3 pl-10">
                  {["mail.avenirphoenix@gmail.com", "mail.phoenixnsec@gmail.com"].map((email) => (
                    <motion.a
                      key={email}
                      whileHover={{ x: 3 }}
                      href={`mailto:${email}`}
                      className="text-white/80 hover:text-purple-400 transition-all duration-300 text-sm md:text-base overflow-hidden text-ellipsis border-l-2 border-purple-500/30 pl-3 py-1"
                    >
                      {email}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Phone Section */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="text-left"
              >
                <h4 className="text-purple-400 font-medium text-lg mb-4 flex items-center">
                  <div className="p-2 bg-purple-900/30 rounded-full mr-3">
                    <FaPhoneAlt className="text-purple-300" />
                  </div>
                  <span>Call Us</span>
                </h4>
                <div className="flex flex-col space-y-4 pl-10">
                  {[
                    { number: "+91 98746 73245", name: "Junaid Tarafdar", role: "General Secretary" },
                    { number: "+91 79089 57844", name: "Debojit Saha", role: "Tech Lead" },
                    { number: "+91 62996 02959", name: "Somnath Dutta", role: "President" },
                  ].map((contact) => (
                    <motion.a
                      key={contact.number}
                      whileHover={{ x: 3 }}
                      href={`tel:${contact.number.replace(/\s+/g, "")}`}
                      className="text-white/80 hover:text-purple-400 transition-all duration-300 text-sm md:text-base group border-l-2 border-purple-500/30 pl-3 py-1"
                    >
                      <span className="flex items-center">
                      <span className="block text-white/90 group-hover:text-purple-400 font-medium">
                        {contact.name}
                      </span>
                      <span className="text-white/60 ml-1 text-xs">({contact.role})</span>
                      </span>
                      <span className="flex items-center">
                        <span>{contact.number}</span>
                        
                      </span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom - Enhanced with animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 pt-6 border-t border-purple-900/30"
        >
          <p className="text-white/70 text-sm text-center">
            &copy; {currentYear} Avenir | Phoenix | NSEC. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
