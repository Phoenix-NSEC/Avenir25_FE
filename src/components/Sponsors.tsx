import { useRef } from "react";
import { useInView, motion } from "framer-motion";

const Sponsors = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const sponsors = [
    { name: "TechCorp", logo: "https://images.ctfassets.net/ihx0a8chifpc/5iTQd3JcC5e0703zBMnxN7/ef1a5690c4813e71731171bd75a43dd6/placeholders.dev-1280x720.png?w=1920&q=60&fm=webp" },
    { name: "InnovateLabs", logo: "https://images.ctfassets.net/ihx0a8chifpc/5iTQd3JcC5e0703zBMnxN7/ef1a5690c4813e71731171bd75a43dd6/placeholders.dev-1280x720.png?w=1920&q=60&fm=webp" },
    { name: "FutureTech", logo: "https://images.ctfassets.net/ihx0a8chifpc/5iTQd3JcC5e0703zBMnxN7/ef1a5690c4813e71731171bd75a43dd6/placeholders.dev-1280x720.png?w=1920&q=60&fm=webp" },
    { name: "CodeMagic", logo: "https://images.ctfassets.net/ihx0a8chifpc/5iTQd3JcC5e0703zBMnxN7/ef1a5690c4813e71731171bd75a43dd6/placeholders.dev-1280x720.png?w=1920&q=60&fm=webp" },
    { name: "RoboWizards", logo: "https://images.ctfassets.net/ihx0a8chifpc/5iTQd3JcC5e0703zBMnxN7/ef1a5690c4813e71731171bd75a43dd6/placeholders.dev-1280x720.png?w=1920&q=60&fm=webp" },
    { name: "DigitalSpells", logo: "https://images.ctfassets.net/ihx0a8chifpc/5iTQd3JcC5e0703zBMnxN7/ef1a5690c4813e71731171bd75a43dd6/placeholders.dev-1280x720.png?w=1920&q=60&fm=webp" },
  ];

  const team = [
    { name: "Alex Merlin", role: "Event Director", image: "https://images.ctfassets.net/ihx0a8chifpc/5iTQd3JcC5e0703zBMnxN7/ef1a5690c4813e71731171bd75a43dd6/placeholders.dev-1280x720.png?w=1920&q=60&fm=webp" },
    { name: "Sam Spellcaster", role: "Technical Lead", image: "https://images.ctfassets.net/ihx0a8chifpc/5iTQd3JcC5e0703zBMnxN7/ef1a5690c4813e71731171bd75a43dd6/placeholders.dev-1280x720.png?w=1920&q=60&fm=webp" },
    { name: "Jordan Enchanter", role: "Marketing Head", image: "https://images.ctfassets.net/ihx0a8chifpc/5iTQd3JcC5e0703zBMnxN7/ef1a5690c4813e71731171bd75a43dd6/placeholders.dev-1280x720.png?w=1920&q=60&fm=webp" },
    { name: "Taylor Sorcerer", role: "Sponsorship Coordinator", image: "https://images.ctfassets.net/ihx0a8chifpc/5iTQd3JcC5e0703zBMnxN7/ef1a5690c4813e71731171bd75a43dd6/placeholders.dev-1280x720.png?w=1920&q=60&fm=webp" },
  ];

  return (
    <div className="bg-black text-white">
      {/* Sponsors Section */}
      <div ref={ref} className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text  bg-gradient-to-r from-purple-600 to-cyan-500 "
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            Our Magical Allies
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/60 p-4 rounded-xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.3)] flex items-center justify-center"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-full h-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>

          <motion.h2
            className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500 "
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            The Wizards Behind Avenir
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-black/60 rounded-xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,165,0,0.3)] overflow-hidden"
              >
                <div className="relative">
                  <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-yellow-500">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Sponsors;