"use client"

import { useRef, useState, useEffect } from "react"

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [eventTitle, setEventTitle] = useState("TECH FEST")
  const [eventDate, setEventDate] = useState("April 25, 2025")
  const logoRef = useRef(null)
  const ringRef = useRef(null)
  const sparklesRef = useRef(null)

  // Logo path
  const logoPath = "/Event assets/logo.png"

  // Mount effect and countdown timer
  useEffect(() => {
    setMounted(true)

    // Set up countdown timer
    const targetDate = new Date(eventDate).getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        // Event has passed
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    // Update immediately
    updateCountdown()

    // Set up interval
    const interval = setInterval(updateCountdown, 1000)

    // Clean up interval
    return () => clearInterval(interval)
  }, [eventDate])

  // Logo animation with 3D rotation and sparkles
  useEffect(() => {
    if (!mounted) return

    // Rotate logo continuously
    const logoElement = logoRef.current
    const ringElement = ringRef.current
    const sparklesElement = sparklesRef.current

    if (!logoElement || !ringElement || !sparklesElement) return

    // Logo 3D rotation animation - now primarily around Y-axis for better 3D effect
    let rotateY = 0
    let currentRotation = 0

    const animateLogo = () => {
      // Increment Y rotation for left-to-right rotation effect
      rotateY += 0.5
      currentRotation = rotateY // Track current rotation for sparkles

      // Add slight X rotation for more dimension but focus on Y rotation
      const rotateX = Math.sin(rotateY * 0.01) * 5

      logoElement.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
      requestAnimationFrame(animateLogo)
    }

    // Ring rotation animation (slower, left to right)
    let ringRotation = 0
    const animateRing = () => {
      ringRotation += 0.3
      ringElement.style.transform = `rotate(${ringRotation}deg)`
      requestAnimationFrame(animateRing)
    }

    // Enhanced sparkle animations that follow rotation
    const sparkles = sparklesElement.children
    const animateSparkles = () => {
      const rotationRadians = (currentRotation * Math.PI) / 180

      for (let i = 0; i < sparkles.length; i++) {
        const sparkle = sparkles[i]
        const speed = Number.parseFloat(sparkle.dataset.speed || "0")
        const baseX = Number.parseFloat(sparkle.dataset.baseX || "0")
        const baseY = Number.parseFloat(sparkle.dataset.baseY || "0")
        const radius = Number.parseFloat(sparkle.dataset.radius || "0")
        const offset = Number.parseFloat(sparkle.dataset.offset || "0")
        const time = Date.now() * speed * 0.001

        // Calculate position based on logo rotation
        const angle = time + offset
        const rotationEffect = Math.sin(rotationRadians + i * 0.5) * 10

        const newX = baseX + Math.sin(angle) * (radius + rotationEffect)
        const newY = baseY + Math.cos(angle) * (radius + rotationEffect)
        const scale = 0.8 + Math.sin(time * 1.5) * 0.3
        const opacity = 0.6 + Math.sin(time * 2) * 0.4

        sparkle.style.transform = `translate(${newX}px, ${newY}px) scale(${scale})`
        sparkle.style.opacity = opacity.toString()
      }

      requestAnimationFrame(animateSparkles)
    }

    // Start animations
    const logoAnimation = requestAnimationFrame(animateLogo)
    const ringAnimation = requestAnimationFrame(animateRing)
    const sparklesAnimation = requestAnimationFrame(animateSparkles)

    return () => {
      cancelAnimationFrame(logoAnimation)
      cancelAnimationFrame(ringAnimation)
      cancelAnimationFrame(sparklesAnimation)
    }
  }, [mounted])

  return (
    <div className="w-[100vw] min-h-[calc(100vh-64px)] flex items-center justify-center bg-transparent pt-16 md:pt-20 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col items-center w-full">
          {/* Logo Section - Now at the top */}
          <div className="mb-4 md:mb-4 pt-2 md:pt-2">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72">
              {/* Outer magical ring */}
              <div
                ref={ringRef}
                className="absolute inset-0 rounded-full border-4 border-transparent"
                style={{
                  background: "transparent",
                  border: "4px solid transparent",
                  boxShadow: "0 0 15px rgba(168, 85, 247, 0.3)",
                }}
              ></div>

              {/* Inner rotating ring with COMPLETELY transparent background */}
              <div className="absolute inset-4 rounded-full flex items-center justify-center overflow-hidden bg-transparent">
                {/* Enhanced sparkling effect around logo that follows rotation */}
                <div ref={sparklesRef} className="absolute inset-0">
                  {[...Array(40)].map((_, i) => {
                    const angle = (i / 40) * Math.PI * 2
                    const radius = 80 + (i % 5) * 25
                    const baseX = Math.cos(angle) * radius
                    const baseY = Math.sin(angle) * radius
                    const size = 2 + Math.random() * 10
                    const speed = 0.2 + Math.random() * 0.8
                    const offset = i * 0.3

                    // More varied magical colors
                    const colorOptions = [
                      "#a855f7", // Purple
                      "#ec4899", // Pink
                      "#6366f1", // Indigo
                      "#f472b6", // Pink lighter
                      "#8b5cf6", // Violet
                      "#d946ef", // Fuchsia
                      "#38bdf8", // Sky
                      "#fb7185", // Rose
                      "#34d399", // Emerald
                    ]
                    const color = colorOptions[i % colorOptions.length]

                    return (
                      <div
                        key={i}
                        className="absolute rounded-full shadow-lg"
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          backgroundColor: color,
                          filter: `blur(${i % 4 === 0 ? 2 : 0}px)`,
                          boxShadow: `0 0 ${5 + (i % 8)}px ${color}`,
                        }}
                        data-base-x={baseX.toString()}
                        data-base-y={baseY.toString()}
                        data-radius={radius.toString()}
                        data-speed={speed.toString()}
                        data-offset={offset.toString()}
                      ></div>
                    )
                  })}
                </div>

                {/* Additional random magical sprinkles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(30)].map((_, i) => {
                    const delay = Math.random() * 5
                    const duration = 3 + Math.random() * 7
                    const size = 1 + Math.random() * 4
                    const top = Math.random() * 100
                    const left = Math.random() * 100

                    // Random colors for magical effect
                    const colorOptions = [
                      "#a855f7", // Purple
                      "#ec4899", // Pink
                      "#6366f1", // Indigo
                      "#f472b6", // Pink lighter
                      "#8b5cf6", // Violet
                      "#d946ef", // Fuchsia
                      "#38bdf8", // Sky
                      "#fb7185", // Rose
                    ]
                    const color = colorOptions[i % colorOptions.length]

                    return (
                      <div
                        key={`sprinkle-${i}`}
                        className="absolute rounded-full"
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          backgroundColor: color,
                          top: `${top}%`,
                          left: `${left}%`,
                          boxShadow: `0 0 ${size * 2}px ${color}`,
                          animation: `sparkleTrail ${duration}s ease-in-out ${delay}s infinite`,
                        }}
                      ></div>
                    )
                  })}
                </div>

                {/* Logo container with enhanced 3D rotation and transparent background */}
                <div
                  ref={logoRef}
                  className="relative w-3/4 h-3/4 flex items-center justify-center"
                  style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Using regular img tag as requested */}
                  <img
                    src={logoPath || "/placeholder.svg"}
                    alt="Avenir Logo"
                    className="object-contain w-full h-full"
                    style={{ filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content - Now below the logo */}
          <div className="text-center px-4 sm:px-5 md:px-8 rounded-3xl shadow-2xl transform transition-all duration-500 hover:shadow-purple-600/20 bg-transparent w-full max-w-4xl mx-auto">
            {/* <div className="flex justify-center mb-4">
              <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 text-xs font-bold tracking-wider text-purple-200 bg-purple-900/70 rounded-full shadow-lg shadow-purple-900/30 transform hover:scale-105 transition-all duration-300">
                PHOENIX TECH CLUB PRESENTS
              </div>
            </div> */}

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 leading-tight">
              AVENIR'25
            </h1>

            <div className="h-1 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto mb-6"></div>

            {/* <p className="text-sm sm:text-base md:text-lg lg:text-xl text-purple-200 mb-6 leading-relaxed max-w-2xl mx-auto">
              The annual Tech Fest of NSEC (Netaji Subhash Engineering College) organized by Phoenix. Join us for 24
              hours of coding, creativity, and collaboration.
            </p> */}

            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 text-purple-300 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 011.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xs sm:text-sm md:text-base font-medium text-purple-300">APRIL 25-26, 2025</p>
              </div>
              <div className="hidden sm:block h-4 w-px bg-purple-700"></div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 text-purple-300 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-xs sm:text-sm md:text-base font-medium text-purple-300">
                  NSEC COLLEGE OF ENGINEERING
                </p>
              </div>
            </div>

            {/* Magical Animated Countdown timer */}
            <div className="mt-4 pt-4 sm:mt-6 sm:pt-6 md:mt-8 md:pt-8 border-t border-purple-500/30">
              <div className="flex justify-center items-center mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm md:text-base text-purple-200 font-medium">{eventTitle} STARTS IN</p>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                {[
                  { value: countdown.days, label: "DAYS" },
                  { value: countdown.hours, label: "HOURS" },
                  { value: countdown.minutes, label: "MINS" },
                  { value: countdown.seconds, label: "SECS" },
                ].map((unit, i) => (
                  <div key={i} className="text-center relative group">
                    {/* Magical glow behind counter */}
                    <div className="absolute inset-0 bg-purple-600/20 rounded-lg blur-lg group-hover:bg-purple-500/30 transition-all duration-300"></div>

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 animate-spin-slow opacity-70"></div>
                    </div>

                    {/* Counter content */}
                    <div className="relative text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white bg-purple-900/80 backdrop-blur rounded-lg p-1 sm:p-2 md:p-3 border border-purple-500/40 shadow-lg overflow-hidden z-10">
                      {/* Sparkle elements */}
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(3)].map((_, j) => (
                          <div
                            key={j}
                            className="absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full opacity-0"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animation: `sparkleFloat ${2 + Math.random() * 2}s infinite ${Math.random() * 2}s`,
                            }}
                          ></div>
                        ))}
                      </div>

                      {/* Number with popping animation on change */}
                      <div className="relative animate-pop-in">{unit.value.toString().padStart(2, "0")}</div>
                    </div>
                    <div className="text-[8px] xs:text-xxs sm:text-xs md:text-sm text-purple-300 font-medium mt-1 sm:mt-2">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 sm:mt-4 text-[10px] xs:text-xs md:text-sm text-purple-400/80 text-center">
                Event date: {eventDate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes sparkleFloat {
          0%, 100% { 
            opacity: 0;
            transform: scale(0.5);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
        
        @keyframes pop-in {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pop-in {
          animation: pop-in 0.5s ease-out;
        }
        
        /* Additional sparkle animations */
        @keyframes sparkleTrail {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          50% {
            opacity: 1;
            transform: translate(${Math.random() > 0.5 ? "-" : ""}${10 + Math.random() * 20}px, 
                         ${Math.random() > 0.5 ? "-" : ""}${10 + Math.random() * 20}px) 
                scale(1.5);
          }
          100% {
            opacity: 0;
            transform: translate(${Math.random() > 0.5 ? "-" : ""}${20 + Math.random() * 40}px, 
                         ${Math.random() > 0.5 ? "-" : ""}${20 + Math.random() * 40}px) 
                scale(0);
          }
        }
        
        /* Text animation for better hierarchy */
        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(168, 85, 247, 0.5);
          }
          50% {
            text-shadow: 0 0 15px rgba(168, 85, 247, 0.8);
          }
        }
        
        /* Extra small screens */
        @media (max-width: 375px) {
          .text-xxs {
            font-size: 0.65rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Hero

