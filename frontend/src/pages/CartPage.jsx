import { useToast } from "../context/ToastContext";
import { Btn } from "../components/UI";

const CartPage = ({ cart, setCart, setPage }) => {
  const toast    = useToast();
  const updateQty = (id, delta) =>
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  const remove = (id, name) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    toast(`${name} removed`, "info");
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal >= 200 ? 0 : 15;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 32px" }}>
      <h1 className="section-title" style={{ fontSize: 42 }}>Shopping Bag</h1>
      <p className="section-sub">
        {cart.reduce((s, i) => s + i.qty, 0)} items · {cart.length} pieces
      </p>

      {cart.length === 0 ? (
        /* Empty state */
        <div style={{ textAlign: "center", padding: "100px 0" }} className="fu">
          <div style={{ fontSize: 64, marginBottom: 20, opacity: .4 }}>⊕</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300, fontSize: 32, marginBottom: 12 }}>
            Your Bag is Empty
          </h2>
          <p style={{ color: "var(--muted)", marginBottom: 36 }}>Discover pieces you'll love</p>
          <Btn v="primary" size="lg" onClick={() => setPage("home")}>Explore Collection</Btn>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 48 }} className="grid-1-mobile">

          {/* ── Line items ─────────────────────────── */}
          <div>
            {cart.map((item, i) => (
              <div
                key={item.id}
                className="fu"
                style={{
                  display: "flex", gap: 22, padding: "24px 0",
                  borderBottom: "1px solid var(--border)", alignItems: "center",
                  animationDelay: `${i * .07}s`, animationFillMode: "both", opacity: 0,
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: 96, height: 114, borderRadius: 8, flexShrink: 0,
                    background: "var(--lift)",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 5 }}>
                    {item.cat}
                  </p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 300, marginBottom: 6 }}>
                    {item.name}
                  </h3>
                  <p style={{ color: "var(--dim)", fontSize: 12 }}>Size: M · Classic</p>
                </div>

                {/* Qty controls */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                  <span style={{ fontSize: 15, fontWeight: 500, minWidth: 22, textAlign: "center" }}>
                    {item.qty}
                  </span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                </div>

                {/* Price + remove */}
                <div style={{ textAlign: "right", flexShrink: 0, minWidth: 80 }}>
                  <p style={{ fontWeight: 500, fontSize: 16 }}>${item.price * item.qty}</p>
                  <button
                    onClick={() => remove(item.id, item.name)}
                    style={{ background: "none", border: "none", color: "var(--dim)", cursor: "pointer", fontSize: 12, marginTop: 8, letterSpacing: ".05em", transition: "color .2s" }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--rose)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--dim)")}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order summary ──────────────────────── */}
          <div>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 32, position: "sticky", top: 100 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 300, marginBottom: 24 }}>
                Order Summary
              </h3>

              {[
                ["Subtotal", `$${subtotal}`],
                ["Shipping", shipping === 0 ? "Complimentary" : `$${shipping}`],
                ["Tax",      "Calculated at checkout"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 13 }}>
                  <span style={{ color: "var(--muted)" }}>{k}</span>
                  <span style={{ color: k === "Shipping" && shipping === 0 ? "var(--emerald)" : "var(--text)" }}>{v}</span>
                </div>
              ))}

              {/* Free-shipping progress */}
              {subtotal < 200 && (
                <div style={{ margin: "14px 0", padding: "12px 14px", background: "rgba(201,168,76,.08)", border: "1px solid rgba(201,168,76,.2)", borderRadius: 6 }}>
                  <p style={{ fontSize: 12, color: "var(--gold2)" }}>
                    Add ${200 - subtotal} more for free shipping!
                  </p>
                  <div style={{ height: 3, background: "var(--border)", borderRadius: 2, marginTop: 8 }}>
                    <div style={{ height: "100%", width: `${(subtotal / 200) * 100}%`, background: "var(--gold)", borderRadius: 2, transition: "width .5s" }} />
                  </div>
                </div>
              )}

              {/* Total */}
              <div style={{ borderTop: "1px solid var(--border)", margin: "20px 0", paddingTop: 20, display: "flex", justifyContent: "space-between", fontSize: 18 }}>
                <span>Total</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 300 }}>
                  ${subtotal + shipping}
                </span>
              </div>

              {/* Promo code */}
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <input
                  placeholder="Promo code"
                  style={{ flex: 1, padding: "11px 14px", borderRadius: 6, border: "1px solid var(--border2)", background: "rgba(255,255,255,.04)", color: "var(--text)", fontSize: 13 }}
                />
                <button
                  style={{ padding: "11px 16px", borderRadius: 6, border: "1px solid var(--border2)", background: "none", color: "var(--muted)", cursor: "pointer", fontSize: 12, letterSpacing: ".08em", transition: "all .2s", fontFamily: "'Jost', sans-serif" }}
                  onMouseEnter={(e) => { e.target.style.borderColor = "var(--gold)"; e.target.style.color = "var(--gold)"; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = "var(--border2)"; e.target.style.color = "var(--muted)"; }}
                >
                  Apply
                </button>
              </div>

              <Btn v="primary" full size="lg">Proceed to Checkout</Btn>

              <p style={{ textAlign: "center", fontSize: 11, color: "var(--dim)", marginTop: 14, letterSpacing: ".05em" }}>
                🔒 256-bit SSL secured checkout
              </p>

              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
                {["VISA", "MC", "AMEX", "AE"].map((c) => (
                  <span key={c} style={{ fontSize: 9, padding: "3px 7px", border: "1px solid var(--border)", borderRadius: 3, color: "var(--dim)", letterSpacing: ".05em" }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;