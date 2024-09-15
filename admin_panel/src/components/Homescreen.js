import React from "react";
import Discover from "./Discover";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 1000,
});

function Homescreen() {
  return (
    <div>
      <Discover />

      {/* Footer */}
      <Footer />
    </div>
  );
}
export default Homescreen;
