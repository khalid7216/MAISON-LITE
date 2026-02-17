import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Avatar, Btn, Tag } from "./UI";

const Navbar = ({ setPage, cartCount }) => {
  const { user, logout } = useAuth();
  const toast = useToast();
  const [uMenu,    setUMenu]    = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "sticky", top: 0, zIndex: 500,
        background:    scrolled ? "rgba(5,4,4,.96)"         : "transparent",
        borderBottom:  scrolled ? "1px solid var(--border)"  : "1px solid transparent",
        backdropFilter:scrolled ? "blur(20px)"               : "none",
        transition: "all .4s ease",
      }}
    >
      <div
        style={{
          maxWidth: 1320, margin: "0 auto",
          padding: "0 32px",
          display: "flex", alignItems: "center", height: 72, gap: 32,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          style={{ background: "none", border: "none", flexShrink: 0 }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 700,
              letterSpacing: ".18em", color: "var(--text)", textTransform: "uppercase",
            }}
          >
            MAISON<span className="gold-text">·ÉLITE</span>
          </span>
        </button>

        {/* Desktop nav links */}
        <div
          className="hide-mobile"
          style={{ display: "flex", gap: 32, flex: 1, justifyContent: "center" }}
        >
          {["New In", "Collection", "Editorial", "Sale"].map((l) => (
            <button key={l} className="nav-link" onClick={() => setPage("home")}>
              {l}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: "auto" }}>
          {/* Search */}
          <button
            style={{ background: "none", border: "none", color: "var(--muted)", fontSize: 17, transition: "color .2s", padding: 4 }}
            onMouseEnter={(e) => (e.target.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
          >
            ⌕
          </button>

          {/* Cart */}
          <button
            onClick={() => setPage("cart")}
            style={{ background: "none", border: "none", position: "relative", color: "var(--muted)", fontSize: 18, transition: "color .2s", padding: 4 }}
            onMouseEnter={(e) => (e.target.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
          >
            ⊕
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute", top: -5, right: -5,
                  background: "var(--gold)", color: "#0d0b0a",
                  fontSize: 9, width: 17, height: 17,
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, animation: "goldPulse 2s ease infinite",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          {/* User menu */}
          {user ? (
            <div style={{ position: "relative" }}>
              <button onClick={() => setUMenu((p) => !p)} style={{ background: "none", border: "none" }}>
                <Avatar name={user.name} size={36} />
              </button>

              {uMenu && (
                <div
                  className="fi"
                  style={{
                    position: "absolute", right: 0, top: 50,
                    background: "var(--card)", border: "1px solid var(--border2)",
                    borderRadius: 10, minWidth: 210,
                    boxShadow: "0 24px 64px rgba(0,0,0,.7)", zIndex: 600,
                  }}
                >
                  <div style={{ padding: "16px 18px 14px", borderBottom: "1px solid var(--border)" }}>
                    <p style={{ fontWeight: 500, fontSize: 14 }}>{user.name}</p>
                    <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{user.email}</p>
                    {user.isAdmin && (
                      <div style={{ marginTop: 6 }}>
                        <Tag color="gold">Admin</Tag>
                      </div>
                    )}
                  </div>

                  {user.isAdmin && (
                    <button
                      onClick={() => { setPage("admin"); setUMenu(false); }}
                      style={{ width: "100%", padding: "11px 18px", background: "none", border: "none", textAlign: "left", fontSize: 13, color: "var(--gold2)", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
                    >
                      ⚡ Admin Console
                    </button>
                  )}

                  <button
                    onClick={() => { setPage("profile"); setUMenu(false); }}
                    style={{ width: "100%", padding: "11px 18px", background: "none", border: "none", textAlign: "left", fontSize: 13, color: "var(--text)", cursor: "pointer" }}
                  >
                    My Orders
                  </button>

                  <button
                    onClick={() => { logout(); setUMenu(false); setPage("home"); toast("Signed out ✦", "ok"); }}
                    style={{ width: "100%", padding: "11px 18px 14px", background: "none", border: "none", textAlign: "left", fontSize: 13, color: "var(--rose)", cursor: "pointer", borderTop: "1px solid var(--border)" }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Btn size="sm" onClick={() => setPage("login")}>Sign In</Btn>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
