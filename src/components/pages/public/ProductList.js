import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../../screens/Header";
import Footer from "../../screens/Footer";
import SkeletonProduct from "../../includes/SkeletonUI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductList() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [likedProducts, setLikedProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("access");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/category/${categoryId}/products/`
        );
        const data = await res.json();
        console.log(data);

        setCategoryTitle(data?.category_name || ""); // Fallback title
        const fetchedProducts = Array.isArray(data?.products)
          ? data.products
          : [];
        setProducts(fetchedProducts);

        if (token) {
          const statuses = {};
          await Promise.all(
            fetchedProducts.map(async (product) => {
              try {
                const res = await fetch(
                  `http://localhost:8000/category/product/${product.id}/like-status/`,
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );
                const likeData = await res.json();
                statuses[product.id] = likeData?.liked || false;
              } catch (err) {
                console.error(
                  `Error fetching like status for product ${product.id}:`,
                  err
                );
              }
            })
          );
          setLikedProducts(statuses);
        }

        setIsLoading(false); // ✅ Done loading
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]); // fallback
        setLikedProducts({}); // fallback
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const toggleLike = (productId) => {
    if (!token) {
      toast.warn("Please login to like products.");
      return;
    }

    fetch(`http://localhost:8000/category/product/${productId}/like/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLikedProducts((prev) => ({
          ...prev,
          [productId]: data.liked,
        }));

        if (data.liked) {
          toast.success("Added to Wishlist 💖");
        } else {
          toast.success("Removed from Wishlist 🤍");
        }
      })
      .catch((err) => {
        console.error("Error toggling like:", err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <SkeletonProduct />
      ) : (
        <section
          id="similar"
          style={{ borderTop: "1px solid black", paddingTop: "40px" }}
        >
          <section className="wrapper">
            <section className="similar">
              <div className="top">
                <div className="violet"></div>
                <h3>{categoryTitle}</h3>
              </div>
              <ul className="bottom">
                {products.map((product) => (
                  <li key={product.id} style={{ position: "relative" }}>
                    <div className="wishImageContainer">
                      <button onClick={() => toggleLike(product.id)}>
                        {likedProducts[product.id] ? "❤️" : "🤍"}
                      </button>
                    </div>

                    <a href={`/category/product/${product.id}`}>
                      <div className="similarImageContainer">
                        <img
                          src={`http://localhost:8000${product.image}`}
                          alt={product.title}
                        />
                      </div>
                      <div className="productDetails">
                        <div className="left">
                          <h4>{product.name}</h4>
                          <h5>{product.seller}</h5>
                        </div>
                        <div className="right">${product.price}</div>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </section>
      )}
      <Footer />
      <ToastContainer position="bottom-center" autoClose={1500} />
    </>
  );
}

export default ProductList;
