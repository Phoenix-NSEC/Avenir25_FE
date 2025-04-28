import { motion } from "framer-motion";
import { timelineItems } from "../constants/timeline-data";
import { EnchantedHeading } from "./EnchantedHeading";

const TimeLine = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Enhanced heading with better visibility */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <EnchantedHeading>Magical Timeline</EnchantedHeading>
        </motion.div>

        <div className="relative">
          {/* Center line for larger screens, side line for mobile */}
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 transform lg:-translate-x-1/2 w-1 bg-gradient-to-b from-purple-600 via-cyan-500 to-purple-600 z-0" />

          <div className="grid grid-cols-1 gap-4 relative z-10">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 50
                }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                {/* Timeline dot with positioning for both mobile and desktop */}
                <div className="absolute left-4 lg:left-1/2 top-10 transform lg:-translate-x-1/2 w-6 h-6 flex items-center justify-center">
                  <motion.div 
                    className="relative flex items-center justify-center"
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    transition={{ duration: 1, times: [0, 0.5, 1], delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="size-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-400 z-20 shadow-lg shadow-purple-500/50 flex items-center justify-center text-sm">
                      
                    </div>
                    <div className="absolute size-12 rounded-full bg-purple-500/20 animate-pulse" />
                  </motion.div>
                </div>

                {/* Content with responsive positioning */}
                <div className="flex flex-col lg:flex-row">
                  {/* Left spacer for even items on desktop */}
                  {index % 2 !== 0 && (
                    <div className="hidden lg:block w-1/2" />
                  )}
                  
                  {/* Content container */}
                  <div className={`w-full lg:w-1/2 pl-12 lg:pl-0 ${
                    index % 2 === 0 
                      ? "lg:pr-12 lg:text-right" 
                      : "lg:pl-12 lg:text-left"
                  }`}>
                    <motion.div 
                      className="p-6 rounded-lg bg-black border border-purple-500/40 group hover:border-purple-500/70 transition-all duration-500 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"
                      whileHover={{ 
                        boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
                        scale: 1.02
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-sm font-bold text-purple-300 group-hover:text-purple-200 transition-colors">{item.year}</span>
                      <h4 className="text-xl font-bold text-white mt-1 mb-3 group-hover:text-purple-100 transition-colors">{item.title}</h4>
                      <p className="text-white/90 group-hover:text-white transition-colors">{item.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Right spacer for odd items on desktop */}
                  {index % 2 === 0 && (
                    <div className="hidden lg:block w-1/2" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced future indicator */}
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-block py-2 px-6 rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 backdrop-blur-sm border border-purple-500/50">
            <span className="text-white font-medium">And the journey continues...</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimeLine;