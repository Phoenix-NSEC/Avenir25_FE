"use client";
import axios from "axios";
import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  X,
  Sparkles,
} from "lucide-react";

type Member = {
  name: string;
  info: string;
};

type Event = {
  _id: string;
  title: string;
  category: string;
  subcategory?: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  teamSize: string;
  isTeamEvent: boolean;
  image: string;
};

type RegistrationSingleData = {
  event: string;
  name: string;
  collegeName: string;
  whatsappNumber: string;
  alternateNumber: string;
  email: string;
  payment: string;
  isVerified: boolean;
};

type RegistrationTeamData = {
  event: string;
  teamName: string;
  teamLeaderName: string;
  collegeName: string;
  whatsappNumber: string;
  alternateNumber: string;
  email: string;
  payment: string;
  isVerified: boolean;
  members: Member[];
};

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // For registration form
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState<
    RegistrationSingleData | RegistrationTeamData
  >({
    event: "",
    name: "",
    collegeName: "",
    whatsappNumber: "",
    alternateNumber: "",
    email: "",
    payment: "unpaid",
    isVerified: false,
  });
  const [teamMembers, setTeamMembers] = useState<Member[]>([
    { name: "", info: "" },
  ]);
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/v1/events");
        console.log(response);
        const data = await response.data;
        setEvents(data.events);

        // Extract unique categories
        const uniqueCategories: string[] = Array.from(
          new Set(data.events.map((event: Event) => event.category))
        );
        setCategories(uniqueCategories);

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on selected category
  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((event) => event.category === activeCategory);

  // Handle form input changes for individual registration
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle team member changes
  const handleTeamMemberChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setTeamMembers(updatedMembers);
  };

  // Add new team member field
  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", info: "" }]);
  };

  // Remove team member field
  const removeTeamMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  // Handle payment image upload
  const handlePaymentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentImage(e.target.files[0]);
    }
  };

  // Handle registration form submission
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegistrationError(null);

    try {
      // Upload payment image first if available
      let paymentUrl = "";
      if (paymentImage) {
        const formData = new FormData();
        formData.append("payment", paymentImage);

        const uploadResponse = await fetch(
          "http://127.0.0.1:3000/api/v1/registration/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Payment image upload failed");
        }

        const uploadData = await uploadResponse.json();
        paymentUrl = uploadData.data.url;
      }

      // Prepare registration data
      const registrationData = selectedEvent?.isTeamEvent
        ? {
            event: selectedEvent.title,
            teamName: (formData as RegistrationTeamData).teamName || "",
            teamLeaderName:
              (formData as RegistrationTeamData).teamLeaderName || "",
            collegeName: formData.collegeName,
            whatsappNumber: formData.whatsappNumber,
            alternateNumber: formData.alternateNumber,
            email: formData.email,
            payment: paymentUrl ? "paid" : "unpaid",
            isVerified: false,
            members: teamMembers,
          }
        : {
            event: selectedEvent?.title || "",
            name: (formData as RegistrationSingleData).name || "",
            collegeName: formData.collegeName,
            whatsappNumber: formData.whatsappNumber,
            alternateNumber: formData.alternateNumber,
            email: formData.email,
            payment: paymentUrl ? "paid" : "unpaid",
            isVerified: false,
          };

      // Submit registration
      const endpoint = selectedEvent?.isTeamEvent
        ? "http://127.0.0.1:3000/api/v1/registration/multi"
        : "http://127.0.0.1:3000/api/v1/registration/single";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // Registration successful
      setRegistrationSuccess(true);
      setShowRegistrationForm(false);

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
      });
      setTeamMembers([{ name: "", info: "" }]);
      setPaymentImage(null);
    } catch (err) {
      setRegistrationError(
        err instanceof Error ? err.message : "Registration failed"
      );
    }
  };

  // Open registration form
  const openRegistrationForm = () => {
    if (selectedEvent) {
      setShowRegistrationForm(true);

      // Initialize form data based on event type
      if (selectedEvent.isTeamEvent) {
        setFormData({
          event: selectedEvent.title,
          teamName: "",
          teamLeaderName: "",
          collegeName: "",
          whatsappNumber: "",
          alternateNumber: "",
          email: "",
          payment: "unpaid",
          isVerified: false,
          members: [],
        });
        setTeamMembers([{ name: "", info: "" }]);
      } else {
        setFormData({
          event: selectedEvent.title,
          name: "",
          collegeName: "",
          whatsappNumber: "",
          alternateNumber: "",
          email: "",
          payment: "unpaid",
          isVerified: false,
        });
      }
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-t-2 border-purple-500 border-r-2 border-t-purple-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-300">Loading events...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg">
            <p className="text-red-300">Failed to load events: {error}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="events"
      className="py-20 px-4 sm:px-6 relative overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
              Magical Events
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Discover our lineup of mystical tech events that will challenge your
            skills and expand your horizons.
          </p>
        </motion.div>

        {/* Registration success message */}
        {registrationSuccess && (
          <div className="mb-8 bg-green-500/20 border border-green-500 p-4 rounded-lg">
            <p className="text-green-300 text-center">
              Registration submitted successfully!
            </p>
            <button
              className="mt-2 mx-auto block px-4 py-1 bg-green-500/30 text-green-300 rounded hover:bg-green-500/40"
              onClick={() => setRegistrationSuccess(false)}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            className={`px-4 py-2 rounded ${
              activeCategory === "All"
                ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                : "border border-purple-500 text-white hover:bg-purple-500/20"
            }`}
            onClick={() => setActiveCategory("All")}
          >
            All Events
          </button>
          {categories.map((category,index) => (
            <button
              key={category||index}
              className={`px-4 py-2 rounded ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-cyan-500 text-white"
                  : "border border-purple-500 text-white hover:bg-purple-500/20"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event._id||index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden h-full hover:border-purple-500/50 transition-all duration-300 group shadow-lg shadow-purple-500/5 hover:shadow-purple-500/20">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                  </div>
                  <motion.div
                    className="absolute top-4 right-4 z-20 text-white/70"
                    whileHover={{ scale: 1.2, color: "rgba(255, 255, 255, 1)" }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </motion.div>
                  <img
                    src={event.image || "/api/placeholder/400/300"}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl text-white group-hover:text-purple-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-400">
                    {event.description.length > 100
                      ? `${event.description.substring(0, 100)}...`
                      : event.description}
                  </p>
                  <div className="space-y-2 text-sm text-gray-400 mt-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-400" />
                      <span>{event.teamSize}</span>
                    </div>
                  </div>
                  <button
                    className="w-full mt-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-2 rounded hover:bg-gradient-to-l transition-all duration-300"
                    onClick={() => setSelectedEvent(event)}
                  >
                    View Details
                    <ArrowRight className="inline-block ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Event details modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-gray-900/90 border border-purple-500/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl shadow-purple-500/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64">
                  <button
                    className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                    onClick={() => setSelectedEvent(null)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
                  <img
                    src={selectedEvent.image || "/api/placeholder/800/400"}
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-purple-500/80 rounded-full text-xs font-medium">
                      {selectedEvent.category}
                    </span>
                    {selectedEvent.subcategory && (
                      <span className="ml-2 px-3 py-1 bg-cyan-500/80 rounded-full text-xs font-medium">
                        {selectedEvent.subcategory}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {selectedEvent.title}
                  </h3>
                  <p className="text-gray-300 mb-6">
                    {selectedEvent.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 p-4 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-purple-400" />
                        <span className="font-medium text-white">Date</span>
                      </div>
                      <p className="text-gray-300 pl-7">{selectedEvent.date}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-purple-400" />
                        <span className="font-medium text-white">Time</span>
                      </div>
                      <p className="text-gray-300 pl-7">{selectedEvent.time}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-purple-400" />
                        <span className="font-medium text-white">Venue</span>
                      </div>
                      <p className="text-gray-300 pl-7">
                        {selectedEvent.venue}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5 text-purple-400" />
                        <span className="font-medium text-white">
                          Team Size
                        </span>
                      </div>
                      <p className="text-gray-300 pl-7">
                        {selectedEvent.teamSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white py-2 rounded flex-1"
                      onClick={openRegistrationForm}
                    >
                      Register Now
                    </button>
                    <button className="border border-purple-500 text-white hover:bg-purple-500/20 hover:text-white flex-1 py-2 rounded">
                      Add to Calendar
                    </button>
                  </div>
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowRegistrationForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-gray-900/90 border border-purple-500/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl shadow-purple-500/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Register for {selectedEvent.title}
                    </h3>
                    <button
                      className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                      onClick={() => setShowRegistrationForm(false)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {registrationError && (
                    <div className="mb-6 bg-red-500/20 border border-red-500 p-4 rounded-lg">
                      <p className="text-red-300">{registrationError}</p>
                    </div>
                  )}

                  <form
                    onSubmit={handleRegistrationSubmit}
                    className="space-y-4"
                  >
                    {/* Individual event registration form */}
                    {!selectedEvent.isTeamEvent ? (
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-gray-300 mb-1"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={
                              (formData as RegistrationSingleData).name || ""
                            }
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-purple-500/30 rounded p-2 text-white"
                          />
                        </div>
                      </div>
                    ) : (
                      // Team event registration form
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="teamName"
                            className="block text-gray-300 mb-1"
                          >
                            Team Name
                          </label>
                          <input
                            type="text"
                            id="teamName"
                            name="teamName"
                            required
                            value={
                              (formData as RegistrationTeamData).teamName || ""
                            }
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-purple-500/30 rounded p-2 text-white"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="teamLeaderName"
                            className="block text-gray-300 mb-1"
                          >
                            Team Leader Name
                          </label>
                          <input
                            type="text"
                            id="teamLeaderName"
                            name="teamLeaderName"
                            required
                            value={
                              (formData as RegistrationTeamData)
                                .teamLeaderName || ""
                            }
                            onChange={handleInputChange}
                            className="w-full bg-gray-800/50 border border-purple-500/30 rounded p-2 text-white"
                          />
                        </div>

                        {/* Team members */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <label className="block text-gray-300">
                              Team Members
                            </label>
                            <button
                              type="button"
                              onClick={addTeamMember}
                              className="text-sm bg-purple-500/30 hover:bg-purple-500/50 text-white rounded px-3 py-1"
                            >
                              + Add Member
                            </button>
                          </div>

                          {teamMembers.map((member, index) => (
                            <div
                              key={index}
                              className="p-4 bg-gray-800/30 border border-purple-500/20 rounded"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="text-gray-300">
                                  Member {index + 1}
                                </h4>
                                {index > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => removeTeamMember(index)}
                                    className="text-red-400 hover:text-red-300"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-gray-400 text-sm mb-1">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={member.name}
                                    onChange={(e) =>
                                      handleTeamMemberChange(
                                        index,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded p-2 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="block text-gray-400 text-sm mb-1">
                                    Role/Info
                                  </label>
                                  <input
                                    type="text"
                                    value={member.info}
                                    onChange={(e) =>
                                      handleTeamMemberChange(
                                        index,
                                        "info",
                                        e.target.value
                                      )
                                    }
                                    className="w-full bg-gray-800/50 border border-purple-500/30 rounded p-2 text-white"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Common fields for both individual and team registration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="collegeName"
                          className="block text-gray-300 mb-1"
                        >
                          College Name
                        </label>
                        <input
                          type="text"
                          id="collegeName"
                          name="collegeName"
                          required
                          value={formData.collegeName}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/50 border border-purple-500/30 rounded p-2 text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-300 mb-1"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/50 border border-purple-500/30 rounded p-2 text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="whatsappNumber"
                          className="block text-gray-300 mb-1"
                        >
                          WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          id="whatsappNumber"
                          name="whatsappNumber"
                          required
                          value={formData.whatsappNumber}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/50 border border-purple-500/30 rounded p-2 text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="alternateNumber"
                          className="block text-gray-300 mb-1"
                        >
                          Alternate Number
                        </label>
                        <input
                          type="tel"
                          id="alternateNumber"
                          name="alternateNumber"
                          value={formData.alternateNumber}
                          onChange={handleInputChange}
                          className="w-full bg-gray-800/50 border border-purple-500/30 rounded p-2 text-white"
                        />
                      </div>
                    </div>

                    {/* Payment upload */}
                    <div>
                      <label
                        htmlFor="paymentProof"
                        className="block text-gray-300 mb-1"
                      >
                        Payment Proof
                      </label>
                      <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          id="paymentProof"
                          accept="image/*"
                          onChange={handlePaymentImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="paymentProof"
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col items-center justify-center gap-2">
                            {paymentImage ? (
                              <>
                                <img
                                  src={
                                    URL.createObjectURL(paymentImage) ||
                                    "/placeholder.svg"
                                  }
                                  alt="Payment proof"
                                  className="max-h-32 object-contain mb-2"
                                />
                                <p className="text-sm text-green-400">
                                  ✓ Image uploaded
                                </p>
                              </>
                            ) : (
                              <>
                                <div className="p-3 rounded-full bg-purple-500/20">
                                  <ArrowRight className="h-6 w-6 text-purple-400" />
                                </div>
                                <p className="text-gray-300">
                                  Click to upload payment proof
                                </p>
                                <p className="text-xs text-gray-500">
                                  Supported formats: JPG, PNG
                                </p>
                              </>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white py-2 px-6 rounded"
                      >
                        Submit Registration
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
