import { useState, useEffect, useRef } from "react"
import { Calendar, Trophy, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { EnchantedHeading } from "./EnchantedHeading"
import {mAvenirBaseUrl} from "../config/api.ts"
// Event interface
interface Event {
  _id: string
  eventName: string
  description: string
  date: string
  prizePool: string
  teamsize: string
  subCategory: string
}

// Deep color schemes for different events with black background
const colorSchemes = [
  { 
    accent: "border-pink-600",
    glow: "shadow-pink-600/30",
    titleColor: "text-pink-400",
    iconBg: "bg-black",
    iconBorder: "border-pink-600",
    buttonGradient: "from-pink-700 to-pink-900",
    dotColor: "bg-pink-600"
  },
  { 
    accent: "border-fuchsia-600",
    glow: "shadow-fuchsia-600/30",
    titleColor: "text-fuchsia-400",
    iconBg: "bg-black",
    iconBorder: "border-fuchsia-600",
    buttonGradient: "from-fuchsia-700 to-fuchsia-900",
    dotColor: "bg-fuchsia-600"
  },
  { 
    accent: "border-purple-600",
    glow: "shadow-purple-600/30",
    titleColor: "text-purple-400",
    iconBg: "bg-black",
    iconBorder: "border-purple-600",
    buttonGradient: "from-purple-700 to-purple-900",
    dotColor: "bg-purple-600"
  },
  { 
    accent: "border-violet-600",
    glow: "shadow-violet-600/30",
    titleColor: "text-violet-400",
    iconBg: "bg-black",
    iconBorder: "border-violet-600",
    buttonGradient: "from-violet-700 to-violet-900",
    dotColor: "bg-violet-600"
  }
]

export default function AvenirTechFestEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [eventCount, setEventCount] = useState(0)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(mAvenirBaseUrl+"/api/v1/events")
        const data = await response.json()

        if (data && data.events && data.events.length > 0) {
          setEvents(data.events)
          setEventCount(data.results)
          // Initialize card refs array
          cardRefs.current = new Array(data.events.length).fill(null)
        }
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  useEffect(() => {
    // Auto-scroll through events every 5 seconds
    if (events.length > 0) {
      const interval = setInterval(() => {
        setCurrentEventIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % events.length
          animateCardTransition(newIndex)
          return newIndex
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [events])

  // Function to handle card animations
  const animateCardTransition = (newIndex: number) => {
    if (cardRefs.current[newIndex]) {
      cardRefs.current[newIndex]?.classList.add('animate-card-entrance')
      setTimeout(() => {
        cardRefs.current[newIndex]?.classList.remove('animate-card-entrance')
      }, 1000)
    }
  }

  // Function to manually change event
  const changeEvent = (index: number) => {
    setCurrentEventIndex(index)
    animateCardTransition(index)
  }

  // Get color scheme for current event
  const getColorScheme = (index: number) => {
    return colorSchemes[index % colorSchemes.length]
  }

  return (
    <div className="min-h-screen text-white relative bg-transparent">
      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <EnchantedHeading>Magical Events</EnchantedHeading>
          <p className="text-lg md:text-xl text-pink-200 max-w-3xl mx-auto mt-4">
            Join us for a magical journey through innovation, creativity, and technological marvels. Experience the
            future, today!
          </p>
        </div>

        {/* Main container */}
        <div className="bg-black border-2 border-purple-600 rounded-2xl shadow-2xl shadow-purple-600/20 overflow-hidden">
          {/* Stats section */}
          <div className="p-6 md:p-8 border-b-2 border-purple-600">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center transform hover:scale-105 transition-transform duration-300 p-2">
                <h3 className="text-xs sm:text-sm uppercase tracking-wider text-pink-400 font-semibold mb-1 md:mb-2">Total Events</h3>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                  {loading ? "..." : eventCount}
                </p>
              </div>

              <div className="text-center transform hover:scale-105 transition-transform duration-300 p-2">
                <h3 className="text-xs sm:text-sm uppercase tracking-wider text-pink-400 font-semibold mb-1 md:mb-2">Registration Open</h3>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-md">
                  Now
                </p>
              </div>

              <div className="flex items-center justify-center col-span-1 sm:col-span-2 md:col-span-1 mt-4 sm:mt-0">
                <Link
                  to="/events"
                  className="bg-gradient-to-r from-pink-700 to-purple-900 hover:from-pink-800 hover:to-purple-900 text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-pink-700/40 border border-pink-500 hover:animate-none"
                >
                  <span>Go to Events</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Events section */}
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold px-4 md:px-6 mt-6 text-center text-purple-400">
              Featured Events
            </h2>

            <div ref={scrollRef} className="relative h-80 sm:h-96 overflow-hidden">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-t-transparent border-pink-600 rounded-full animate-spin shadow-lg shadow-pink-600/30"></div>
                </div>
              ) : events.length > 0 ? (
                <div className="w-full h-full relative">
                  {events.map((event, index) => {
                    const colorScheme = getColorScheme(index)
                    return (
                      <div
                        key={event._id}
                        className={`absolute inset-0 transition-opacity duration-700 ${
                          index === currentEventIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col">
                          <div 
                            ref={(el) => { cardRefs.current[index] = el; }}
                            className={`bg-black border-2 ${colorScheme.accent} p-4 sm:p-6 md:p-8 rounded-xl shadow-xl ${colorScheme.glow} h-full transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]`}
                          >
                            <div className="mb-3 md:mb-4 flex gap-2 flex-wrap">
                              <span className={`inline-block px-3 py-1 bg-gradient-to-r ${colorScheme.buttonGradient} rounded-full text-xs sm:text-sm font-medium shadow-md border border-white/20`}>
                                {event.subCategory}
                              </span>
                            </div>

                            <h3 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 ${colorScheme.titleColor} drop-shadow-sm`}>
                              {event.eventName}
                            </h3>

                            <p className="text-white/90 mb-4 md:mb-6 line-clamp-2 text-sm sm:text-base leading-relaxed">
                              {event.description}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 text-xs sm:text-sm mt-auto">
                              <div className={`flex items-center gap-2 sm:gap-3 ${colorScheme.iconBg} p-2 sm:p-3 rounded-lg border ${colorScheme.iconBorder}`}>
                                <Calendar size={16} className="text-white flex-shrink-0" />
                                <span className="text-white font-medium truncate">{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                              <div className={`flex items-center gap-2 sm:gap-3 ${colorScheme.iconBg} p-2 sm:p-3 rounded-lg border ${colorScheme.iconBorder}`}>
                                <Trophy size={16} className="text-white flex-shrink-0" />
                                <span className="text-white font-medium truncate">{event.prizePool}</span>
                              </div>
                              <div className={`flex items-center gap-2 sm:gap-3 ${colorScheme.iconBg} p-2 sm:p-3 rounded-lg border ${colorScheme.iconBorder}`}>
                                <Users size={16} className="text-white flex-shrink-0" />
                                <span className="text-white font-medium truncate">{event.teamsize}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Navigation dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {events.map((_, idx) => {
                      const colorScheme = getColorScheme(idx)
                      return (
                        <button
                          key={idx}
                          onClick={() => changeEvent(idx)}
                          className={`h-3 rounded-full transition-all duration-300 transform ${
                            idx === currentEventIndex 
                              ? `w-6 ${colorScheme.dotColor} shadow-lg ${colorScheme.glow} scale-110` 
                              : "w-3 bg-white/30 hover:bg-white/50"
                          }`}
                          aria-label={`View event ${idx + 1}`}
                        />
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-lg">No events found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation keyframes via style tag */}
      <style>{`
        @keyframes card-entrance {
          0% {
            transform: translateY(20px) scale(0.95);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) scale(1.02);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        .animate-card-entrance {
          animation: card-entrance 0.8s ease-out forwards;
        }
        
        @keyframes neon-pulse {
          0%, 100% {
            box-shadow: 0 0 5px theme('colors.pink.600'), 0 0 10px theme('colors.pink.600');
          }
          50% {
            box-shadow: 0 0 15px theme('colors.pink.600'), 0 0 20px theme('colors.pink.600');
          }
        }
        
        .neon-border {
          animation: neon-pulse 2s infinite;
        }
      `}</style>
    </div>
  )
}