import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Events from "./components/Events";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sponsers from "./components/Sponsors";
import TimeLine from "./components/TimeLine";

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
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