

// "use client"

// import { useState, useEffect } from "react"

// import { motion, AnimatePresence } from "framer-motion"
// import { Menu, X, Sparkles } from "lucide-react"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [activeLink, setActiveLink] = useState("home")

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20)

//       // Update active link based on scroll position
//       const sections = document.querySelectorAll("section[id]")
//       let currentSection = "home"

//       sections.forEach((section) => {
//         const sectionTop = (section as HTMLElement).offsetTop - 100
//         const sectionHeight = (section as HTMLElement).offsetHeight
//         const sectionId = section.getAttribute("id") || ""

//         if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
//           currentSection = sectionId
//         }
//       })

//       setActiveLink(currentSection)
//     }

//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   // Close mobile menu when screen size changes to desktop
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768 && isOpen) {
//         setIsOpen(false)
//       }
//     }

//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [isOpen])

//   const navLinks = [
//     { name: "Home", href: "#home" },
//     { name: "Events", href: "#events" },
//     { name: "Timeline", href: "#timeline" },
//     { name: "About", href: "#about" },
//     { name: "Register", href: "#register" },
//     { name: "Sponsors", href: "#sponsors" },
//     { name: "Contact Us", href: "#contact" },
//   ]

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 ${
//         scrolled ? "bg-black/80 backdrop-blur-md shadow-lg shadow-purple-500/10" : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <a href="/" className="flex items-center gap-1 md:gap-2">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.5 }}
//             className="relative"
//           >
// {/* Add logo here and remove the sparkles */}

//             <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />  
//             <motion.div
//               className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full -z-10"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.5, 0.8, 0.5],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Number.POSITIVE_INFINITY,
//                 ease: "easeInOut",
//               }}
//             ></motion.div>
//           </motion.div>
//           <motion.span
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             className="text-lg sm:text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400"
//           >
//             Avenir'25
//           </motion.span>
//         </a>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex items-center gap-4 lg:gap-8">
//           {navLinks.map((link, index) => (
//             <motion.div
//               key={link.name}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 * index, duration: 0.5 }}
//             >
//               <a
//                 href={link.href}
//                 className={`relative text-sm lg:text-base text-gray-300 hover:text-white transition-all duration-300 ${
//                   activeLink === link.href.substring(1) ? "text-white font-medium" : ""
//                 }`}
//               >
//                 {link.name}
//                 {activeLink === link.href.substring(1) && (
//                   <motion.div
//                     layoutId="activeIndicator"
//                     className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 )}
//               </a>
//             </motion.div>
//           ))}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//           >
//             {/* Custom Tailwind button replacing Shadcn Button component */}
//             <button className="inline-flex items-center justify-center cursor-pointer rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 md:h-9 lg:h-10 px-3 md:px-4 text-xs md:text-sm bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-none shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300">
//               Register Now
//             </button>
//           </motion.div>
//         </div>

//         {/* Mobile Navigation Toggle */}
//         <div className="md:hidden">
//           {/* Custom Tailwind button for mobile toggle */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="inline-flex items-center justify-center rounded-md h-8 w-8 sm:h-9 sm:w-9 text-white hover:bg-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors"
//             aria-label={isOpen ? "Close menu" : "Open menu"}
//           >
//             {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-black/90 backdrop-blur-lg mt-2 sm:mt-3 rounded-lg overflow-hidden border border-purple-500/20 shadow-lg shadow-purple-500/10"
//           >
//             <div className="flex flex-col p-3 sm:p-4 space-y-2 sm:space-y-3">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   className={`text-gray-300 hover:text-white py-2 px-3 sm:px-4 rounded-md hover:bg-purple-500/20 transition-all duration-300 text-sm sm:text-base ${
//                     activeLink === link.href.substring(1) ? "bg-purple-500/20 text-white" : ""
//                   }`}
//                   onClick={() => setIsOpen(false)}
//                 >
//                   {link.name}
//                 </a>
//               ))}
//               {/* Custom Tailwind button for mobile menu */}
//               <button className="inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-9 sm:h-10 px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-none shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300">
//                 Register Now
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   )
// }

"use client"

import { useState, useEffect } from "react"
// import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("home")

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
    { name: "Events", href: "#events" },
    { name: "About", href: "#about" },
    { name: "Register", href: "#register" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 ${
        scrolled ? "bg-black/80 backdrop-blur-md shadow-lg shadow-purple-500/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center gap-1 md:gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-purple-500" />
            <motion.div
              className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            ></motion.div>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400"
          >
            Avenir
          </motion.span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <a
                href={link.href}
                className={`relative text-sm lg:text-base transition-all duration-300 ${
                  activeLink === link.href.substring(1) 
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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* Custom Tailwind button replacing Shadcn Button component */}
            <button className="inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 md:h-9 lg:h-10 px-3 md:px-4 text-xs md:text-sm bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-none shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300">
              Register Now
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          {/* Custom Tailwind button for mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md h-8 w-8 sm:h-9 sm:w-9 text-white hover:bg-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 backdrop-blur-lg mt-2 sm:mt-3 rounded-lg overflow-hidden border border-purple-500/20 shadow-lg shadow-purple-500/10"
          >
            <div className="flex flex-col p-3 sm:p-4 space-y-2 sm:space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`py-2 px-3 sm:px-4 rounded-md hover:bg-purple-500/20 transition-all duration-300 text-sm sm:text-base ${
                    activeLink === link.href.substring(1) 
                      ? "bg-purple-500/20 text-purple-400" 
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              {/* Custom Tailwind button for mobile menu */}
              <button className="inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-full h-9 sm:h-10 px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-none shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300">
                Register Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}