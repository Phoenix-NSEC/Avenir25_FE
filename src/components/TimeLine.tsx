import { motion } from "framer-motion";

const TimeLine = () => {
  const timelineItems = [
    {
      year: "2015",
      title: "Humble Beginnings",
      description: "Avenir began as a small departmental event with just 200 participants.",
      icon: "🌱" 
    },
    {
      year: "2018",
      title: "Going College-Wide",
      description: "Expanded to include all departments with over 1000 participants.",
      icon: "🏫"
    },
    {
      year: "2020",
      title: "Virtual Innovation",
      description: "Successfully pivoted to a fully virtual format during the pandemic.",
      icon: "💻"
    },
    {
      year: "2023",
      title: "National Recognition",
      description: "Grew to become one of Eastern India's premier technical festivals.",
      icon: "🏆"
    },
    {
      year: "2025",
      title: "The Magical Edition",
      description: "Celebrating our 10th edition with the biggest and most magical Avenir yet.",
      icon: "✨"
    },
  ];

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
          <h2 className="text-3xl sm:text-4xl font-bold relative inline-block">
            {/* Solid background text for better visibility */}
            <span className="text-white font-bold">Our Journey Through Time</span>
            
            {/* Gradient underline for emphasis */}
            <div className="h-1 w-full mt-2 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-full"></div>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Center line with improved visibility */}
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-600 via-cyan-500 to-purple-600 z-0" />

          <div className="grid grid-cols-1 gap-20 relative z-10">
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
                {/* Timeline dot with higher contrast */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center">
                  <motion.div 
                    className="relative flex items-center justify-center"
                    whileInView={{ scale: [0.8, 1.2, 1] }}
                    transition={{ duration: 1, times: [0, 0.5, 1], delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="size-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-400 z-20 shadow-lg shadow-purple-500/50 flex items-center justify-center text-sm">
                      {item.icon}
                    </div>
                    <div className="absolute size-12 rounded-full bg-purple-500/20 animate-pulse" />
                  </motion.div>
                </div>

                {/* Content with improved contrast and transparency */}
                <div className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <motion.div 
                      className="p-6 rounded-lg backdrop-blur-md border border-purple-500/40 group hover:border-purple-500/70 transition-all duration-500 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"
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
                  
                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-1/2" />
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