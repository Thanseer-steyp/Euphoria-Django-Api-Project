import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import rightArrow from "../assets/arrow-right.svg";

function CategoryMen() {
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}/products/`);
  };

  const menCategories =
    categories?.filter((cat) => cat.gender?.toLowerCase() === "men") || [];

  return (
    <section id="categoryMen">
      <section className="wrapper">
        <section className="categoryMen">
          <div className="top">
            <div className="violet"></div>
            <h3>Categories For Men</h3>
          </div>
          <div className="bottom">
            <ul className="products">
              {menCategories.map((cat) => (
                <li key={cat.id} onClick={() => handleCategoryClick(cat.id)}>
                  <div className="productImage">
                    <img
                      src={`http://localhost:8000${cat.image}`}
                      alt={cat.category_title}
                    />
                  </div>
                  <div className="productDetails">
                    <div className="left">
                      <h4>{cat.name}</h4>
                      <Link to={`/category/${cat.id}/products/`}>
                        Explore Now!
                      </Link>
                    </div>
                    <div className="right">
                      <Link to={`/category/${cat.id}/products/`}>
                        <img src={rightArrow} alt="rightArrow-Btn" />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </section>
  );
}

export default CategoryMen;
