import { motion } from "framer-motion"
// Enhanced heading component inspired by sponsors component
export const EnchantedHeading = ({ children, delay = 0.3, color = "purple" }: any) => {
  const colorMap = {
    purple: "from-purple-400 via-cyan-300 to-purple-400",
    gold: "from-yellow-400 via-amber-300 to-yellow-400",
    cyan: "from-cyan-400 via-blue-300 to-cyan-400",
  }

  const bgGradient = colorMap[color as keyof typeof colorMap] || colorMap.purple

  return (
    <div className="relative mb-12">
      {/* Decorative elements */}
      

      {/* Magical stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Number.POSITIVE_INFINITY,
            delay: delay + i * 0.2,
          }}
          style={{
            top: `${-10 + Math.sin(i) * 20}px`,
            left: `${25 + ((i * 30) % 50)}%`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay }}
        className="relative z-10 text-center mb-2"
      >

        {/* Main heading with gradient text */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold inline-block relative">
          <span
            className={`text-transparent bg-clip-text bg-gradient-to-r ${bgGradient} relative z-10 animate-text-shine`}
          >
            {children}
          </span>

          {/* Subtle line underneath text */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, delay: delay + 0.4 }}
            className="h-0.5 bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 absolute -bottom-2 left-0"
          />
        </h2>
      </motion.div>

      {/* Decorative magical symbols */}
      <div className="flex justify-center mt-4">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.6 }}
          className="relative mx-2"
        >
          <div className="w-2 h-2 bg-purple-500 rotate-45 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="w-4 h-4 border border-purple-400 rotate-45 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.7 }}
          className="mx-4"
        >
          <div className="h-0.5 w-16 bg-gradient-to-r from-purple-500/0 via-purple-500 to-purple-500/0" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.8 }}
          className="relative mx-2"
        >
          <div className="w-2 h-2 bg-cyan-500 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <div className="w-4 h-4 border border-cyan-400 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </div>
    </div>
  )
}
