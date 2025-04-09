import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Zap } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("home")
  const [isVisible, setIsVisible] = useState(false)
  const navRef = useRef(null)

  // Logo path - replace with your actual logo path
  const logoPath = "/Event assets/logo.png"

  useEffect(() => {
    // This will make the navbar only appear after the loading is done
    // Initial delay to match the loader duration in App.js (3500ms)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Update active link based on scroll position
      const sections = document.querySelectorAll("section[id]")
      let currentSection = "home"

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = sectionId
        }
      })

      setActiveLink(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isOpen])

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Events", href: "/events" },
    { name: "Timeline", href: "#timeline" },
    { name: "About", href: "#about" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "Team", href: "/team" },
    { name: "FAQ", href: "#faq" },
    // { name: "Contact", href: "#contact" },
  ]

  // Don't render anything if not visible yet
  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[98%] sm:w-[95%] md:w-[92%]">
      {/* Animated border wrapper */}
      <div className="relative p-[2px] rounded-3xl">
        {/* Animated border effect - only this part has animation */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(90deg, rgba(168,85,247,0.7), rgba(56,189,248,0.7), rgba(217,70,239,0.7), rgba(168,85,247,0.7))",
              backgroundSize: "300% 100%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        {/* Main navbar with blackish transparent background */}
        <motion.nav
          ref={navRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl w-full transition-all duration-500 py-2 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 bg-black bg-opacity-40"
        >
          <div className="relative flex justify-between items-center">
            <a href="/" className="flex items-center gap-1 md:gap-2 group">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="relative flex items-center justify-center">
                  {/* Logo image */}
                  <div className="relative h-8 w-8 md:h-10 md:w-10 overflow-visible">
                    <div className="relative h-full w-full rounded-full overflow-hidden">
                      <img
                        src={logoPath || "/placeholder.svg"}
                        alt="Avenir Logo"
                        className="object-contain w-full h-full transition-all duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center w-full">
              {/* Centered nav links */}
              <div className="flex justify-center gap-4 lg:gap-8 flex-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="relative group"
                  >
                    <a
                      href={link.href}
                      className={`relative text-sm lg:text-base transition-all duration-300 ${activeLink === link.href.substring(1)
                          ? "text-purple-400 font-medium"
                          : "text-gray-300 hover:text-white"
                        }`}
                    >
                      {link.name}
                      {activeLink === link.href.substring(1) && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Register Now button aligned right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-auto"
              >
                <button className="relative overflow-hidden inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 md:h-9 lg:h-10 px-4 md:px-5 text-xs md:text-sm bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white border-none shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-1.5">
                    Register Now
                   
                  </span>
                </button>
              </motion.div>
            </div>


            {/* Mobile Navigation Toggle */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative inline-flex items-center justify-center rounded-full h-8 w-8 sm:h-9 sm:w-9 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors overflow-hidden"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden absolute left-0 right-0 top-full mt-3 sm:mt-4 z-50"
              >
                {/* Animated border for mobile menu */}
                <div className="relative p-[2px] rounded-2xl">
                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(168,85,247,0.7), rgba(56,189,248,0.7), rgba(217,70,239,0.7), rgba(168,85,247,0.7))",
                        backgroundSize: "300% 100%",
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  </div>

                  {/* Blackish transparent background for mobile menu */}
                  <div className="relative bg-black bg-opacity-40 rounded-2xl overflow-hidden">
                    <div className="flex flex-col p-4 sm:p-5 space-y-2 sm:space-y-3">
                      {navLinks.map((link, index) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.3 }}
                        >
                          <a
                            href={link.href}
                            className={`block py-3 px-4 sm:px-5 rounded-xl transition-all duration-300 text-sm sm:text-base ${activeLink === link.href.substring(1)
                                ? "text-purple-400"
                                : "text-gray-300 hover:text-white"
                              }`}
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center">
                              <span>{link.name}</span>
                              {activeLink === link.href.substring(1) && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="ml-2 h-1.5 w-1.5 rounded-full bg-purple-400"
                                />
                              )}
                            </div>
                          </a>
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="pt-2"
                      >
                        <button className="relative overflow-hidden inline-flex items-center justify-center w-full rounded-xl font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white border-none shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300">
                          <span className="relative z-10 flex items-center justify-center gap-1.5 w-full">
                            Register Now
                            <Zap className="h-4 w-4" />
                          </span>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </div>
  )
}