"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const Hero = () => {
  const [mounted, setMounted] = useState(false)
  const [canvasError, setCanvasError] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  
  const [eventTitle, setEventTitle] = useState("TECH FEST")
  const [eventDate, setEventDate] = useState("April 25, 2025")
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [tempDate, setTempDate] = useState("2025-04-25T00:00")

  // Only mount the Canvas on the client side
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

  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLost = () => {
      console.warn("WebGL context lost")
      setCanvasError(true)
    }

    window.addEventListener("webglcontextlost", handleContextLost)
    return () => {
      window.removeEventListener("webglcontextlost", handleContextLost)
    }
  }, [])

  // Reset error state if user wants to try again
  const handleRetry = () => {
    setCanvasError(false)
  }
  
  const handleDateChange = (e) => {
    setTempDate(e.target.value)
  }

  const saveNewDate = () => {
    // Convert from input format to human readable format
    const date = new Date(tempDate)
    setEventDate(date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }))
    setIsCustomizing(false)
  }

  return (
    <div className="h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* Transparent background */}

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        {mounted && !canvasError ? (
          <Canvas
            dpr={[1, 2]}
            gl={{
              powerPreference: "high-performance",
              antialias: false,
              stencil: false,
              depth: true,
              alpha: true,
            }}
            camera={{ position: [0, 0, 10], fov: 50 }}
            onCreated={({ gl }) => {
              if (gl && gl.canvas) {
                gl.canvas.addEventListener("webglcontextrestored", () => {
                  console.log("WebGL context restored")
                  setCanvasError(false)
                })
              }
            }}
            performance={{ min: 0.5 }}
          >
            <RoboticFace />
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <pointLight position={[-10, -10, -10]} intensity={0.6} color="#a855f7" />
          </Canvas>
        ) : canvasError ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="bg-purple-900/70 p-6 md:p-8 rounded-xl text-center max-w-md backdrop-blur-lg border border-purple-500/30 shadow-2xl">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4">3D Experience Error</h2>
              <p className="text-purple-200 mb-6">
                We couldn't load the 3D experience. This might be due to limited GPU resources or browser compatibility.
              </p>
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-600/30"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-purple-300">Loading experience...</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl w-full">
            {/* Left Side - Content */}
            <div className="p-5 sm:p-6 md:p-8 bg-[#0f0f1a]/80 backdrop-blur-xl rounded-3xl border border-purple-900/50 shadow-2xl transform transition-all duration-500 hover:shadow-purple-600/20 hover:border-purple-800/60 mt-6 md:mt-16">
              <div className="mb-4 md:mb-6">
                <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 mb-4 text-xs font-bold tracking-wider text-purple-200 bg-purple-900/70 rounded-full shadow-lg shadow-purple-900/30 transform hover:scale-105 transition-all duration-300">
                  PHOENIX TECH CLUB PRESENTS
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 leading-tight">
                  AVENIR'25
                </h1>
                <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mb-4"></div>
                <p className="text-base md:text-lg text-purple-200 mb-4 max-w-xl leading-relaxed">
                  The annual Tech Fest of NSEC (Netaji Subhash Engineering College) organized by Phoenix. Join us for 24
                  hours of coding, creativity, and collaboration.
                </p>
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
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
                  <div className="hidden sm:block h-4 w-px bg-purple-800"></div>
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
              </div>

              {/* Dynamic Countdown timer */}
              <div className="mt-6 pt-6 md:mt-8 md:pt-8 border-t border-purple-900/50">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs md:text-sm text-purple-400">{eventTitle} STARTS IN</p>
                </div>
                
                <div className="grid grid-cols-4 gap-2 md:gap-3">
                  {[
                    { value: countdown.days, label: "DAYS" },
                    { value: countdown.hours, label: "HOURS" },
                    { value: countdown.minutes, label: "MINS" },
                    { value: countdown.seconds, label: "SECS" },
                  ].map((unit, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-white bg-purple-900/40 rounded-lg p-2 mb-1">
                        {unit.value.toString().padStart(2, "0")}
                      </div>
                      <div className="text-xxs sm:text-xs text-purple-400">{unit.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 text-xs text-purple-400/70 text-right">
                  Event date: {eventDate}
                </div>
              </div>
            </div>

            {/* Right Side - Empty space for 3D Robot Face on desktop, but mobile gets a teaser */}
            <div className="hidden lg:block"></div>
            <div className="lg:hidden flex justify-center mt-4">
              <div className="bg-purple-900/30 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 text-center">
                <p className="text-purple-300 text-xs sm:text-sm">View on desktop for the full 3D experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Robotic Face with optimized geometry and materials
const RoboticFace = () => {
  const face = useRef()
  const eyeLeft = useRef()
  const eyeRight = useRef()
  const antenna = useRef()
  const headLight = useRef()

  // Pre-create materials to avoid recreation
  const materials = useMemo(() => {
    return {
      main: new THREE.MeshStandardMaterial({
        color: "#7e22ce",
        metalness: 0.8,
        roughness: 0.2,
        emissive: "#4c1d95",
        emissiveIntensity: 0.3,
      }),
      glow: new THREE.MeshStandardMaterial({
        color: "#22d3ee",
        emissive: "#22d3ee",
        emissiveIntensity: 1.0,
      }),
      detail: new THREE.MeshStandardMaterial({
        color: "#8b5cf6",
        metalness: 0.7,
        roughness: 0.3,
      }),
      side: new THREE.MeshStandardMaterial({
        color: "#6b21a8",
        metalness: 0.9,
        roughness: 0.2,
      }),
      vent: new THREE.MeshStandardMaterial({
        color: "#4c1d95",
        metalness: 0.9,
        roughness: 0.1,
      }),
      headlight: new THREE.MeshStandardMaterial({
        color: "#f472b6",
        emissive: "#f472b6",
        emissiveIntensity: 1,
      }),
      wire1: new THREE.MeshStandardMaterial({ color: "#a855f7" }),
      wire2: new THREE.MeshStandardMaterial({ color: "#22d3ee" }),
    }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // Enhanced rotation with multiple axes
    if (face.current) {
      // Smoother rotation patterns
      face.current.rotation.y = Math.sin(t * 0.2) * 0.5 + 0.2
      face.current.rotation.x = Math.sin(t * 0.1) * 0.1
      face.current.position.y = Math.sin(t * 0.7) * 0.15
    }

    // More dynamic eye blinking
    if (eyeLeft.current && eyeRight.current) {
      // Random blinking pattern
      const shouldBlink = Math.sin(t * 2.5) > 0.95
      eyeLeft.current.scale.y = shouldBlink ? 0.1 : 1 + Math.sin(t * 1.5) * 0.1
      eyeRight.current.scale.y = shouldBlink ? 0.1 : 1 + Math.sin(t * 1.5) * 0.1

      // Eye color pulsing
      const pulseIntensity = 0.8 + Math.sin(t * 2) * 0.2
      materials.glow.emissiveIntensity = pulseIntensity
    }

    // Antenna bobbing
    if (antenna.current) {
      antenna.current.rotation.z = Math.sin(t * 3) * 0.2
    }

    // Head light pulsing
    if (headLight.current) {
      materials.headlight.emissiveIntensity = 0.7 + Math.sin(t * 1.5) * 0.3
    }
  })

  return (
    <group ref={face} position={[4, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Face Base */}
      <mesh>
        <boxGeometry args={[2, 2.5, 0.7]} />
        <primitive object={materials.main} />
      </mesh>

      {/* Side panels with bevels */}
      <mesh position={[1.05, 0, 0]}>
        <boxGeometry args={[0.1, 2.3, 0.5]} />
        <primitive object={materials.side} />
      </mesh>
      <mesh position={[-1.05, 0, 0]}>
        <boxGeometry args={[0.1, 2.3, 0.5]} />
        <primitive object={materials.side} />
      </mesh>

      {/* Face plate with improved geometry */}
      <mesh position={[0, 0, 0.4]}>
        <boxGeometry args={[1.8, 2.3, 0.1]} />
        <primitive object={materials.side} />
      </mesh>

      {/* Eyes with glow */}
      <mesh ref={eyeLeft} position={[-0.5, 0.4, 0.55]}>
        <boxGeometry args={[0.4, 0.15, 0.05]} />
        <primitive object={materials.glow} />
      </mesh>
      <mesh ref={eyeRight} position={[0.5, 0.4, 0.55]}>
        <boxGeometry args={[0.4, 0.15, 0.05]} />
        <primitive object={materials.glow} />
      </mesh>

      {/* Mouth with animation */}
      <mesh position={[0, -0.4, 0.55]}>
        <boxGeometry args={[1, 0.1, 0.05]} />
        <primitive object={materials.glow} />
      </mesh>

      {/* Additional facial features */}
      <mesh position={[0, -0.6, 0.55]}>
        <boxGeometry args={[0.6, 0.06, 0.05]} />
        <primitive object={materials.glow} />
      </mesh>

      {/* Head details with metallic finish */}
      <mesh position={[0, 1.0, 0.4]}>
        <boxGeometry args={[1.8, 0.3, 0.1]} />
        <primitive object={materials.detail} />
      </mesh>

      {/* Additional head details */}
      <mesh position={[0, -1.0, 0.4]}>
        <boxGeometry args={[1.6, 0.3, 0.1]} />
        <primitive object={materials.detail} />
      </mesh>

      {/* Side vents */}
      <mesh position={[0.8, 0, 0.4]}>
        <boxGeometry args={[0.2, 1.2, 0.12]} />
        <primitive object={materials.vent} />
      </mesh>
      <mesh position={[-0.8, 0, 0.4]}>
        <boxGeometry args={[0.2, 1.2, 0.12]} />
        <primitive object={materials.vent} />
      </mesh>

      {/* Glowing head light */}
      <mesh ref={headLight} position={[0, 0.9, 0.55]}>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
        <primitive object={materials.headlight} />
      </mesh>

      {/* Antenna with dynamic movement */}
      <group ref={antenna} position={[0, 1.4, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
          <primitive object={materials.detail} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <primitive object={materials.glow} />
        </mesh>
      </group>

      {/* Additional wires/cables */}
      {[0.3, 0, -0.3].map((x, i) => (
        <mesh key={i} position={[x, -1.3, 0.1]} rotation={[0, 0, (Math.PI / 6) * (i - 1)]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 6]} />
          <primitive object={i % 2 === 0 ? materials.wire1 : materials.wire2} />
        </mesh>
      ))}
    </group>
  )
}

export default Hero