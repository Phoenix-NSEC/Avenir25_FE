import About from "./components/About";
import ContactUs from "./components/ContactUs";
import Events from "./components/Events";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sponsers from "./components/Sponsors";
import TimeLine from "./components/TimeLine";

const App = () => {
  return <div>Avenir FE

    {/* <Navbar/> */}
    <Hero/>
    <Events/>
    <TimeLine/>
    <About/>
    <Sponsers/>
    <ContactUs/>
  </div>;
};

export default App;
