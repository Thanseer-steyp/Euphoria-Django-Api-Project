import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/auth/Login";
import Signup from "./components/pages/auth/Signup";
import Home from "./components/pages/public/Home";
import ProductList from "./components/pages/public/ProductList";
import ProductDetail from "./components/pages/public/ProductDetail";
import LikedProducts from "./components/pages/user/LikedProducts";
import CartedProducts from "./components/pages/user/CartedProducts";
import ScrollToTop from "./components/includes/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/category/:categoryId/products"
          element={<ProductList />}
        />
        <Route
          path="/category/product/:productId"
          element={<ProductDetail />}
        />
        <Route path="/liked-products" element={<LikedProducts />} />
        <Route path="/carted-products" element={<CartedProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
