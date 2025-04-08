import { useRef, useEffect, useState } from "react";
import { useInView, motion, useAnimation } from "framer-motion";
import { sponsorsByTier } from "../constants/sponsors";
import { EnchantedHeading } from "./EnchantedHeading";

const Sponsors = () => {
  const ref = useRef(null);
  const scrollerRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const sponsorsControls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced sponsors list with tier information


  // Combine all sponsors into a single array for rendering
  const allSponsors = Object.values(sponsorsByTier).flat();
  




  // Maps tier names to colors for styling
  const tierConfig = {
    platinum: {
      color: "from-purple-600 to-indigo-600",
      borderColor: "border-purple-400",
      iconColor: "text-purple-300",
      badgeStyle: "bg-gradient-to-r from-purple-500 to-indigo-500"
    },
    gold: {
      color: "from-yellow-600 to-amber-500", 
      borderColor: "border-yellow-400",
      iconColor: "text-yellow-300",
      badgeStyle: "bg-gradient-to-r from-yellow-500 to-amber-500"
    },
    normal: {
      color: "from-cyan-600 to-blue-600",
      borderColor: "border-cyan-400",
      iconColor: "text-cyan-300",
      badgeStyle: "bg-gradient-to-r from-cyan-500 to-blue-500"
    }
  };

  // FIX: Setup auto-scroll animation for sponsors with improved animation controls
  useEffect(() => {
    if (isInView && scrollerRef.current && allSponsors.length > 0) {
      // Get the width of a single sponsor card
      const itemsPerView = isMobile ? 1 : 3;
      const totalItems = allSponsors.length;
      
      // Make sure we're using the right calculation for continuous scrolling
      // We'll need to know how far to scroll before resetting
      const scrollDistance = -100 * (totalItems / itemsPerView);
      
      // Set up infinite scrolling with reset
      const scrollAnimation = async () => {
        // Start the animation at position 0
        await sponsorsControls.start({
          x: `${scrollDistance}%`,
          transition: {
            duration: totalItems * 8, // Slower for smooth effect
            ease: "linear"
          }
        });
        
        // Quickly reset to the beginning (without animation) and repeat
        await sponsorsControls.set({ x: "0%" });
        scrollAnimation();
      };
      
      scrollAnimation();
    }
    
    return () => {
      sponsorsControls.stop();
    };
  }, [isInView, sponsorsControls, isMobile, allSponsors.length]);

  // Beautiful creative heading with magical elements
  

  // Sponsor card for each item
  const SponsorCard = ({ sponsor, index }:any) => {
    const tier = sponsor.tier || "normal";
    const config = tierConfig[tier as keyof typeof tierConfig];

    
    return (
      <motion.div
        key={`${sponsor.name}-${index}`}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 0 25px rgba(139, 92, 246, 0.4)" 
        }}
        className={`flex-shrink-0 ${isMobile ? 'w-full' : 'w-1/3'} px-4 py-6`}
      >
        <div className="bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 flex items-center justify-center group h-40 relative overflow-hidden">
          {/* Magical border effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${config.color}`}></div>
            <div className={`absolute inset-y-0 right-0 w-0.5 bg-gradient-to-b ${config.color}`}></div>
            <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-l ${config.color}`}></div>
            <div className={`absolute inset-y-0 left-0 w-0.5 bg-gradient-to-t ${config.color}`}></div>
            
            {/* Corner sparkles */}
            {[...Array(4)].map((_, i) => (
              <motion.div 
                key={`corner-${i}`}
                className="absolute w-1 h-1 rounded-full bg-white"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  top: i < 2 ? '0px' : 'auto',
                  bottom: i >= 2 ? '0px' : 'auto',
                  left: i % 2 === 0 ? '0px' : 'auto',
                  right: i % 2 === 1 ? '0px' : 'auto',
                  boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)'
                }}
              />
            ))}
          </div>
          
          {/* Tier badge for platinum and gold sponsors */}
          {tier !== "normal" && (
            <div className={`absolute top-2 right-2 px-2 py-0.5 z-10 rounded-full text-xs text-white ${config.badgeStyle} font-medium opacity-100 group-hover:opacity-100 transition-opacity duration-300`}>
              {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </div>
          )}
          
          <div className="relative overflow-hidden w-full">
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="max-w-full h-auto mx-auto filter grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-t ${config.color}/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              whileHover={{ opacity: 1 }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-12 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
              <p className={`text-sm ${config.iconColor} font-medium pb-2`}>{sponsor.name}</p>
            </div>
            
            {/* Magical particle effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`sponsor-particle-${index}-${i}`}
                  className={`absolute w-1 h-1 ${config.iconColor} rounded-full`}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5 + (i * 0.2),
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                  style={{
                    left: `${20 + (i * 15)}%`,
                    top: `${70 + (i * 5)}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="text-white relative overflow-hidden">
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

          {/* Single sponsors section with auto-scroll */}
          <div className="mb-16">
            {/* Infinite scrolling sponsors section */}
            <div className="relative overflow-hidden">
              {/* Magical borders */}
              <div className="absolute inset-y-0 left-0 w-8 pointer-events-none z-10 flex items-center justify-start">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`left-magical-border-${i}`}
                    className="absolute h-12 w-px bg-gradient-to-b from-purple-600 to-cyan-600"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      height: ['30%', '60%', '30%'],
                      left: [`${i * 2}px`, `${(i * 2) + 1}px`, `${i * 2}px`],
                    }}
                    transition={{
                      duration: 3 + (i * 0.5),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.7
                    }}
                  />
                ))}
                
                {/* Magical sparkles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`left-sparkle-${i}`}
                    className="absolute rounded-full bg-white"
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      x: [-5, 5, -5]
                    }}
                    transition={{
                      duration: 2 + i,
                      repeat: Infinity,
                      delay: i * 0.8
                    }}
                    style={{
                      width: `${3 + (i % 2)}px`,
                      height: `${3 + (i % 2)}px`,
                      top: `${20 + (i * 30)}%`,
                      left: `${i * 2}px`,
                      boxShadow: '0 0 5px 2px rgba(255, 255, 255, 0.6)'
                    }}
                  />
                ))}
              </div>
              
              <div className="absolute inset-y-0 right-0 w-8 pointer-events-none z-10 flex items-center justify-end">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`right-magical-border-${i}`}
                    className="absolute h-12 w-px bg-gradient-to-b from-purple-600 to-cyan-600"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      height: ['30%', '60%', '30%'],
                      right: [`${i * 2}px`, `${(i * 2) + 1}px`, `${i * 2}px`],
                    }}
                    transition={{
                      duration: 3 + (i * 0.5),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.7
                    }}
                  />
                ))}
                
                {/* Magical sparkles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`right-sparkle-${i}`}
                    className="absolute rounded-full bg-white"
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [0, 1, 0],
                      x: [5, -5, 5]
                    }}
                    transition={{
                      duration: 2 + i,
                      repeat: Infinity,
                      delay: i * 0.8
                    }}
                    style={{
                      width: `${3 + (i % 2)}px`,
                      height: `${3 + (i % 2)}px`,
                      top: `${20 + (i * 30)}%`,
                      right: `${i * 2}px`,
                      boxShadow: '0 0 5px 2px rgba(255, 255, 255, 0.6)'
                    }}
                  />
                ))}
              </div>
              
              {/* FIX: Improved animated scrolling container */}
              <div className="mx-auto max-w-6xl relative pb-4 overflow-hidden">
                <motion.div
                  ref={scrollerRef}
                  className="flex items-center justify-start"
                  animate={sponsorsControls}
                >
                  {/* Duplicate sponsors for continuous scrolling effect */}
                  {[...allSponsors, ...allSponsors].map((sponsor, index) => (
                    <SponsorCard sponsor={sponsor} index={index} key={`${sponsor.name}-${index}`} />
                  ))}
                </motion.div>
                
                {/* Elegant indicator dots */}
                <div className="flex justify-center mt-6 space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`indicator-${i}`}
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.7,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          
          
        </div>
      </div>
    </div>
  );
};

export default Sponsors;