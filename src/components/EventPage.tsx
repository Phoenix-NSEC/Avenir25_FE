
import type React from "react"
import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {mAvenirBaseUrl} from "../config/api.ts"
import {
  Calendar,
  Users,
  ArrowRight,
  X,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Award,
  User,
  Bookmark,
  ExternalLink,
  Home,
} from "lucide-react"
import MagicalCardEffect from "./magical-card-effect"
import AnimatedBackground from "./AnimatedBackground"
import { EnchantedHeading } from "./EnchantedHeading"
// Define types based on the provided API response
type Coordinator = {
  name: string
  number: string
  _id: string
}

type Event = {
  _id: string
  eventName: string
  subCategory?: string
  description: string
  registrationFees: string
  teamsize: string
  rulebook: string
  eventPoster: string
  date: string
  prizePool: string
  coordinators: Coordinator[]
}

type Member = {
  name: string
  info: string
}

type RegistrationSingleData = {
  event: string
  name: string
  collegeName: string
  whatsappNumber: string
  alternateNumber: string
  email: string
  payment: string
  isVerified: boolean
}

type RegistrationTeamData = {
  event: string
  teamName: string
  teamLeaderName: string
  collegeName: string
  whatsappNumber: string
  alternateNumber: string
  email: string
  payment: string
  isVerified: boolean
  members: Member[]
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
    },
  },
  hover: {
    scale: 1.03,
    y: -10,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
}

// Default event image
const DEFAULT_EVENT_IMAGE = '/images/About_Img.png';
const logo = "/images/logo.png"



export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobileFilters, setIsMobileFilters] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // For registration form
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [formData, setFormData] = useState<RegistrationSingleData | RegistrationTeamData>({
    event: "",
    name: "",
    collegeName: "",
    whatsappNumber: "",
    alternateNumber: "",
    email: "",
    payment: "unpaid",
    isVerified: false,
  })
  const [teamMembers, setTeamMembers] = useState<Member[]>([{ name: "", info: "" }])
  const [paymentImage, setPaymentImage] = useState<File | null>(null)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registrationError, setRegistrationError] = useState<string | null>(null)

  // Close registration form when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (showRegistrationForm) {
        setShowRegistrationForm(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [showRegistrationForm])

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowRegistrationForm(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(mAvenirBaseUrl + "/api/v1/events")
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setEvents(data.events)
  
        // Extract unique categories from subCategory field
        const uniqueCategories: string[] = Array.from(
          new Set(data.events.map((event: Event) => event.subCategory)),
        ).filter(Boolean) as string[]
  
        setCategories(uniqueCategories)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchEvents()
  }, [])
  

  // Add this useEffect to close event details modal on scroll
useEffect(() => {
  const handleScroll = () => {
    if (selectedEvent) {
      setSelectedEvent(null);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [selectedEvent]);
  // Filter events based on selected category
  const filteredEvents =
    activeCategory === "All" ? events : events.filter((event) => event.subCategory === activeCategory)

  // Format date string to a more readable format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
  }

  // Handle form input changes for individual registration
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // Handle team member changes
  const handleTeamMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...teamMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setTeamMembers(updatedMembers)
  }

  // Add new team member field
  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", info: "" }])
  }

  // Remove team member field
  const removeTeamMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index)
    setTeamMembers(updatedMembers)
  }

  // Handle payment image upload
  const handlePaymentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentImage(e.target.files[0])
    }
  }

  // Handle registration form submission
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegistrationError(null)

    try {
      // Upload payment image first if available
      let paymentUrl = ""
      if (paymentImage) {
        const formData = new FormData()
        formData.append("payment", paymentImage)

        const uploadResponse = await fetch(mAvenirBaseUrl+"/api/v1/registration/upload", {
          method: "POST",
          body: formData,
        })

        if (!uploadResponse.ok) {
          throw new Error("Payment image upload failed")
        }

        const uploadData = await uploadResponse.json()
        paymentUrl = uploadData.data.url
      }

      // Check if it's a team event based on teamsize
      const isTeamEvent =
        selectedEvent?.teamsize &&
        selectedEvent.teamsize.includes("-") &&
        Number.parseInt(selectedEvent.teamsize.split("-")[1]) > 1

      // Prepare registration data
      const registrationData = isTeamEvent
        ? {
            event: selectedEvent?.eventName || "",
            teamName: (formData as RegistrationTeamData).teamName || "",
            teamLeaderName: (formData as RegistrationTeamData).teamLeaderName || "",
            collegeName: formData.collegeName,
            whatsappNumber: formData.whatsappNumber,
            alternateNumber: formData.alternateNumber,
            email: formData.email,
            payment: paymentUrl ? "paid" : "unpaid",
            isVerified: false,
            members: teamMembers,
          }
        : {
            event: selectedEvent?.eventName || "",
            name: (formData as RegistrationSingleData).name || "",
            collegeName: formData.collegeName,
            whatsappNumber: formData.whatsappNumber,
            alternateNumber: formData.alternateNumber,
            email: formData.email,
            payment: paymentUrl ? "paid" : "unpaid",
            isVerified: false,
          }

      // Submit registration
      const endpoint = isTeamEvent
        ? mAvenirBaseUrl+"/api/v1/registration/multi"
        : mAvenirBaseUrl+"/api/v1/registration/single"

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Registration failed")
      }

      // Registration successful
      setRegistrationSuccess(true)
      setShowRegistrationForm(false)

      // Reset form
      setFormData({
        event: "",
        name: "",
        collegeName: "",
        whatsappNumber: "",
        alternateNumber: "",
        email: "",
        payment: "unpaid",
        isVerified: false,
      })
      setTeamMembers([{ name: "", info: "" }])
      setPaymentImage(null)
    } catch (err) {
      setRegistrationError(err instanceof Error ? err.message : "Registration failed")
    }
  }

  // Open registration form
  const openRegistrationForm = () => {
    if (selectedEvent) {
      setShowRegistrationForm(true)

      // Check if it's a team event based on teamsize
      const isTeamEvent =
        selectedEvent.teamsize &&
        selectedEvent.teamsize.includes("-") &&
        Number.parseInt(selectedEvent.teamsize.split("-")[1]) > 1

      // Initialize form data based on event type
      if (isTeamEvent) {
        setFormData({
          event: selectedEvent.eventName,
          teamName: "",
          teamLeaderName: "",
          collegeName: "",
          whatsappNumber: "",
          alternateNumber: "",
          email: "",
          payment: "unpaid",
          isVerified: false,
          members: [],
        })
        setTeamMembers([{ name: "", info: "" }])
      } else {
        setFormData({
          event: selectedEvent.eventName,
          name: "",
          collegeName: "",
          whatsappNumber: "",
          alternateNumber: "",
          email: "",
          payment: "unpaid",
          isVerified: false,
        })
      }
    }
  }

  // Magical floating particles component
  const MagicalParticles = () => (
    <>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-purple-400/60"
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + (i % 5),
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.7,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + i * 4}%`,
            top: `${50 + (i % 3) * 10}%`,
            zIndex: 1,
          }}
        />
      ))}
    </>
  )

  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 relative overflow-hidden min-h-[60vh] flex items-center justify-center">
        <AnimatedBackground />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-white"
          >
            Loading Events...
          </motion.p>
        </motion.div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4 sm:px-6 relative overflow-hidden bg-transparent min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="bg-red-500/20 border border-red-500 p-6 rounded-xl shadow-lg shadow-red-500/10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              <div className="p-3 bg-red-500/30 rounded-full">
                <X className="h-8 w-8 text-red-300" />
              </div>
            </motion.div>
            <h3 className="text-xl font-semibold text-center text-red-300 mb-2">Failed to Load Events</h3>
            <p className="text-red-200 text-center mb-6">{error}</p>
            <button
              className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </section>
    )
  }

  return (
    <section id="events" className="relative overflow-hidden bg-black">
      <AnimatedBackground />
      <MagicalParticles />

      {/* Background gradients */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/5 w-64 h-64 rounded-full bg-purple-700/30 blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-700/20 blur-3xl animate-pulse"
          style={{ animationDuration: "12s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-2/3 left-1/3 w-48 h-48 rounded-full bg-blue-700/20 blur-3xl animate-pulse"
          style={{ animationDuration: "15s", animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 py-16" ref={containerRef}>
        {/* Back to Home Button */}
        <div className="mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Enhanced magical heading */}
        <EnchantedHeading>Discover Events</EnchantedHeading>

        {/* Registration success message */}
        <AnimatePresence>
          {registrationSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 bg-green-500/20 border border-green-500/40 p-5 rounded-xl shadow-lg shadow-green-500/5"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-500/20 p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-green-400" />
                </div>
                <p className="text-green-300 font-medium">Registration submitted successfully!</p>
                <button
                  className="ml-auto px-3 py-1 bg-green-500/20 text-green-300 rounded-full hover:bg-green-500/30 transition-colors"
                  onClick={() => setRegistrationSuccess(false)}
                >
                  Dismiss
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile category toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="md:hidden mb-6"
        >
          <button
            onClick={() => setIsMobileFilters(!isMobileFilters)}
            className="w-full flex items-center justify-between bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 text-white"
          >
            <span className="font-medium">Filter by Category</span>
            {isMobileFilters ? (
              <ChevronUp className="h-5 w-5 text-purple-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-purple-400" />
            )}
          </button>

          <AnimatePresence>
            {isMobileFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2 mt-3 p-2 bg-gray-800/30 rounded-xl border border-purple-500/10">
                  <button
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      activeCategory === "All"
                        ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/20"
                        : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                    }`}
                    onClick={() => {
                      setActiveCategory("All")
                      setIsMobileFilters(false)
                    }}
                  >
                    All Events
                  </button>
                  {categories.map((category, index) => (
                    <button
                      key={category || index}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        activeCategory === category
                          ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/20"
                          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                      }`}
                      onClick={() => {
                        setActiveCategory(category)
                        setIsMobileFilters(false)
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Desktop category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="hidden md:flex flex-wrap justify-center gap-3 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
              activeCategory === "All"
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/20"
                : "border border-purple-500/30 text-white hover:bg-purple-500/10"
            }`}
            onClick={() => setActiveCategory("All")}
          >
            All Events
          </motion.button>
          {categories.map((category, index) => (
            <motion.button
              key={category || index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-2.5 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/20"
                  : "border border-purple-500/30 text-white hover:bg-purple-500/10"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Events grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredEvents.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-3 text-center py-16">
              <p className="text-gray-400 text-lg">No events found in this category.</p>
            </motion.div>
          ) : (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event._id || index}
                variants={itemVariants}
                initial="rest"
                animate="rest"
                className="h-full"
              >
                <MagicalCardEffect className="h-full">
                  <motion.div
                    variants={cardHoverVariants}
                    whileHover="hover"
                    className="bg-gray-900/60 border border-white/10 backdrop-blur-sm overflow-hidden h-full rounded-2xl hover:border-purple-500/50 transition-all duration-300 group shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 flex flex-col"
                  >
                    <div className="relative h-52 overflow-hidden rounded-t-2xl">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                      <div className="absolute top-4 left-4 z-20">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-xs font-medium"
                        >
                          {event.subCategory || "Event"}
                        </motion.span>
                      </div>
                      <motion.div className="absolute top-4 right-4 z-20" whileHover={{ scale: 1.2 }}>
                        <img src={logo || "/placeholder.svg"} alt="Logo" className="h-5 w-5" />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} className="w-full h-full">
                        <img
                          src={DEFAULT_EVENT_IMAGE || "/images/About_Img.png"}
                          alt={event.eventName}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </motion.div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 group-hover:from-purple-300 group-hover:to-cyan-200 transition-colors duration-300 mb-2">
                        {event.eventName}
                      </h3>
                      <p className="text-gray-400 mb-4 flex-grow">
                        {event.description.length > 100
                          ? `${event.description.substring(0, 100)}...`
                          : event.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-purple-400" />
                          <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-purple-400" />
                          <span>{event.prizePool}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-purple-400" />
                          <span>{event.teamsize}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bookmark className="h-4 w-4 text-purple-400" />
                          <span>{event.registrationFees}</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                        onClick={() => setSelectedEvent(event)}
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 animate-pulse" />
                      </motion.button>
                    </div>
                  </motion.div>
                </MagicalCardEffect>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Event details modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-gray-900/90 border border-purple-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl shadow-purple-500/10"
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
              >
                <div className="relative h-64 sm:h-80">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 backdrop-blur-sm border border-white/10"
                    onClick={() => setSelectedEvent(null)}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
                  <img
                    src={DEFAULT_EVENT_IMAGE || "/placeholder.svg"}
                    alt={selectedEvent.eventName}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-purple-500/80 rounded-full text-xs font-medium"
                    >
                      {selectedEvent.subCategory || "Event"}
                    </motion.span>
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 bg-cyan-500/80 rounded-full text-xs font-medium"
                    >
                      {selectedEvent.registrationFees}
                    </motion.span>
                  </div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl sm:text-3xl font-bold text-white mb-4"
                  >
                    {selectedEvent.eventName}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-300 mb-8 leading-relaxed"
                  >
                    {selectedEvent.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                  >
                    <div className="bg-white/5 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300 transform hover:scale-[1.02]">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-5 w-5 text-purple-400" />
                        <span className="font-medium text-white">Date</span>
                      </div>
                      <p className="text-gray-300 pl-8">{formatDate(selectedEvent.date)}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300 transform hover:scale-[1.02]">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="h-5 w-5 text-purple-400" />
                        <span className="font-medium text-white">Prize Pool</span>
                      </div>
                      <p className="text-gray-300 pl-8">{selectedEvent.prizePool}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300 transform hover:scale-[1.02]">
                      <div className="flex items-center gap-3 mb-2">
                        <Users className="h-5 w-5 text-purple-400" />
                        <span className="font-medium text-white">Team Size</span>
                      </div>
                      <p className="text-gray-300 pl-8">{selectedEvent.teamsize}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-300 transform hover:scale-[1.02]">
                      <div className="flex items-center gap-3 mb-2">
                        <ExternalLink className="h-5 w-5 text-purple-400" />
                        <span className="font-medium text-white">Rulebook</span>
                      </div>
                      <p className="text-gray-300 pl-8">
                        <a
                          href="#"
                          className="text-purple-400 hover:text-purple-300 underline"
                          onClick={(e) => e.preventDefault()}
                        >
                          Download PDF
                        </a>
                      </p>
                    </div>
                  </motion.div>

                  {/* Coordinators */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <h4 className="text-lg font-semibold text-white mb-3">Event Coordinators</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedEvent.coordinators.map((coordinator, index) => (
                        <div
                          key={coordinator._id || index}
                          className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-purple-500/20"
                        >
                          <div className="bg-purple-500/20 p-2 rounded-full">
                            <User className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{coordinator.name}</p>
                            <p className="text-gray-400 text-sm">{coordinator.number}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 mt-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white py-3 px-6 rounded-xl flex-1 font-medium shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300"
                      onClick={openRegistrationForm}
                    >
                      Register Now
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="border border-purple-500 text-white hover:bg-purple-500/20 hover:text-white flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300"
                      onClick={() => setSelectedEvent(null)}
                    >
                      Close
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Registration form modal */}
        <AnimatePresence>
          {showRegistrationForm && selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowRegistrationForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-gray-900/90 border border-purple-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl shadow-purple-500/10"
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
              >
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-8">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-2xl font-bold text-white"
                    >
                      Register for {selectedEvent.eventName}
                    </motion.h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="bg-gray-800/70 hover:bg-gray-700/70 text-white rounded-full p-2"
                      onClick={() => setShowRegistrationForm(false)}
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>

                  {registrationError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 bg-red-500/20 border border-red-500/40 p-4 rounded-xl"
                    >
                      <p className="text-red-300">{registrationError}</p>
                    </motion.div>
                  )}

                  <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                    {/* Check if it's a team event based on teamsize */}
                    {!(
                      selectedEvent.teamsize &&
                      selectedEvent.teamsize.includes("-") &&
                      Number.parseInt(selectedEvent.teamsize.split("-")[1]) > 1
                    ) ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-4"
                      >
                        <div>
                          <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={(formData as RegistrationSingleData).name || ""}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                          />
                        </div>
                      </motion.div>
                    ) : (
                      // Team event registration form
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                      >
                        <div>
                          <label htmlFor="teamName" className="block text-gray-300 mb-2 font-medium">
                            Team Name
                          </label>
                          <input
                            type="text"
                            id="teamName"
                            name="teamName"
                            required
                            value={(formData as RegistrationTeamData).teamName || ""}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="teamLeaderName" className="block text-gray-300 mb-2 font-medium">
                            Team Leader Name
                          </label>
                          <input
                            type="text"
                            id="teamLeaderName"
                            name="teamLeaderName"
                            required
                            value={(formData as RegistrationTeamData).teamLeaderName || ""}
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                          />
                        </div>

                        {/* Team members */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="block text-gray-300 font-medium">Team Members</label>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              type="button"
                              onClick={addTeamMember}
                              className="text-sm bg-purple-500/30 hover:bg-purple-500/50 text-white rounded-lg px-4 py-2 transition-colors"
                            >
                              + Add Member
                            </motion.button>
                          </div>

                          {teamMembers.map((member, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className="p-4 bg-gray-800/30 border border-purple-500/20 rounded-xl"
                            >
                              <div className="flex justify-between items-center mb-3">
                                <h4 className="text-gray-300 font-medium">Member {index + 1}</h4>
                                {index > 0 && (
                                  <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    type="button"
                                    onClick={() => removeTeamMember(index)}
                                    className="text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 p-1.5 rounded-full transition-colors"
                                  >
                                    <X className="h-4 w-4" />
                                  </motion.button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-gray-400 text-sm mb-1">Name</label>
                                  <input
                                    type="text"
                                    required
                                    value={member.name}
                                    onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg p-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                  />
                                </div>
                                <div>
                                  <label className="block text-gray-400 text-sm mb-1">Role/Info</label>
                                  <input
                                    type="text"
                                    value={member.info}
                                    onChange={(e) => handleTeamMemberChange(index, "info", e.target.value)}
                                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg p-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                  />
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Common fields for both individual and team registration */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    >
                      <div>
                        <label htmlFor="collegeName" className="block text-gray-300 mb-2 font-medium">
                          College Name
                        </label>
                        <input
                          type="text"
                          id="collegeName"
                          name="collegeName"
                          required
                          value={formData.collegeName}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="whatsappNumber" className="block text-gray-300 mb-2 font-medium">
                          WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          id="whatsappNumber"
                          name="whatsappNumber"
                          required
                          value={formData.whatsappNumber}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="alternateNumber" className="block text-gray-300 mb-2 font-medium">
                          Alternate Number
                        </label>
                        <input
                          type="tel"
                          id="alternateNumber"
                          name="alternateNumber"
                          value={formData.alternateNumber}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/50 border border-purple-500/30 rounded-xl p-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                        />
                      </div>
                    </motion.div>

                    {/* Payment upload */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="paymentProof" className="block text-gray-300 mb-2 font-medium">
                        Payment Proof ({selectedEvent.registrationFees})
                      </label>
                      <motion.div
                        whileHover={{ borderColor: "rgba(168, 85, 247, 0.5)" }}
                        className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 text-center"
                      >
                        <input
                          type="file"
                          id="paymentProof"
                          accept="image/*"
                          onChange={handlePaymentImageChange}
                          className="hidden"
                        />
                        <label htmlFor="paymentProof" className="cursor-pointer">
                          <div className="flex flex-col items-center justify-center gap-3">
                            {paymentImage ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full"
                              >
                                <img
                                  src={URL.createObjectURL(paymentImage) || "/placeholder.svg"}
                                  alt="Payment proof"
                                  className="max-h-40 object-contain mb-3 mx-auto rounded-lg border border-purple-500/30"
                                />
                                <p className="text-sm text-green-400 flex items-center justify-center gap-1">
                                  <Sparkles className="h-4 w-4" />
                                  Image uploaded successfully
                                </p>
                              </motion.div>
                            ) : (
                              <>
                                <motion.div
                                  whileHover={{ scale: 1.05, y: -5 }}
                                  className="p-4 rounded-full bg-purple-500/20 mb-2"
                                >
                                  <ArrowRight className="h-6 w-6 text-purple-400" />
                                </motion.div>
                                <p className="text-gray-300 font-medium">Click to upload payment proof</p>
                                <p className="text-xs text-gray-500">Supported formats: JPG, PNG</p>
                              </>
                            )}
                          </div>
                        </label>
                      </motion.div>
                    </motion.div>

                    {/* Submit button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex justify-end mt-8"
                    >
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white py-3 px-8 rounded-xl font-medium shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-300"
                      >
                        Submit Registration
                      </motion.button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
