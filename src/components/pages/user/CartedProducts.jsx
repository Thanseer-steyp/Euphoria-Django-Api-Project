import { useEffect, useState } from "react";
import Header from "../../screens/Header";
import Footer from "../../screens/Footer";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartedProducts() {
  const [cartedProducts, setCartedProducts] = useState([]);
  const token = localStorage.getItem("access");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8000/carted-products/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Ensure the response is always an array
        setCartedProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching carted products:", err);
        setCartedProducts([]); // Fallback to empty array on error
      });
  }, [token]);

  const handleRemoveFromCart = (productId, selectedSize, selectedColor) => {
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
      .then(() => {
        setCartedProducts((prev) =>
          prev.filter(
            (item) =>
              item.product.id !== productId ||
              item.selected_size !== selectedSize ||
              item.selected_color !== selectedColor
          )
        );
        toast.success("Product removed from cart");
      })
      .catch((err) => {
        console.error("Error removing from cart:", err);
        toast.error("Failed to remove product");
      });
  };

  if (!token) return null;

  return (
    <>
      <Header />

      <section id="similar" style={{ borderTop: "1px solid black" }}>
        <section className="wrapper">
          <section className="similar" style={{ paddingTop: "40px" }}>
            <div className="top">
              <div className="violet"></div>
              <h3>Your Cart</h3>
            </div>

            {cartedProducts.length === 0 ? (
              <p style={{ textAlign: "center", fontSize: "30px" }}>
                Your cart is empty.
              </p>
            ) : (
              <ul
                className="bottom"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {cartedProducts.map((item) => (
                  <li key={item.id} style={{ position: "relative" }}>
                    <a
                      href={`/category/product/${item.product.id}`}
                      style={{ width: "100%", display: "block" }}
                    >
                      <div>
                        <img
                          src={`http://localhost:8000${item.product.image}`}
                          alt={item.product.name}
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
                          {item.product.name}
                        </h4>
                        <p style={{ textAlign: "center", marginTop: "4px" }}>
                          <strong>Size:</strong> {item.selected_size}{" "}
                          &nbsp;|&nbsp;
                          <strong>Color:</strong>{" "}
                          <span
                            style={{
                              display: "inline-block",
                              width: "14px",
                              height: "14px",
                              backgroundColor:
                                item.selected_color.toLowerCase(),
                              borderRadius: "50%",
                              verticalAlign: "middle",
                              marginLeft: "4px",
                            }}
                          ></span>{" "}
                          {item.selected_color}
                        </p>
                      </div>
                    </a>
                    <button
                      onClick={() =>
                        handleRemoveFromCart(
                          item.product.id,
                          item.selected_size,
                          item.selected_color
                        )
                      }
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

export default CartedProducts;
