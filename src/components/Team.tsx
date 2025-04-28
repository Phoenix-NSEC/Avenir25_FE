"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { teamData } from "../constants/team-data"
import AnimatedBackground from "./AnimatedBackground"
import { EnchantedHeading } from "./EnchantedHeading"
import { Link } from "react-router-dom"
import { ChevronDown, Home } from "lucide-react"

// Icons for social media
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const Team = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen])

  return (
    <section className="relative py-12 px-4 bg-black min-h-screen">
      {/* Add a fixed background color behind the animated background */}
      <div className="fixed inset-0 bg-black z-0"></div>

      {/* AnimatedBackground with higher z-index */}
      <div className="fixed inset-0 z-0">
        <AnimatedBackground />
      </div>

      <div className="container mx-auto relative z-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="mb-4 flex justify-start">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-white font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 border-2 border-transparent hover:border-white/30 text-sm"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            <EnchantedHeading>Meet Our Team</EnchantedHeading>
          </h2>
        </motion.div>

        {/* Mobile dropdown for filtering - improved with ref */}
        <div className="md:hidden mb-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
            ref={dropdownRef}
          >
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-900/80 to-purple-800/80 rounded-lg text-white border border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              <span>{teamData[activeTab].title}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-1 bg-purple-900/90 backdrop-blur-sm border border-purple-500/50 rounded-lg shadow-lg z-50 overflow-hidden"
              >
                {teamData.map((section, index) => (
                  <button
                    key={section.title}
                    onClick={() => {
                      setActiveTab(index)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 transition-colors duration-200 ${
                      activeTab === index
                        ? "bg-gradient-to-r from-purple-600/50 to-cyan-500/50 text-white"
                        : "text-white/80 hover:bg-purple-800/50"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Tab navigation - hidden on mobile */}
        <div className="hidden md:flex flex-wrap justify-center mb-10 mt-6">
          {teamData.map((section, index) => (
            <motion.button
              key={section.title}
              onClick={() => setActiveTab(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              className={`relative px-5 py-2 mx-2 mb-3 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 ${
                activeTab === index
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/30"
                  : "bg-purple-900/50 text-white/90 hover:text-white border border-purple-500/50 hover:border-purple-500"
              }`}
            >
              {section.title}
              {activeTab === index && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-full rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Team members display area - Updated grid for better responsiveness */}
        <div className="relative">
          {teamData.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: activeTab === sectionIndex ? 1 : 0,
                x: activeTab === sectionIndex ? 0 : 20,
              }}
              transition={{ duration: 0.5 }}
              className={`${activeTab === sectionIndex ? "block" : "hidden"}`}
            >
              {/* Updated grid classes for better small screen display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-4 mx-auto max-w-7xl">
                {section.members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 50,
                    }}
                    whileHover={{ y: -5 }}
                    className="relative group mb-4"
                  >
                    <div className="overflow-hidden rounded-lg border border-purple-500/40 group-hover:border-purple-500/80 transition-all duration-300 bg-gradient-to-br from-black/80 to-purple-900/30 h-full flex flex-col shadow-md">
                      {/* Image container with gradient overlay - Adjusted for better mobile display */}
                      <div className="relative aspect-square overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                        <img
                          src={member.photo || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Social media icons - slightly larger for mobile */}
                        <div className="absolute bottom-2 right-2 flex space-x-2 z-20">
                          {member.socials.instagram && (
                            <a
                              href={member.socials.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-purple-600/80 hover:bg-purple-500 p-2 sm:p-1.5 rounded-full text-white transition-colors duration-300"
                              aria-label={`${member.name}'s Instagram`}
                            >
                              <InstagramIcon />
                            </a>
                          )}
                          {member.socials.linkedin && (
                            <a
                              href={member.socials.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-purple-600/80 hover:bg-purple-500 p-2 sm:p-1.5 rounded-full text-white transition-colors duration-300"
                              aria-label={`${member.name}'s LinkedIn`}
                            >
                              <LinkedinIcon />
                            </a>
                          )}
                          {member.socials.github && (
                            <a
                              href={member.socials.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-purple-600/80 hover:bg-purple-500 p-2 sm:p-1.5 rounded-full text-white transition-colors duration-300"
                              aria-label={`${member.name}'s GitHub`}
                            >
                              <GithubIcon />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Name and designation - larger text for mobile */}
                      <div className="p-4 sm:p-3 flex-grow">
                        <h4 className="text-base sm:text-sm font-bold text-white mb-1 sm:mb-0.5 truncate">{member.name}</h4>
                        <p className="text-cyan-400 text-sm sm:text-xs truncate">{member.designation}</p>
                      </div>
                    </div>

                    {/* Decorative element */}
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team