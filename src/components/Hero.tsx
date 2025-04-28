import { useRef, useState, useEffect } from "react";

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
  const logoRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)

  // Logo path
  const logoPath = "/images/logo.png";  

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

    // Logo 3D rotation animation
    let rotateX = 0
    let rotateY = 0
    let currentRotation = 0

    const animateLogo = () => {
      rotateX += 0.3
      rotateY += 0.5
      currentRotation = rotateY // Track current rotation for sparkles
      logoElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
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
        const sparkle = sparkles[i] as HTMLElement
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
    <div className="min-h-screen w-full flex items-center justify-center bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 mt-16 sm:mt-20 md:mt-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Text Content - COMPLETELY TRANSPARENT */}
          <div className="p-5 sm:p-6 md:p-8 rounded-3xl transform transition-all duration-500 hover:shadow-purple-600/20 hover:border-purple-400/40 ">
            <div className="mb-6 md:mb-8">
              <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 mb-4 text-xs font-bold tracking-wider text-purple-200 bg-purple-900/70 rounded-full shadow-lg shadow-purple-900/30 transform hover:scale-105 transition-all duration-300">
                PHOENIX PRESENTS
              </div>
              
              {/* 3D Text Effect for AVENIR'25 */}
              <div className="relative perspective-1000 ">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight avenir-3d-text">
                  <span className="avenir-letter">A</span>
                  <span className="avenir-letter">V</span>
                  <span className="avenir-letter">E</span>
                  <span className="avenir-letter">N</span>
                  <span className="avenir-letter">I</span>
                  <span className="avenir-letter">R</span>
              
                </h1>
                
                {/* Floating particles behind the 3D text */}
                <div className="absolute inset-0 z-[-1] overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute rounded-full floating-particle"
                      style={{
                        width: `${2 + Math.random() * 4}px`,
                        height: `${2 + Math.random() * 4}px`,
                        backgroundColor: `rgba(${168 + Math.random() * 30}, ${85 + Math.random() * 40}, ${247 + Math.random() * 30}, ${0.4 + Math.random() * 0.5})`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${5 + Math.random() * 10}s`,
                        animationDelay: `${Math.random() * 5}s`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
              
              <p className="text-base md:text-lg lg:text-xl text-purple-200 mb-6 leading-relaxed">
                The annual Tech Fest of NSEC (Netaji Subhash Engineering College) organized by Phoenix. Join us for 24
                hours of coding, creativity, and collaboration.
              </p>
              <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-6">
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
                    NSEC 
                  </p>
                </div>
              </div>
            </div>

            {/* Magical Animated Countdown timer */}
            <div className="mt-6 pt-6 md:mt-8 md:pt-8 border-t border-purple-500/30">
              <div className="flex justify-center items-center mb-4">
                <p className="text-sm md:text-base text-purple-200 font-medium">{eventTitle} STARTS IN</p>
              </div>

              <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto">
                {[
                  { value: countdown.days, label: "DAYS" },
                  { value: countdown.hours, label: "HOURS" },
                  { value: countdown.minutes, label: "MIN" },
                  { value: countdown.seconds, label: "SEC" },
                ].map((unit, i) => (
                  <div key={i} className="text-center relative group">
                    {/* Magical glow behind counter */}
                    <div className="absolute inset-0 bg-purple-600/20 rounded-lg blur-lg group-hover:bg-purple-500/30 transition-all duration-300"></div>

                    {/* Animated border */}
                    {/* <div className="absolute inset-0 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 animate-spin-slow opacity-70"></div>
                    </div> */}

                    {/* Counter content */}
                    <div className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white bg-purple-900/80 backdrop-blur rounded-lg p-2 md:p-3 border border-purple-500/40 shadow-lg overflow-hidden z-10">
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
                    <div className="text-xxs sm:text-xs md:text-sm text-purple-300 font-medium mt-2">{unit.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Magical Rotating Logo with COMPLETELY TRANSPARENT Background */}
          <div className="flex justify-center items-center p-6">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
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

                {/* Logo container with 3D rotation and transparent background */}
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
                    className="object-contain rounded-full w-full h-full"
                    style={{ filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for custom animations */}
      <style>{`
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
        
        /* 3D Text Effect Styles */
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .avenir-3d-text {
          display: flex;
          justify-content: flex-start;
          transform-style: preserve-3d;
          position: relative;
          color: transparent;
        }
        
        .avenir-letter {
          display: inline-block;
          background: linear-gradient(to bottom, #c084fc, #8b5cf6);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 
            0 1px 0 #a855f7,
            0 2px 0 #9333ea,
            0 3px 0 #7e22ce,
            0 4px 0 #6b21a8,
            0 5px 0 #581c87,
            0 6px 0 #4c1d95,
            0 7px 0 #4338ca,
            0 8px 10px rgba(90, 40, 140, 0.8);
          transform-style: preserve-3d;
          position: relative;
          animation: letter-hover 3s ease-in-out infinite alternate;
          animation-delay: calc(var(--index, 0) * 0.1s);
        }
        
        .avenir-letter:nth-child(1) { --index: 1; }
        .avenir-letter:nth-child(2) { --index: 2; }
        .avenir-letter:nth-child(3) { --index: 3; }
        .avenir-letter:nth-child(4) { --index: 4; }
        .avenir-letter:nth-child(5) { --index: 5; }
        .avenir-letter:nth-child(6) { --index: 6; }
        .avenir-letter:nth-child(7) { --index: 7; }
        .avenir-letter:nth-child(8) { --index: 8; }
        .avenir-letter:nth-child(9) { --index: 9; }
        
        @keyframes letter-hover {
          0%, 100% {
            transform: translateZ(0px) translateY(0px) rotateX(0deg);
            text-shadow: 
              0 1px 0 #a855f7,
              0 2px 0 #9333ea,
              0 3px 0 #7e22ce,
              0 4px 0 #6b21a8,
              0 5px 0 #581c87,
              0 10px 10px rgba(90, 40, 140, 0.8);
          }
          50% {
            transform: translateZ(20px) translateY(-5px) rotateX(10deg);
            text-shadow: 
              0 1px 0 #a855f7,
              0 2px 0 #9333ea,
              0 3px 0 #7e22ce,
              0 4px 0 #6b21a8,
              0 5px 0 #581c87,
              0 20px 20px rgba(90, 40, 140, 0.8);
          }
        }
        
        /* Floating particles animation */
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-10px) translateX(5px);
            opacity: 0.7;
          }
          75% {
            transform: translateY(10px) translateX(-5px);
            opacity: 0.7;
          }
        }
        
        .floating-particle {
          animation: float-particle 5s ease-in-out infinite;
          filter: blur(1px);
        }
      `}</style>
    </div>
  )
}

export default Hero