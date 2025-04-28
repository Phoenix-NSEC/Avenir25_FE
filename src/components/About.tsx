// "use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Calendar, Trophy, Users } from "lucide-react";
import { EnchantedHeading } from "./EnchantedHeading";
import CountUpComponent from "./CountUp";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute  pointer-events-none" />


      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <EnchantedHeading>About Avenir</EnchantedHeading>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Discover the magic behind NSEC's premier technical festival and the team that brings it to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-purple-300">The Techno-Magical Experience</h3>

            <p className="mb-4 text-white/80">
              Avenir is NSEC's flagship technical festival, bringing together the brightest minds from across the
              country to compete, collaborate, and celebrate the marvels of technology and innovation.
            </p>

            <p className="mb-4 text-white/80">
              With a unique blend of technical competitions, workshops, talks, and cultural events, Avenir creates a
              platform for students to showcase their talents, learn from experts, and push the boundaries of what's
              possible.
            </p>

            <p className="mb-6 text-white/80">
              What sets Avenir apart is our commitment to creating an immersive experience where technology meets
              creativity, where innovation meets imagination, and where the future is shaped by the brilliant minds of
              today.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: <Users className="h-8 w-8 text-purple-400 mb-2" />, value: "5000+", label: "Participants" },
                { icon: <Calendar className="h-8 w-8 text-cyan-400 mb-2" />, value: "10th", label: "Edition" },
                { icon: <Trophy className="h-8 w-8 text-yellow-400 mb-2" />, value: "50+", label: "Events" },
                { icon: <Award className="h-8 w-8 text-pink-400 mb-2" />, value: "₹10L+", label: "Prize Pool" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center p-4 bg-black/40 backdrop-blur-sm border border-purple-900/50 rounded-lg hover:border-purple-500/70 transition-colors duration-300"
                >
                  {stat.icon}
                  <span className="text-2xl font-bold text-white">
                    <CountUpComponent duration={2000} delay={index * 200}>
                      {stat.value}
                    </CountUpComponent>
                  </span>
                  <span className="text-sm text-purple-300/80">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg border-2 border-purple-900/50 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 z-10" />
              <img
                src="/images/About_Img.png"
                alt="Avenir Tech Fest"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Glowing border effect */}
              <div
                className="absolute inset-0 border-4 border-transparent rounded-lg"
                style={{
                  background: `linear-gradient(45deg, rgba(168, 85, 247, 0.4), rgba(34, 211, 238, 0.4)) border-box`,
                  WebkitMask: `linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)`,
                  WebkitMaskComposite: `xor`,
                  maskComposite: `exclude`,
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 p-6 bg-black/80 backdrop-blur-sm border border-purple-900/50 rounded-lg max-w-xs z-20 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-shadow duration-300 hidden md:block"
            >
              <h4 className="text-xl font-bold text-purple-300 mb-2">Phoenix Club</h4>
              <p className="text-white/80 text-sm">
                The organizing team behind Avenir, Phoenix is NSEC's premier technical club dedicated to fostering
                innovation and technical excellence.
              </p>
            </motion.div>


            {/* Floating decorative elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.4, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-24 -right-8 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full blur-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}