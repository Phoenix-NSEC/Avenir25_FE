import { AnimatePresence } from "framer-motion";
import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Events from "./components/Events";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sponsers from "./components/Sponsors";
import TimeLine from "./components/TimeLine";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

const App = () => {

  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)

    // Simulate loading time for the preloader
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  if(!mounted) return null
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <Navbar />
      <section id="home" className="pt-20 md:pt-24">
        <Hero />
      </section>
      <section id="events">
        <Events />
      </section>
      <section id="timeline">
        <TimeLine />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="sponsors">
        <Sponsers />
      </section>
      <section id="contact">
        <ContactUs />
      </section>
    </div>
  );
};

export default App;