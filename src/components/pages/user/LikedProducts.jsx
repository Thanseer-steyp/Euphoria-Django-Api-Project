import { useEffect, useState } from "react";
import Header from "../../screens/Header";
import Footer from "../../screens/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LikedProducts() {
  const [likedProducts, setLikedProducts] = useState([]);
  const token = localStorage.getItem("access");

  // Fetch liked products when component mounts
  useEffect(() => {
    fetch("http://localhost:8000/liked-products/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Ensure the response is always an array
        setLikedProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching liked products:", err);
        setLikedProducts([]); // Fallback to empty array on error
      });
  }, []);

  // Handle remove (unlike) functionality
  const handleRemoveLike = (productId) => {
    fetch(`http://localhost:8000/category/product/${productId}/like/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setLikedProducts((prev) =>
          prev.filter((product) => product.id !== productId)
        );
        toast.success("Removed from liked products");
      })
      .catch((err) => {
        console.error("Error removing like:", err);
        toast.error("Failed to remove from liked");
      });
  };

  return (
    <>
      <Header />

      <section id="similar" style={{ borderTop: "1px solid black" }}>
        <section className="wrapper">
          <section className="similar" style={{ paddingTop: "40px" }}>
            <div className="top">
              <div className="violet"></div>
              <h3>Your Wishlist</h3>
            </div>

            {likedProducts.length === 0 ? (
              <p style={{ textAlign: "center", fontSize: "30px" }}>
                Your wishlist is empty.
              </p>
            ) : (
              <ul
                className="bottom"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {likedProducts.map((product) => (
                  <li key={product.id} style={{ position: "relative" }}>
                    <a
                      href={`/category/product/${product.id}`}
                      style={{ width: "100%", display: "block" }}
                    >
                      <div>
                        <img
                          src={`http://localhost:8000${product.image}`}
                          alt={product.name}
                          style={{ width: "100%", height: "350px" }}
                        />
                        <h4
                          style={{
                            textAlign: "center",
                            marginTop: "10px",
                            color: "black",
                            fontWeight: "normal",
                          }}
                        >
                          {product.name}
                        </h4>
                      </div>
                    </a>
                    <button
                      onClick={() => handleRemoveLike(product.id)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "white",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </section>
      </section>
      <ToastContainer position="bottom-center" autoClose={2000} />

      <Footer />
    </>
  );
}

export default LikedProducts;
