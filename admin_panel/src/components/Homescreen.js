import React from "react";
import Discover from "./Discover";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";
// ..
AOS.init({
  duration: 1000,
});

function Homescreen() {
  return (
    <div>
      <Discover />
      <Footer />
    </div>
  );
}
export default Homescreen;
