import React from "react";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import "../../css/cartPage.css";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

const CartPage = () => {
  const { cart, loading, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Update quantity
  const changeQty = async (productId, qty) => {
    if (qty < 1) return;
    try {
      await updateQuantity(productId, qty);
    } catch (err) {
      console.error(err);
      alert("Could not update quantity");
    }
  };

  // Remove product
  const remove = async (productId) => {
    if (!window.confirm("Remove this item?")) return;
    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error(err);
      alert("Could not remove product");
    }
  };

  // Checkout all products
  const checkoutAll = () => {
    navigate("/checkout", {
      state: { cart },
    });
  };

  // Checkout single product
  const checkoutProduct = (productId, quantity) => {
    navigate("/checkout", {
      state: {
        cart: { products: [{ productId, quantity }] },
      },
    });
  };

  if (loading) return <div className="loading">Loading...</div>;

  // Calculate total dynamically
  const total = cart?.products?.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    return acc + price * item.quantity;
  }, 0) || 0;

  return (
    <>
      <Navbar />
      <div className="cart-page-container">
        {cart?.products?.length ? (
          <>
            <h2 className="cart-page-title">🛒 Your Shopping Cart</h2>

            {cart.products.map(({ productId, quantity }, i) => (
              <div key={i} className="cart-item-card">
                <img
                  src={`http://localhost:5000${productId?.image}`}
                  alt={productId?.name}
                  className="cart-item-image"
                  onError={(e) => (e.target.src = "/default-product.png")}
                />

                <div className="cart-item-details">
                  <h4 className="cart-item-name">{productId?.name}</h4>
                  <p className="cart-item-price">
                    ₹{productId?.price} × {quantity} ={" "}
                    <span className="total-item">
                      ₹{productId?.price * quantity}
                    </span>
                  </p>

                  <div className="cart-actions">
                    <button
                      className="qty-btn"
                      onClick={() => changeQty(productId._id, quantity - 1)}
                    >
                      −
                    </button>
                    <span className="qty-count">{quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => changeQty(productId._id, quantity + 1)}
                    >
                      +
                    </button>

                    <button
                      className="remove-btn"
                      onClick={() => remove(productId._id)}
                    >
                      Remove
                    </button>
                  </div>

                  <button
                    className="checkout-single-btn"
                    onClick={() => checkoutProduct(productId, quantity)}
                  >
                    Checkout This Product
                  </button>
                </div>
              </div>
            ))}

            {/* Summary Section */}
            <div className="cart-summary-card">
              <h3>Total Amount: <span>₹{total}</span></h3>
              <button className="checkout-btn" onClick={checkoutAll}>
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <FiShoppingCart size={80} color="#999" />
            <h3>Your cart is empty</h3>
            <p>Add some items to see them here!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
