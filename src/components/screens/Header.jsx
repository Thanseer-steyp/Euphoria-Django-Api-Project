import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import Swal from "sweetalert2";

import logo from "../assets/Logo.svg";
import searchIcon from "../assets/search.svg";
import wishlistIcon from "../assets/wishlist.svg";
import cartIcon from "../assets/cart.svg";
import accountIcon from "../assets/account.svg";
import defaultAvatar from "../assets/np2.png";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitial, setUserInitial] = useState("");
  const [fullName, setFullName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const updateHeaderData = () => {
      const token = localStorage.getItem("access");
      const firstName = localStorage.getItem("first_name");
      const lastName = localStorage.getItem("last_name");

      setIsLoggedIn(!!token);

      if (firstName && firstName.trim() !== "") {
        setUserInitial(firstName.charAt(0).toUpperCase());
        setFullName(`${firstName} ${lastName || ""}`.trim());
      } else {
        setUserInitial("");
        setFullName("");
      }
    };

    updateHeaderData();
    window.addEventListener("login-status-changed", updateHeaderData);
    return () => {
      window.removeEventListener("login-status-changed", updateHeaderData);
    };
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      fetch(
        `http://127.0.0.1:8000/api/products/search/?q=${encodeURIComponent(
          searchQuery
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setSearchResults([]);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    ["access", "refresh", "first_name", "last_name"].forEach((key) =>
      localStorage.removeItem(key)
    );
    setIsLoggedIn(false);
    setUserInitial("");
    setShowProfilePopup(false);
    navigate("/");
  };

  const handleProtectedNavigation = (path) => {
    const token = localStorage.getItem("access");
    if (!token) {
      const readablePaths = {
        "/liked-products": "your wishlist",
        "/carted-products": "your cart",
      };
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: `Please login to view ${readablePaths[path] || path}.`,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }
    navigate(path);
  };

  const handleMenuClick = (label) => {
    setActiveMenu(label);
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const toggleHamburger = () => {
    const toggled = !menuOpen;
    setMenuOpen(toggled);
    document.body.style.overflow = toggled ? "hidden" : "auto";
  };

  const toggleSearch = () => setShowSearch(!showSearch);
  const toggleProfilePopup = () => setShowProfilePopup(!showProfilePopup);

  const handleProductClick = (id) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/category/product/${id}`);
  };

  return (
    <section className="wrapper">
      <header>
        <h1>
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
        </h1>

        <ul className={`middle ${menuOpen ? "show" : ""}`}>
          {["Shop", "Men", "Women", "Combos", "Joggers"].map((label) => (
            <li key={label} className={activeMenu === label ? "active" : ""}>
              <a
                href={`/${label.toLowerCase()}`}
                onClick={() => handleMenuClick(label)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <ul className="right" style={{ position: "relative" }}>
          <li className="input" >
            <img
              src={searchIcon}
              alt="Search"
              className="searchIcon"
              onClick={toggleSearch}
              style={{ cursor: "pointer" }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className={showSearch ? "showinput" : ""}
              style={{ zIndex: 1000 }}
            />

            {searchQuery && (
              <ul
              className="listDrop"
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                zIndex: 999,
                width: "275px",
                listStyle: "none",
                padding: 0,
                marginTop: "4px",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        borderBottom: "1px solid #eee",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={`http://127.0.0.1:8000${product.image}`}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: "bold" }}>{product.name}</div>
                        <div style={{ color: "#888" }}>₹{product.price}</div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li
                    style={{
                      padding: "12px",
                      color: "#888",
                      textAlign: "center",
                    }}
                  >
                    No products found.
                  </li>
                )}
              </ul>
            )}
          </li>

          <li>
            <button
              onClick={() => handleProtectedNavigation("/liked-products")}
            >
              <img src={wishlistIcon} alt="Wishlist" />
            </button>
          </li>

          <li style={{ position: "relative" }}>
            {!isLoggedIn ? (
              <button onClick={handleLogin}>
                <img src={accountIcon} alt="Login" />
              </button>
            ) : userInitial ? (
              <div
                onClick={toggleProfilePopup}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#f6f6f6",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "26px",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                {userInitial}
              </div>
            ) : (
              <img
                src={defaultAvatar}
                alt="User"
                onClick={toggleProfilePopup}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            )}

            {showProfilePopup && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "-55px",
                  backgroundColor: "#fff",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  padding: "10px",
                  zIndex: 999,
                  minWidth: "150px",
                  textAlign: "center",
                }}
              >
                <p style={{ margin: "5px 0", fontWeight: "bold" }}>
                  {fullName || "Admin"}
                </p>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "max-content",
                    margin: "0 auto",
                    marginTop: "8px",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </li>

          <li>
            <button
              onClick={() => handleProtectedNavigation("/carted-products")}
            >
              <img src={cartIcon} alt="Cart" />
            </button>
          </li>
        </ul>

        <div
          className={`menubar ${menuOpen ? "an" : ""}`}
          onClick={toggleHamburger}
        >
          <div className={`singleBar1 ${menuOpen ? "an" : ""}`}></div>
          <div className={`singleBar2 ${menuOpen ? "an" : ""}`}></div>
          <div className={`singleBar3 ${menuOpen ? "an" : ""}`}></div>
        </div>
      </header>
    </section>
  );
};

export default Header;
