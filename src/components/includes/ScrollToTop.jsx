import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"; // 🔒 disables browser auto-scroll
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    return () => {
      // Optional: reset to auto if needed elsewhere
      window.history.scrollRestoration = "auto";
    };
  }, [pathname]);

  return null;
}

export default ScrollToTop;
