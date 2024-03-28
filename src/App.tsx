import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function App() {
  const currentTitle = useRef(document.title);
  const {pathname } = useLocation(); 

  // a micro interaction
  useEffect(() => {
   
    const blurFunc = () => {
      document.title = "🥺 Why'd yuh stopped looking at me!";
    };
    const focusFunc = () => {
      document.title = currentTitle.current;
    };


    window.addEventListener("blur", blurFunc);
    window.addEventListener("focus", focusFunc);
    return () => {
      window.removeEventListener("blur", blurFunc);
      window.removeEventListener("focus", focusFunc);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // restore scroll position
  }, [pathname])
  

  return (
    <div className="max-w-[1600px] mx-auto">
      <Navbar />
      <div className="mt-16 sm:mt-20 md:mt-24">
        <Outlet />
        {/* Outlet - represents childrens that are defined in router */}
      </div>
      <Footer />
    </div>
  );
}
