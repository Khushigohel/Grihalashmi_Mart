import React from 'react';
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import "../../css/cartPage.css";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

const CartPage = () => {
  const { cart, loading, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Change quantity
  const changeQty = async (productId, qty) => {
    if (qty < 1) return;
    try {
      await updateQuantity(productId, qty);
    } catch (err) {
      console.error(err);
      alert('Could not update quantity');
    }
  };

  // Remove product
  const remove = async (productId) => {
    if (!window.confirm('Remove this item?')) return;
    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error(err);
      alert('Could not remove');
    }
  };

  // Checkout a single product
  const checkoutProduct = (productId, quantity) => {
    navigate("/checkout", { state: { cart: { products: [{ productId, quantity }] } } });
  };

  // Checkout all products
  const checkoutAll = () => {
    navigate("/checkout", { state: { cart } });
  };

  if (loading) return <div className="loading">Loading...</div>;

  const total = cart?.products?.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    return acc + price * item.quantity;
  }, 0) || 0;

  return (
    <>
      <Navbar />
      <div className="cart-container">
        {cart?.products?.length ? (
          <>
            <h2 className="cart-title">Your Shopping Cart</h2>

            {cart.products.map(({ productId, quantity }, i) => (
              <div key={i} className="cart-item">
                <img
                  src={`http://localhost:5000${productId?.image}`}
                  alt={productId?.name}
                  className="cart-item-img"
                  onError={(e) => (e.target.src = "/default-product.png")}
                />
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{productId?.name}</h4>
                  <p className="cart-item-price">₹{productId?.price}</p>
                  <div className="cart-item-actions">
                    <button className="qty-btn" onClick={() => changeQty(productId._id, quantity - 1)}>-</button>
                    <span className="qty">{quantity}</span>
                    <button className="qty-btn" onClick={() => changeQty(productId._id, quantity + 1)}>+</button>
                    <button className="remove-btn" onClick={() => remove(productId._id)}>Remove</button>
                  </div>

                  {/* Individual checkout */}
                  <button
                    className="checkout-single-btn"
                    onClick={() => checkoutProduct(productId, quantity)}
                  >
                    Checkout This Product
                  </button>
                </div>
              </div>
            ))}

            {/* Cart summary */}
            <div className="cart-summary">
              <h3>Total: ₹{total}</h3>
              <button className="checkout-btn" onClick={checkoutAll}>
                Checkout All Products
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart-container">
            {/* <FiShoppingCart size={100} color="#e24b4b" /> */}
            <img
              src="/empty-cart.png"
              alt="Empty Cart"
              style={{ width: 200, maxWidth: '50%', opacity: 0.7 }}
            />
            <h2 className="empty-cart">Your Shopping Cart is empty</h2>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default CartPage;
