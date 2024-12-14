import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-3 md:right-6">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-2 md:p-3 rounded-full bg-secondary text-white shadow-lg text-sm md:text-2xl"
        >
          <FaArrowUp  />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
