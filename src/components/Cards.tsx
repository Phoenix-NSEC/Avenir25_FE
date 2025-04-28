// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Calendar,
//   Clock,
//   MapPin,
//   Users,
//   ArrowRight,
//   X,
//   Sparkles,
// } from "lucide-react";
// // import { useMediaQuery } from "@/hooks/use-media-query"

// type Event = {
//   id: number;
//   title: string;
//   category: string;
//   description: string;
//   date: string;
//   time: string;
//   venue: string;
//   teamSize: string;
//   image: string;
// };

// const events: Event[] = [
//   {
//     id: 1,
//     title: "Hackathon: Mystic Code",
//     category: "Coding",
//     description:
//       "A 24-hour coding marathon where teams build magical tech solutions to real-world problems. Bring your coding wizardry to life!",
//     date: "April 15, 2025",
//     time: "10:00 AM - 10:00 AM (next day)",
//     venue: "Main Auditorium",
//     teamSize: "2-4 members",
//     image: "/placeholder.svg?height=400&width=600",
//   },
//   {
//     id: 2,
//     title: "Techno Illusion",
//     category: "Robotics",
//     description:
//       "Build robots that create illusions or perform seemingly magical tasks. Push the boundaries of technology and perception.",
//     date: "April 16, 2025",
//     time: "11:00 AM - 4:00 PM",
//     venue: "Robotics Lab",
//     teamSize: "3-5 members",
//     image: "/placeholder.svg?height=400&width=600",
//   },
//   {
//     id: 3,
//     title: "Cryptic Quest",
//     category: "Cybersecurity",
//     description:
//       "Solve a series of cryptographic puzzles and security challenges in this mysterious journey through the digital realm.",
//     date: "April 16, 2025",
//     time: "2:00 PM - 6:00 PM",
//     venue: "Computer Lab 2",
//     teamSize: "1-2 members",
//     image: "/placeholder.svg?height=400&width=600",
//   },
//   {
//     id: 4,
//     title: "Arcane UI",
//     category: "Design",
//     description:
//       "Design a magical user interface for a futuristic application. Blend aesthetics with functionality in this UI/UX challenge.",
//     date: "April 17, 2025",
//     time: "10:00 AM - 2:00 PM",
//     venue: "Design Studio",
//     teamSize: "1-2 members",
//     image: "/placeholder.svg?height=400&width=600",
//   },
//   {
//     id: 5,
//     title: "Mystic Bytes",
//     category: "AI & ML",
//     description:
//       "Develop AI models that can predict, generate, or recognize patterns in data that seem almost magical to the untrained eye.",
//     date: "April 17, 2025",
//     time: "11:00 AM - 5:00 PM",
//     venue: "AI Lab",
//     teamSize: "2-3 members",
//     image: "/placeholder.svg?height=400&width=600",
//   },
//   {
//     id: 6,
//     title: "Enchanted Hardware",
//     category: "Hardware",
//     description:
//       "Create innovative hardware solutions that seem to work like magic. IoT, wearables, and embedded systems welcome.",
//     date: "April 15, 2025",
//     time: "12:00 PM - 6:00 PM",
//     venue: "Electronics Lab",
//     teamSize: "2-4 members",
//     image: "/placeholder.svg?height=400&width=600",
//   },
// ];

// export default function Cards() {
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [activeCategory, setActiveCategory] = useState<string>("All");
//   const containerRef = useRef<HTMLDivElement>(null);
//   // const isMobile = useMediaQuery("(max-width: 768px)")
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   // Extract unique categories
//   useEffect(() => {
//     const uniqueCategories = Array.from(
//       new Set(events.map((event) => event.category))
//     );
//     setCategories(uniqueCategories);
//   }, []);

//   // Mouse movement effect    Cuz of media query
//   // useEffect(() => {
//   //   const handleMouseMove = (e: MouseEvent) => {
//   //     if (isMobile) return

//   //     const { clientX, clientY } = e
//   //     const { innerWidth, innerHeight } = window

//   //     // Normalize coordinates
//   //     const x = (clientX / innerWidth) * 2 - 1
//   //     const y = (clientY / innerHeight) * 2 - 1

//   //     setMousePosition({ x, y })
//   //   }

//   //   window.addEventListener("mousemove", handleMouseMove)
//   //   return () => window.removeEventListener("mousemove", handleMouseMove)
//   // }, [isMobile])

//   const filteredEvents =
//     activeCategory === "All"
//       ? events
//       : events.filter((event) => event.category === activeCategory);

//   return (
//     <section
//       id="events"
//       className="py-20 px-4 sm:px-6 relative overflow-hidden"
//     >
//       {/* Background elements */}
//       <div className="absolute top-0 left-0 w-full h-full">
//         <div
//           className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
//           style={{
//             transform: isMobile
//               ? ""
//               : `translate(${mousePosition.x * -20}px, ${
//                   mousePosition.y * -20
//                 }px)`,
//           }}
//         ></div>
//         <div
//           className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"
//           style={{
//             transform: isMobile
//               ? ""
//               : `translate(${mousePosition.x * 30}px, ${
//                   mousePosition.y * 30
//                 }px)`,
//           }}
//         ></div>
//       </div>

//       <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true, margin: "-100px" }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
//               Magical Events
//             </span>
//           </h2>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//             Discover our lineup of mystical tech events that will challenge your
//             skills and expand your horizons.
//           </p>
//         </motion.div>

//         {/* Category filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           viewport={{ once: true, margin: "-100px" }}
//           className="flex flex-wrap justify-center gap-3 mb-12"
//         >
//           <Button
//             variant={activeCategory === "All" ? "default" : "outline"}
//             onClick={() => setActiveCategory("All")}
//             className={
//               activeCategory === "All"
//                 ? "bg-gradient-to-r from-purple-600 to-cyan-500 border-none shadow-lg shadow-purple-500/20"
//                 : "border-purple-500 text-white hover:bg-purple-500/20 hover:text-white"
//             }
//           >
//             All Events
//           </Button>
//           {categories.map((category) => (
//             <Button
//               key={category}
//               variant={activeCategory === category ? "default" : "outline"}
//               onClick={() => setActiveCategory(category)}
//               className={
//                 activeCategory === category
//                   ? "bg-gradient-to-r from-purple-600 to-cyan-500 border-none shadow-lg shadow-purple-500/20"
//                   : "border-purple-500 text-white hover:bg-purple-500/20 hover:text-white"
//               }
//             >
//               {category}
//             </Button>
//           ))}
//         </motion.div>

//         {/* Events grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredEvents.map((event, index) => (
//             <motion.div
//               key={event.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.1 * index }}
//               viewport={{ once: true, margin: "-50px" }}
//               whileHover={{ y: -10, transition: { duration: 0.3 } }}
//             >
//               <Card className="bg-black/40 border border-white/10 backdrop-blur-sm overflow-hidden h-full hover:border-purple-500/50 transition-all duration-300 group shadow-lg shadow-purple-500/5 hover:shadow-purple-500/20">
//                 <div className="relative h-48 overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
//                   <div className="absolute top-4 left-4 z-20">
//                     <span className="px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-xs font-medium">
//                       {event.category}
//                     </span>
//                   </div>
//                   <motion.div
//                     className="absolute top-4 right-4 z-20 text-white/70"
//                     whileHover={{ scale: 1.2, color: "rgba(255, 255, 255, 1)" }}
//                   >
//                     <Sparkles className="h-5 w-5" />
//                   </motion.div>
//                   <img
//                     src={event.image || "/placeholder.svg"}
//                     alt={event.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                 </div>
//                 <CardHeader>
//                   <CardTitle className="text-xl text-white group-hover:text-purple-400 transition-colors">
//                     {event.title}
//                   </CardTitle>
//                   <CardDescription className="text-gray-400">
//                     {event.description.length > 100
//                       ? `${event.description.substring(0, 100)}...`
//                       : event.description}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-2 text-sm text-gray-400">
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4 text-purple-400" />
//                     <span>{event.date}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Clock className="h-4 w-4 text-purple-400" />
//                     <span>{event.time}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Users className="h-4 w-4 text-purple-400" />
//                     <span>{event.teamSize}</span>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <Button
//                     variant="ghost"
//                     className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 group"
//                     onClick={() => setSelectedEvent(event)}
//                   >
//                     <span>View Details</span>
//                     <motion.div
//                       className="ml-2 inline-flex"
//                       initial={{ x: 0 }}
//                       whileHover={{ x: 5 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <ArrowRight className="h-4 w-4" />
//                     </motion.div>
//                   </Button>
//                 </CardFooter>
//               </Card>
//             </motion.div>
//           ))}
//         </div>

//         {/* Event details modal */}
//         <AnimatePresence>
//           {selectedEvent && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
//               onClick={() => setSelectedEvent(null)}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ type: "spring", damping: 20 }}
//                 className="bg-gray-900/90 border border-purple-500/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl shadow-purple-500/10"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="relative h-64">
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white hover:text-white"
//                     onClick={() => setSelectedEvent(null)}
//                   >
//                     <X className="h-5 w-5" />
//                   </Button>
//                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
//                   <img
//                     src={selectedEvent.image || "/placeholder.svg"}
//                     alt={selectedEvent.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-6">
//                   <div className="mb-2">
//                     <span className="px-3 py-1 bg-purple-500/80 rounded-full text-xs font-medium">
//                       {selectedEvent.category}
//                     </span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-white mb-4">
//                     {selectedEvent.title}
//                   </h3>
//                   <p className="text-gray-300 mb-6">
//                     {selectedEvent.description}
//                   </p>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     <div className="bg-white/5 p-4 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors duration-300">
//                       <div className="flex items-center gap-2 mb-2">
//                         <Calendar className="h-5 w-5 text-purple-400" />
//                         <span className="font-medium text-white">Date</span>
//                       </div>
//                       <p className="text-gray-300 pl-7">{selectedEvent.date}</p>
//                     </div>
//                     <div className="bg-white/5 p-4 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors duration-300">
//                       <div className="flex items-center gap-2 mb-2">
//                         <Clock className="h-5 w-5 text-purple-400" />
//                         <span className="font-medium text-white">Time</span>
//                       </div>
//                       <p className="text-gray-300 pl-7">{selectedEvent.time}</p>
//                     </div>
//                     <div className="bg-white/5 p-4 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors duration-300">
//                       <div className="flex items-center gap-2 mb-2">
//                         <MapPin className="h-5 w-5 text-purple-400" />
//                         <span className="font-medium text-white">Venue</span>
//                       </div>
//                       <p className="text-gray-300 pl-7">
//                         {selectedEvent.venue}
//                       </p>
//                     </div>
//                     <div className="bg-white/5 p-4 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors duration-300">
//                       <div className="flex items-center gap-2 mb-2">
//                         <Users className="h-5 w-5 text-purple-400" />
//                         <span className="font-medium text-white">
//                           Team Size
//                         </span>
//                       </div>
//                       <p className="text-gray-300 pl-7">
//                         {selectedEvent.teamSize}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex flex-col sm:flex-row gap-4">
//                     <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-none flex-1 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300">
//                       Register Now
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="border-purple-500 text-white hover:bg-purple-500/20 hover:text-white flex-1 transition-all duration-300"
//                     >
//                       Add to Calendar
//                     </Button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// }
