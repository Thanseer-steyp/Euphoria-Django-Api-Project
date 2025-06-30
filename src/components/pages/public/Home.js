import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SkeletonProduct from "../../includes/SkeletonUI";
import MenCategory from "../../screens/MenCategory";
import WomenCategory from "../../screens/WomenCategory";
import Header from "../../screens/Header";
import HomeSlider from "../../screens/HomeSlider";
import ExploreSection from "../../screens/ExploreSection";
import NewArrivalSection from "../../screens/NewArrivalSection";
import BannerSection from "../../screens/BannerSection";
import BrandDeals from "../../screens/BrandDeals";
import SimilarProducts from "../../screens/SimilarSection";
import FeedbackSection from "../../screens/FeedbacksSection";
import Footer from "../../screens/Footer";

function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(null); // null to detect uninitialized state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);

    fetch("http://localhost:8000/categories/", {})
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Invalid category data:", data);
          setCategories([]); // fallback to empty array
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]); // fallback to empty array
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <Header />
      <HomeSlider />
      <ExploreSection />
      <NewArrivalSection />
      <BannerSection />

      {categories === null ? (
        <SkeletonProduct />
      ) : (
        <>
          <MenCategory />
          <WomenCategory />
        </>
      )}

      <BrandDeals />
      <SimilarProducts title="In the Limelight" />
      <FeedbackSection />
      <Footer />
    </>
  );
}

export default Home;
