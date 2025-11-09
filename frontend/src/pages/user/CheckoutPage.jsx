import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const singleProduct = location.state?.product; // 👈 for "Buy Now"
  const cartData = location.state?.cart; // 👈 for cart checkout

  const [productItems, setProductItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const { clearCart } = useCart();

  const [addressData, setAddressData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    Pincode: "",
    City: "",
    State: "",
  });

  // ✅ Fetch user profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    axios
      .get("http://localhost:5000/web/api/getProfile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) setUser(res.data.user);
      })
      .catch((err) => console.error(err));
  }, []);

  // ✅ Fetch saved addresses
  useEffect(() => {
    if (!user?._id) return;
    axios
      .get(`http://localhost:5000/api/address/${user._id}`)
      .then((res) => setAddresses(res.data.addresses || []))
      .catch((err) => console.error(err));
  }, [user]);

  // ✅ Load products (Cart OR Buy Now)
  useEffect(() => {
    if (cartData?.products) {
      // When coming from Cart
      const items = cartData.products.map((item) => ({
        id: item.productId?._id,
        name: item.productId?.name,
        image: `http://localhost:5000${item.productId?.image}`,
        price: item.productId?.price || 0,
        qty: item.quantity,
      }));
      setProductItems(items);
      setTotal(items.reduce((acc, item) => acc + item.price * item.qty, 0));
    } else if (singleProduct) {
      // When coming from Buy Now
      const item = {
        id: singleProduct._id,
        name: singleProduct.name,
        image: `http://localhost:5000${singleProduct.image}`,
        price: singleProduct.price,
        qty: 1,
      };
      setProductItems([item]);
      setTotal(item.price);
    } else {
      // No product
      setProductItems([]);
      setTotal(0);
    }
  }, [location.state]);

  // ✅ Load selected address from localStorage
  useEffect(() => {
    const savedAddress = localStorage.getItem("selectedAddress");
    if (savedAddress) setSelectedAddress(JSON.parse(savedAddress));
  }, []);

  // ✅ Handle new address input
  const handleChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  // ✅ Add new address
  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!user?._id) return;
    try {
      await axios.post("http://localhost:5000/api/address", {
        userId: user._id,
        ...addressData,
      });
      setAddressData({
        fullName: "",
        phoneNumber: "",
        address: "",
        Pincode: "",
        City: "",
        State: "",
      });
      setAddingNewAddress(false);
      setShowAddressForm(false);
      const res = await axios.get(`http://localhost:5000/api/address/${user._id}`);
      setAddresses(res.data.addresses || []);
    } catch (err) {
      console.error(err);
      alert("Failed to add address");
    }
  };

  // ✅ Place Order
  const handlePlaceOrder = async () => {
    if (!selectedAddress) return alert("Select a delivery address!");
    if (!paymentMethod) return alert("Please select a payment method!");

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const order = {
        userId,
        items: productItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          image: item.image,
        })),
        total,
        deliveryAddress: selectedAddress,
        paymentMethod,
        date: new Date(),
      };

      if (paymentMethod === "Online Payment") {
        alert("Online payment feature will be available soon!");
        return;
      }

      await axios.post("http://localhost:5000/api/orders/place-order", order, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await axios.delete(`http://localhost:5000/api/cart/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      clearCart();
      localStorage.removeItem("cart");
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  // ✅ Select address
  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr);
    setShowAddressForm(false);
    localStorage.setItem("selectedAddress", JSON.stringify(addr));
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row d-flex justify-content-center">
          {/* Left: Product Details */}
          <div className="col-md-5">
            <h4>Product Details</h4>
            {productItems.length > 0 ? (
              productItems.map((item, idx) => (
                <div key={idx} className="d-flex border p-3 mb-3 align-items-center">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="me-3"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <div>
                    <h5>{item.name}</h5>
                    <p>Quantity: {item.qty}</p>
                    <p>Price: ₹{item.price * item.qty}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No product selected</p>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="col-md-4">
            <h4>Order Summary</h4>
            <div className="border p-3 mb-3">
              {productItems.map((item, idx) => (
                <div key={idx} className="d-flex justify-content-between">
                  <span>{item.name}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>₹{total}</strong>
              </div>

              {/* Payment Method */}
              <div className="border p-3 mb-3 mt-3">
                <h5>Select Payment Method</h5>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="cod">
                    Cash on Delivery
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="online"
                    value="Online Payment"
                    checked={paymentMethod === "Online Payment"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="online">
                    Online Payment (Coming Soon)
                  </label>
                </div>
              </div>
            </div>

            {/* Address & Place Order */}
            {selectedAddress && (
              <div className="card p-3 mb-2 border-success">
                <h5>{selectedAddress.fullName}</h5>
                <p>
                  {selectedAddress.address}, {selectedAddress.City},{" "}
                  {selectedAddress.State} - {selectedAddress.Pincode}
                </p>
                {selectedAddress.phoneNumber}
                <button
                  className="btn btn-outline-secondary mt-2"
                  onClick={() => setSelectedAddress(null)}
                >
                  Change Address
                </button>
              </div>
            )}

            {!selectedAddress && !addingNewAddress && (
              <button
                className="btn w-100 my-3"
                style={{ background: "#4052b7", color: "#fff" }}
                onClick={() => setShowAddressForm(true)}
              >
                Select Delivery Address
              </button>
            )}

            {selectedAddress && (
              <button
                className="btn w-100 mt-2"
                style={{ background: "#4052b7", color: "#fff" }}
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
