import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import TimeLine from "./components/TimeLine";
import Loader from "./components/Loader";
import AnimatedBackground from "./components/AnimatedBackground";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
// import Events from "./components/Events";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user has visited the site in this session
    const hasVisitedInSession = sessionStorage.getItem("hasVisitedInSession");

    if (!hasVisitedInSession) {
      // First time visit in this session - show loader and set the flag
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasVisitedInSession", "true");
      }, 3500);

      return () => clearTimeout(timer);
    } else {
      // Returning visitor in same session - don't show loader
      setLoading(false);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <AnimatedBackground />
      <Navbar isVisibleprop={!loading} />
      <section id="home">
        <Hero />
      </section>
      {/* <section id="events">
        <Events />
      </section> */}
      <section id="timeline">
        <TimeLine />
      </section>
      <section id="about">
        <About />
      </section>
      {/* <section id="sponsors">
        <Sponsers />
      </section> */}
      <section id="faq">
        <FAQ />
      </section>
      <section id="footer">
        <Footer />
      </section>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default App;
