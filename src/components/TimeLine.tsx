
// import { motion } from "framer-motion";


// const TimeLine = () => {
//   return (
//     <>
    
//     <div className="mt-20">
//           <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-purple-300">Our Timeline</h3>

//           <div className="relative">
//             {/* Center line */}
//             <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full z-0" />

//             <div className="grid grid-cols-1 gap-8 relative z-10">
//               {[
//                 {
//                   year: "2015",
//                   title: "Humble Beginnings",
//                   description: "Avenir began as a small departmental event with just 200 participants.",
//                 },
//                 {
//                   year: "2018",
//                   title: "Going College-Wide",
//                   description: "Expanded to include all departments with over 1000 participants.",
//                 },
//                 {
//                   year: "2020",
//                   title: "Virtual Innovation",
//                   description: "Successfully pivoted to a fully virtual format during the pandemic.",
//                 },
//                 {
//                   year: "2023",
//                   title: "National Recognition",
//                   description: "Grew to become one of Eastern India's premier technical festivals.",
//                 },
//                 {
//                   year: "2025",
//                   title: "The Magical Edition",
//                   description: "Celebrating our 10th edition with the biggest and most magical Avenir yet.",
//                 },
//               ].map((item, index) => (
//                 <motion.div
//                   key={item.year}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: index * 0.1 }}
//                   viewport={{ once: true, amount: 0.3 }}
//                   className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center`}
//                 >
//                   <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
//                     <div className="p-6 bg-black/40 backdrop-blur-sm border border-purple-900/50 rounded-lg">
//                       <span className="text-sm font-medium text-purple-400">{item.year}</span>
//                       <h4 className="text-xl font-bold text-white mt-1 mb-2">{item.title}</h4>
//                       <p className="text-white/80">{item.description}</p>
//                     </div>
//                   </div>

//                   <div className="hidden md:flex items-center justify-center">
//                     <div className="relative flex items-center justify-center">
//                       <div className="size-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 z-20" />
//                       <div className="absolute size-12 rounded-full bg-purple-500/20 animate-ping" />
//                     </div>
//                   </div>

//                   <div className="w-full md:w-1/2" />
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
      
    
    
//     </>
//   )
// }

// export default TimeLine




import { motion } from "framer-motion";

const TimeLine = () => {
  const timelineItems = [
    {
      year: "2015",
      title: "Humble Beginnings",
      description: "Avenir began as a small departmental event with just 200 participants.",
    },
    {
      year: "2018",
      title: "Going College-Wide",
      description: "Expanded to include all departments with over 1000 participants.",
    },
    {
      year: "2020",
      title: "Virtual Innovation",
      description: "Successfully pivoted to a fully virtual format during the pandemic.",
    },
    {
      year: "2023",
      title: "National Recognition",
      description: "Grew to become one of Eastern India's premier technical festivals.",
    },
    {
      year: "2025",
      title: "The Magical Edition",
      description: "Celebrating our 10th edition with the biggest and most magical Avenir yet.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-black text-white">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
        >
          Our Journey
        </motion.h2>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 to-cyan-500 z-0" />

          <div className="grid grid-cols-1 gap-16 relative z-10">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline dot container - perfectly centered */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="size-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 z-20 shadow-lg shadow-purple-500/30" />
                    <div className="absolute size-8 rounded-full bg-purple-500/20 animate-ping" />
                  </div>
                </div>

                {/* Content */}
                <div className={`flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <div className="p-6 bg-black/40 backdrop-blur-sm border border-purple-900/50 rounded-lg hover:border-purple-500/70 transition-colors duration-300">
                      <span className="text-sm font-medium text-purple-400">{item.year}</span>
                      <h4 className="text-xl font-bold text-white mt-1 mb-2">{item.title}</h4>
                      <p className="text-white/80">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Spacer for opposite side */}
                  <div className="hidden md:block w-1/2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeLine;
