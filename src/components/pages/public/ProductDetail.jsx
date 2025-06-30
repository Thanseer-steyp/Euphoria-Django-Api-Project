import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SkeletonProduct from "../..//includes/SkeletonUI";
import RightArrow from "../..//assets/right-arrow-light.svg";
import Star from "../..//assets/star.svg";
import StarHalf from "../..//assets/star_half.svg";
import StarOutline from "../..//assets/star_outline.svg";
import Comment from "../..//assets/message.svg";
import ArrowRight from "../..//assets/arrow-right.svg";
import Cart from "../..//assets/cart-1.svg";
import Card from "../..//assets/credit card.svg";
import Size from "../..//assets/Size&Fit.svg";
import Truck from "../..//assets/truck.svg";
import Return from "../..//assets/Free-Shipping&Returns.svg";
import SimilarProducts from "../..//screens/SimilarSection";
import ImageSelector from "../..//includes/Selector";
import TabChange from "../..//includes/TabChange";
import Header from "../..//screens/Header";
import Footer from "../..//screens/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  useEffect(() => {
    fetch(`http://localhost:8000/category/product/${productId}/`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });

    if (token) {
      fetch(
        `http://localhost:8000/category/product/${productId}/like-status/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => setLiked(data.liked))
        .catch((err) => console.error("Error fetching like status:", err));

      fetch(
        `http://localhost:8000/category/product/${productId}/cart-status/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => setInCart(data.in_cart))
        .catch((err) => console.error("Error fetching cart status:", err));
    }
  }, [productId, token]);

  const toggleLike = () => {
    if (!token) {
      toast.warn("Please login to like this product.", {
        position: "bottom-center",
        autoClose: 1500,
      });
      return;
    }

    fetch(`http://localhost:8000/category/product/${productId}/like/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked(data.liked);
        toast.success(
          data.liked ? "Added to Wishlist 💖" : "Removed from Wishlist 🤍",
          { position: "bottom-center", autoClose: 1500 }
        );
      })
      .catch((err) => {
        console.error("Error toggling like:", err);
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 1500,
        });
      });
  };

  const toggleCart = () => {
    if (!token) {
      toast.warn("Please login to add this product to your cart.", {
        position: "bottom-center",
        autoClose: 1500,
      });
      return;
    }

    if (!selectedSize || !selectedColor) {
      toast.warn("Please select both size and color.", {
        position: "bottom-center",
        autoClose: 1500,
      });
      return;
    }

    fetch(`http://localhost:8000/category/product/${productId}/cart/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selected_size: selectedSize,
        selected_color: selectedColor,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInCart(data.in_cart);
        toast.success(
          data.in_cart ? "Added to Cart 🛒" : "Removed from Cart 🧺",
          { position: "bottom-center", autoClose: 1500 }
        );
      })
      .catch((err) => {
        console.error("Error toggling cart:", err);
        toast.error("Something went wrong.", {
          position: "bottom-center",
          autoClose: 1500,
        });
      });
  };

  const handleProtectedNavigation = (path) => {
    if (!token) {
      alert("Please login to access this page.");
      return;
    }
    navigate(path);
  };

  if (loading) return <SkeletonProduct />;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Header />
      <section id="productPage" style={{ borderTop: "1px solid black" }}>
        <section className="productPage">
          <ImageSelector
            mainImage={`http://localhost:8000${product.image}`}
            alt=""
          />
          <div className="detailedImage">
            <img src={`http://localhost:8000${product.image}`} alt="Product" />
            <div className="wishImageContainer">
              <button onClick={toggleLike}>{liked ? "❤️" : "🤍"}</button>
            </div>
          </div>

          <div className="right">
            <div className="path">
              <small>Shop</small>
              <div className="arrow">
                <img src={RightArrow} alt="Right Arrow" />
              </div>
              <small>{product.gender}</small>
              <div className="arrow">
                <img src={RightArrow} alt="Right Arrow" />
              </div>
              <small>{product.name}</small>
            </div>

            <h2>{product.title}</h2>

            <div className="ratings">
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <img
                    key={star}
                    src={
                      star <= Math.floor(product.rating)
                        ? Star
                        : star - product.rating < 1
                        ? StarHalf
                        : StarOutline
                    }
                    alt="Star"
                  />
                ))}
                <small>{product.rating}</small>
              </div>

              <div className="review">
                <img src={Comment} alt="Comment Icon" />
                <small>120 comment</small>
              </div>
            </div>

            {/* Size Selection */}
            <div className="size">
              <div className="top">
                <small>Select Size</small>
                <small className="guide">Size Guide</small>
                <img src={ArrowRight} alt="Right Arrow" />
              </div>
              <div className="bottom">
                <ul className="sizes">
                  {product.sizes.map((size, index) => (
                    <li
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={selectedSize === size ? "active" : ""}
                    >
                      {size}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Color Selection */}
            <div className="colors">
              <h6>Colours Available</h6>
              <ul className="color">
                {product.colors.map((color, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={selectedColor === color ? "active" : ""}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  ></li>
                ))}
              </ul>
            </div>

            <div className="buy">
              <button className="cart" onClick={toggleCart}>
                <img src={Cart} alt="Cart" />
                {inCart ? "Remove from Cart" : "Add to Cart"}
              </button>
              <div className="price">${product.price}</div>
            </div>

            <div className="features">
              <ul>
                <li>
                  <div className="img">
                    <img src={Card} alt="Credit" />
                  </div>
                  Secure payment
                </li>
                <li>
                  <div className="img">
                    <img src={Size} alt="Size" />
                  </div>
                  Size & Fit
                </li>
                <li>
                  <div className="img">
                    <img src={Truck} alt="Truck" />
                  </div>
                  Free Shipping
                </li>
                <li>
                  <div className="img">
                    <img src={Return} alt="Return" />
                  </div>
                  Free Shipping & Returns
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="wrapper">
          <TabChange />
        </section>

        <SimilarProducts title="Similar Products" />
      </section>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default ProductDetail;
