import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const Sponsors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const sponsors = [
    { name: "TechCorp", logo: "https://play-lh.googleusercontent.com/W4p1Tw8NsxjjkOEypI_pyLfn0OnWtUHevdrCWv3wgUESHqSjgvtXY12XWIeWfXk5e-YL=w3840-h2160-rw" },
    { name: "InnovateLabs", logo: "https://play-lh.googleusercontent.com/W4p1Tw8NsxjjkOEypI_pyLfn0OnWtUHevdrCWv3wgUESHqSjgvtXY12XWIeWfXk5e-YL=w3840-h2160-rw" },
    { name: "FutureTech", logo: "https://play-lh.googleusercontent.com/W4p1Tw8NsxjjkOEypI_pyLfn0OnWtUHevdrCWv3wgUESHqSjgvtXY12XWIeWfXk5e-YL=w3840-h2160-rw" },
    { name: "CodeMagic", logo: "https://play-lh.googleusercontent.com/W4p1Tw8NsxjjkOEypI_pyLfn0OnWtUHevdrCWv3wgUESHqSjgvtXY12XWIeWfXk5e-YL=w3840-h2160-rw" },
    { name: "RoboWizards", logo: "https://play-lh.googleusercontent.com/W4p1Tw8NsxjjkOEypI_pyLfn0OnWtUHevdrCWv3wgUESHqSjgvtXY12XWIeWfXk5e-YL=w3840-h2160-rw" },
    { name: "DigitalSpells", logo: "https://play-lh.googleusercontent.com/W4p1Tw8NsxjjkOEypI_pyLfn0OnWtUHevdrCWv3wgUESHqSjgvtXY12XWIeWfXk5e-YL=w3840-h2160-rw" },
  ];

  const team = [
    { name: "Alex Merlin", role: "Event Director", image: "https://media.licdn.com/dms/image/v2/D5603AQEMnEQfhkPyeQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720084678679?e=1749081600&v=beta&t=2PbATKcl7NGeCziIgfZNjNLrL2Jpleib6IWSofCOuCo" },
    { name: "Sam Spellcaster", role: "Technical Lead", image: "https://media.licdn.com/dms/image/v2/D5603AQEMnEQfhkPyeQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720084678679?e=1749081600&v=beta&t=2PbATKcl7NGeCziIgfZNjNLrL2Jpleib6IWSofCOuCo" },
    { name: "Jordan Enchanter", role: "Marketing Head", image: "https://media.licdn.com/dms/image/v2/D5603AQEMnEQfhkPyeQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720084678679?e=1749081600&v=beta&t=2PbATKcl7NGeCziIgfZNjNLrL2Jpleib6IWSofCOuCo" },
    { name: "Taylor Sorcerer", role: "Sponsorship Coordinator", image: "https://media.licdn.com/dms/image/v2/D5603AQEMnEQfhkPyeQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1720084678679?e=1749081600&v=beta&t=2PbATKcl7NGeCziIgfZNjNLrL2Jpleib6IWSofCOuCo" },
  ];

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 50 }
    }
  };

  // Beautiful creative heading with magical elements
  const EnchantedHeading = ({ children, delay = 0.3 }) => (
    <div className="relative mb-20 mt-8">
      {/* Decorative elements */}
      <div className="absolute left-1/4 -top-6 w-32 h-1 bg-gradient-to-r from-purple-600/0 via-purple-600 to-purple-600/0"></div>
      <div className="absolute right-1/4 -top-6 w-32 h-1 bg-gradient-to-r from-cyan-600/0 via-cyan-600 to-cyan-600/0"></div>
      
      {/* Magical stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white"
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          } : { opacity: 0 }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: delay + (i * 0.2)
          }}
          style={{
            top: `${-10 + (Math.sin(i) * 20)}px`,
            left: `${25 + ((i * 30) % 50)}%`,
          }}
        />
      ))}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay }}
        className="relative z-10 text-center mb-2"
      >
        {/* Animated line decoration */}
        <motion.div
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : { width: "0%" }}
          transition={{ duration: 1.5, ease: "easeInOut", delay }}
          className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent absolute -top-8 left-0 right-0"
        />
        
        {/* Main heading with gradient text */}
        <h2 className="text-5xl font-bold inline-block relative">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-purple-400 relative z-10">
            {children}
          </span>
          
          {/* Subtle line underneath text */}
          <motion.div
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 0.8, delay: delay + 0.4 }}
            className="h-0.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 absolute -bottom-2 left-0"
          />
        </h2>
      </motion.div>
      
      {/* Decorative magical symbols */}
      <div className="flex justify-center mt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.6 }}
          className="relative mx-2"
        >
          <div className="w-2 h-2 bg-purple-500 rotate-45 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="w-4 h-4 border border-purple-400 rotate-45 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.7 }}
          className="mx-4"
        >
          <div className="h-0.5 w-16 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.8 }}
          className="relative mx-2"
        >
          <div className="w-2 h-2 bg-cyan-500 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="w-4 h-4 border border-cyan-400 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="text-white relative overflow-hidden ">
      {/* Animated background effects - enhanced with more elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-purple-700/30 blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-700/20 blur-3xl animate-pulse" style={{ animationDuration: "12s", animationDelay: "2s" }} />
        <div className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-blue-700/20 blur-3xl animate-pulse" style={{ animationDuration: "15s", animationDelay: "1s" }} />
        <div className="absolute top-1/6 right-1/6 w-32 h-32 rounded-full bg-indigo-700/20 blur-3xl animate-pulse" style={{ animationDuration: "10s", animationDelay: "3s" }} />
      </div>

      {/* Magical floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-purple-400/60"
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 8 + (i % 5),
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeInOut"
          }}
          style={{
            left: `${10 + (i * 4)}%`,
            top: `${50 + (i % 3) * 10}%`
          }}
        />
      ))}

      {/* Sponsors Section */}
      <div ref={ref} className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <EnchantedHeading>Our Magical Allies</EnchantedHeading>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-24"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)" 
                }}
                className="bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 flex items-center justify-center group"
              >
                <div className="relative overflow-hidden w-full aspect-video">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full h-auto mx-auto filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-12 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                    <p className="text-sm text-purple-300 font-medium pb-2">{sponsor.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <EnchantedHeading delay={0.6}>The Wizards Behind Avenir</EnchantedHeading>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
                  transition: { duration: 0.3 }
                }}
                className="bg-gradient-to-br from-black/60 to-black/80 backdrop-blur-lg rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                  
                  {/* Enhanced overlay gradient */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300"
                    whileHover={{ opacity: 0.6 }}
                  />
                  
                  {/* Enhanced magical particle effects on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    {[...Array(8)].map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-purple-400 animate-pulse"
                        style={{ 
                          top: `${25 + (i * 7) % 50}%`, 
                          left: `${20 + (i * 9) % 60}%`,
                          width: i % 2 ? '4px' : '6px',
                          height: i % 2 ? '4px' : '6px',
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: `${1 + (i % 3)}s`
                        }} 
                      />
                    ))}
                  </div>
                  
                  {/* Magical sparkle effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        animate={{
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                          repeatDelay: 0.2
                        }}
                        style={{
                          top: `${20 + (i * 15)}%`,
                          left: `${15 + (i * 20)}%`,
                          boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)'
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="p-6 text-center relative z-10">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-300 transition-colors duration-300">{member.name}</h3>
                  <p className="text-purple-400 group-hover:text-cyan-400 transition-colors duration-300">{member.role}</p>
                  
                  <motion.div 
                    initial={{ width: "0%" }}
                    whileHover={{ width: "70%" }}
                    transition={{ duration: 0.4 }}
                    className="h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;