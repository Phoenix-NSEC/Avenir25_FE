import { useState, useEffect, useRef } from "react"
import { Calendar, Trophy, Users } from "lucide-react"
import { Link } from "react-router-dom"
import { EnchantedHeading } from "./EnchantedHeading"

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

export default function AvenirTechFestEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [eventCount, setEventCount] = useState(0)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/events")
        const data = await response.json()

        if (data && data.events && data.events.length > 0) {
          setEvents(data.events)
          setEventCount(data.results)
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
        setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [events])

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <EnchantedHeading>Magical Events</EnchantedHeading>
          <p className="text-lg md:text-xl text-cyan-100 max-w-3xl mx-auto">
            Join us for a magical journey through innovation, creativity, and technological marvels. Experience the
            future, today!
          </p>
        </div>

        {/* Single container for stats and featured events */}
        <div className="border border-white/10 rounded-xl shadow-xl overflow-hidden">
          {/* Stats section */}
          <div className="p-6 border-b border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-cyan-200">Total Events</h3>
                <p className="text-3xl md:text-4xl font-bold text-white">{loading ? "..." : eventCount}</p>
              </div>

              <div className="text-center">
                <h3 className="text-sm uppercase tracking-wider text-cyan-200">Registration Open</h3>
                <p className="text-3xl md:text-4xl font-bold text-white">Now</p>
              </div>

              <div className="flex items-center justify-center">
                <Link
                  to="/events"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
                >
                  Go to Events
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Events section */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold p-6 text-center text-cyan-200">Featured Events</h2>

            <div ref={scrollRef} className="relative h-96 overflow-hidden">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
              ) : events.length > 0 ? (
                <div className="w-full h-full relative">
                  {events.map((event, index) => {
                    return (
                      <div
                        key={event._id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentEventIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                      >
                        <div className="absolute inset-0 p-6 md:p-10 flex flex-col ">
                          <div className="border border-white/10 p-6 rounded-xl">
                            <div className="mb-2 flex gap-2">
                              <span className="inline-block px-3 py-1 bg-pink-500 rounded-full text-sm font-medium">
                                {event.subCategory}
                              </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{event.eventName}</h3>

                            <p className="text-gray-200 mb-4 line-clamp-2">{event.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-cyan-300" />
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Trophy size={16} className="text-yellow-300" />
                                <span>{event.prizePool}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users size={16} className="text-green-300" />
                                <span>{event.teamsize}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* Navigation dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {events.map((_, idx) => (
                      <button
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-all ${idx === currentEventIndex ? "bg-white w-4" : "bg-white bg-opacity-50"
                          }`}
                        onClick={() => setCurrentEventIndex(idx)}
                      />
                    ))}
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
    </div>
  )
}
