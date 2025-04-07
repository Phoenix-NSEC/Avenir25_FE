import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function Loader({ logoPath = "/Event assets/logo.png" }) {
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef(null)
  const [loadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(intervalRef.current)
          setLoadingComplete(true)
          return 100
        }
        return newProgress
      })
    }, 200)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
    >
      {/* 3D Magic circle - Centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d"
          }}
          animate={
            loadingComplete
              ? {
                  scale: [1, 1.2, 20],
                  opacity: [1, 1, 0],
                }
              : {}
          }
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
        >
          {/* Responsive sizing for the rings - using viewport units */}
          {/* 3D Outer ring */}
          <motion.div
            className="absolute rounded-full border-4 border-purple-500"
            style={{ 
              width: "min(300px, 80vw)", 
              height: "min(300px, 80vw)",
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.5)",
              transformStyle: "preserve-3d"
            }}
            animate={{ 
              rotateY: 360,
              rotateX: 15,
              borderWidth: [4, 6, 4],
              boxShadow: ["0 0 20px rgba(147, 51, 234, 0.5)", "0 0 40px rgba(147, 51, 234, 0.7)", "0 0 20px rgba(147, 51, 234, 0.5)"]
            }}
            transition={{ 
              rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 10, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
              borderWidth: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* 3D Middle ring */}
          <motion.div
            className="absolute rounded-full border-2 border-cyan-400"
            style={{ 
              width: "min(250px, 70vw)", 
              height: "min(250px, 70vw)",
              boxShadow: "0 0 15px rgba(34, 211, 238, 0.5)",
              transformStyle: "preserve-3d"
            }}
            animate={{ 
              rotateY: -360,
              rotateZ: 45,
              borderWidth: [2, 4, 2],
              boxShadow: ["0 0 15px rgba(34, 211, 238, 0.5)", "0 0 30px rgba(34, 211, 238, 0.7)", "0 0 15px rgba(34, 211, 238, 0.5)"]
            }}
            transition={{ 
              rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
              rotateZ: { duration: 20, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
              borderWidth: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* 3D Inner ring with runes */}
          <motion.div
            className="absolute rounded-full border-2 border-pink-500"
            style={{ 
              width: "min(200px, 60vw)", 
              height: "min(200px, 60vw)",
              boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)",
              transformStyle: "preserve-3d"
            }}
            animate={{ 
              rotateZ: 360,
              rotateX: -15,
              borderWidth: [2, 4, 2],
              boxShadow: ["0 0 15px rgba(236, 72, 153, 0.5)", "0 0 30px rgba(236, 72, 153, 0.7)", "0 0 15px rgba(236, 72, 153, 0.5)"]
            }}
            transition={{ 
              rotateZ: { duration: 10, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" },
              borderWidth: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Add runes to inner ring */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`rune-${i}`}
                className="absolute text-lg font-bold text-pink-500"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${i * 30}deg) translateX(min(100px, 30vw)) rotate(-${i * 30}deg)`,
                }}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  textShadow: ["0 0 3px rgba(236, 72, 153, 0.5)", "0 0 8px rgba(236, 72, 153, 0.8)", "0 0 3px rgba(236, 72, 153, 0.5)"]
                }}
                transition={{ 
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 },
                  textShadow: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }
                }}
              >
                {["✧", "✦", "✴", "⚛", "⚜", "⚝", "❋", "✺", "⚕", "☥", "❉", "✧"][i]}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Enhanced magic circle background glow with depth */}
          <motion.div
            className="absolute rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-400/20 blur-xl"
            style={{ 
              width: "min(280px, 75vw)", 
              height: "min(280px, 75vw)",
              filter: "blur(15px)"
            }}
            animate={{ 
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.7, 0.3],
              rotate: 360
            }}
            transition={{ 
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" }
            }}
          />
          
          {/* Enhanced inner circle core with 3D effect */}
          <motion.div
            className="absolute rounded-full bg-gradient-radial from-white via-pink-500 to-purple-700"
            style={{ 
              width: "min(160px, 45vw)", 
              height: "min(160px, 45vw)",
              filter: "blur(5px)"
            }}
            animate={{ 
              scale: [0.7, 1, 0.7],
              opacity: [0.5, 0.8, 0.5],
              rotateZ: 360
            }}
            transition={{ 
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotateZ: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          />

          {/* Enhanced glowing center with pulsing effect */}
          <motion.div
            className="absolute rounded-full bg-white"
            style={{ 
              width: "min(80px, 25vw)", 
              height: "min(80px, 25vw)",
              filter: "blur(10px)"
            }}
            animate={{ 
              scale: [0.7, 1.2, 0.7],
              opacity: [0.5, 0.9, 0.5],
              boxShadow: [
                "0 0 20px rgba(255, 255, 255, 0.7)",
                "0 0 40px rgba(255, 255, 255, 0.9)",
                "0 0 20px rgba(255, 255, 255, 0.7)"
              ]
            }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />
          
          {/* Fixed logo positioning - perfectly centered */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10 flex h-auto w-auto -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{
              width: "min(120px, 35vw)",
              height: "min(120px, 35vw)"
            }}
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <img 
              src={logoPath} 
              alt="Logo" 
              className="h-full w-full object-contain drop-shadow-lg"
              style={{
                filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.8))"
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Improved arcane symbols with better positioning */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => {
          // Calculate position along a large circle
          const angle = (i / 12) * Math.PI * 2
          const radius = 42 // percent from center
          const x = 50 + Math.cos(angle) * radius
          const y = 50 + Math.sin(angle) * radius
          
          return (
            <motion.div
              key={`symbol-${i}`}
              className="absolute"
              style={{
                width: "min(40px, 10vw)",
                height: "min(40px, 10vw)",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)"
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: loadingComplete ? [0.7, 0] : [0, 0.7, 0],
                scale: loadingComplete ? [1, 5] : [0.5, 1, 0.5],
                x: loadingComplete ? Math.random() * 100 - 50 : 0,
                y: loadingComplete ? Math.random() * 100 - 50 : 0,
              }}
              transition={{ 
                opacity: { duration: loadingComplete ? 1.5 : 3, delay: i * 0.2 },
                scale: { duration: loadingComplete ? 1.5 : 3, delay: i * 0.2 },
                x: { duration: loadingComplete ? 1.5 : 0 },
                y: { duration: loadingComplete ? 1.5 : 0 },
              }}
            >
              <motion.div
                className="absolute inset-0 text-3xl flex items-center justify-center"
                style={{
                  fontFamily: "serif",
                  color: ["#9333EA", "#EC4899", "#22D3EE"][i % 3],
                  textShadow: "0 0 10px currentColor"
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                {["⚝", "⚜", "⚛", "✦", "✧", "✴", "⚕", "☥", "❉", "❋", "✺", "✧"][i]}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Enhanced magic particles with better distribution - KEEPING CLEAR OF CENTER */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => {
          // Create more intentional particle positioning
          const sector = Math.floor(i / 10) // 0-4
          const sectorSize = 72 // degrees
          const baseAngle = sector * sectorSize
          const angle = baseAngle + Math.random() * sectorSize
          const rad = angle * Math.PI / 180
          
          // Particles now start further from center (min 45% distance)
          const distance = 45 + Math.random() * 25 // % from center (45-70%)
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 8 + 2,
                height: Math.random() * 8 + 2,
                left: `50%`,
                top: `50%`,
                backgroundColor: ["#9333EA", "#EC4899", "#22D3EE"][i % 3],
                boxShadow: `0 0 5px ${["#9333EA", "#EC4899", "#22D3EE"][i % 3]}`
              }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                x: Math.cos(rad) * distance * (window.innerWidth < 600 ? 2 : 4),
                y: Math.sin(rad) * distance * (window.innerHeight < 600 ? 2 : 4),
                transform: "translate(-50%, -50%)"
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          )
        })}
      </div>

      {/* Enhanced flash effect when loading completes */}
      {loadingComplete && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-white via-white/80 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      )}

      {/* Progress container positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full px-4 sm:px-6 lg:px-8 pb-8 z-10">
        {/* Enhanced progress bar with glowing effect */}
        <div className="relative h-3 bg-gray-800/80 rounded-full overflow-hidden mb-4 shadow-inner mx-auto max-w-lg">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500"
            style={{ boxShadow: "0 0 10px rgba(245, 158, 11, 0.7)" }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-0 left-0 h-full bg-white/30"
            style={{ width: "10px", filter: "blur(8px)" }}
            initial={{ left: "0%" }}
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <motion.p
          className="text-center text-gray-300 font-medium tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {!loadingComplete 
            ? `Channeling arcane energies... ${Math.floor(progress)}%` 
            : "Portal activated..."}
        </motion.p>
      </div>
    </motion.div>
  )
}