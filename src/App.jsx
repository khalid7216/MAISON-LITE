import { useState }       from "react";
import { AuthProvider }   from "./context/AuthContext";
import { ToastProvider }  from "./context/ToastContext";
import GlobalStyles       from "./styles/GlobalStyles";
import Navbar             from "./components/Navbar";
import HomePage           from "./pages/HomePage";
import CartPage           from "./pages/CartPage";
import ProfilePage        from "./pages/ProfilePage";
import AdminPanel         from "./pages/admin/AdminPanel";
import { LoginPage, SignupPage, ForgotPage } from "./pages/AuthPages";

/* Pages that use their own full-screen layout (no shared Navbar) */
const AUTH_PAGES = ["login", "signup", "forgot"];

const App = () => {
  const [page,     setPage]     = useState("home");
  const [cart,     setCart]     = useState([]);
  const [wishlist, setWishlist] = useState([]);

  /* Cart helpers */
  const addToCart = (product) =>
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }];
    });

  const toggleWishlist = (id) =>
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const isAuthPage = AUTH_PAGES.includes(page);

  return (
    <AuthProvider>
      <ToastProvider>
        <GlobalStyles />

        {/* Navbar is hidden on full-screen auth pages */}
        {!isAuthPage && <Navbar setPage={setPage} cartCount={cartCount} />}

        {/* Page routing */}
        {page === "home"    && <HomePage    setPage={setPage} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        {page === "cart"    && <CartPage    cart={cart} setCart={setCart} setPage={setPage} />}
        {page === "login"   && <LoginPage   setPage={setPage} />}
        {page === "signup"  && <SignupPage  setPage={setPage} />}
        {page === "forgot"  && <ForgotPage  setPage={setPage} />}
        {page === "admin"   && <AdminPanel  setPage={setPage} />}
        {page === "profile" && <ProfilePage setPage={setPage} />}
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
