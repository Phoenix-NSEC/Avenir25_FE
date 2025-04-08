

import { motion } from "framer-motion";
import { useState } from "react";
import { teamData } from "../constants/team-data";
import AnimatedBackground from "./AnimatedBackground"
import { EnchantedHeading } from "./EnchantedHeading"
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

// Icons for social media
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const Team = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <section className="py-16 px-4">
      <AnimatedBackground/>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
           <div className="mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            <EnchantedHeading>Meet Our Team</EnchantedHeading>
          </h2>
        
        </motion.div>
        
        {/* Tab navigation */}
        <div className="flex flex-wrap justify-center mb-12 mt-8">
          {teamData.map((section, index) => (
            <motion.button
              key={section.title}
              onClick={() => setActiveTab(index)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              className={`relative px-6 py-3 mx-2 mb-3 rounded-full font-medium text-sm transition-all duration-300 ${
                activeTab === index 
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/30' 
                  : 'bg-purple-900/30 text-white/70 hover:text-white  border border-purple-500/30'
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

        {/* Team members display area */}
        <div className="relative min-h-[500px]">
          {teamData.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: activeTab === sectionIndex ? 1 : 0,
                x: activeTab === sectionIndex ? 0 : 20,
                pointerEvents: activeTab === sectionIndex ? "auto" : "none"
              }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 right-0"
              style={{ display: activeTab === sectionIndex ? "block" : "none" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 50
                    }}
                    whileHover={{ y: -5 }}
                    className="relative group"
                  >
                    <div className="overflow-hidden rounded-lg  border border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-300 bg-gradient-to-br ">
                      {/* Image container with gradient overlay */}
                      <div className="relative h-64 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent  z-10"></div>
                        <img 
                          src={member.photo} 
                          alt={member.name} 
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Social media icons positioned at the bottom */}
                        <div className="absolute bottom-4 right-4 flex space-x-3 z-20">
                          {member.socials.instagram && (
                            <a 
                              href={member.socials.instagram} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-purple-800/70 hover:bg-purple-600 p-2 rounded-full text-white transition-colors duration-300"
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
                              className="bg-purple-800/70 hover:bg-purple-600 p-2 rounded-full text-white transition-colors duration-300"
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
                              className="bg-purple-800/70 hover:bg-purple-600 p-2 rounded-full text-white transition-colors duration-300"
                              aria-label={`${member.name}'s GitHub`}
                            >
                              <GithubIcon />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Name and designation */}
                      <div className="p-5">
                        <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                        <p className="text-cyan-300">{member.designation}</p>
                      </div>
                    </div>
                    
                    {/* Decorative element */}
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;