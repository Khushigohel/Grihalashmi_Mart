import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // States
    const [productItems, setProductItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addingNewAddress, setAddingNewAddress] = useState(false);
    const { clearCart } = useCart();

    const [addressData, setAddressData] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        Pincode: "",
        City: "",
        State: "",
    });
    // Fetch user profile
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

    // -------------------
    // Fetch saved addresses
    // -------------------
    useEffect(() => {
        if (!user?._id) return;

        axios
            .get(`http://localhost:5000/api/address/${user._id}`)
            .then((res) => setAddresses(res.data.addresses || []))
            .catch((err) => console.error(err));
    }, [user]);

    // -------------------
    // Load product items from cart
    // -------------------
    useEffect(() => {
        if (location.state?.cart?.products) {
            const items = location.state.cart.products.map((item) => ({
                id: item.productId?._id,
                name: item.productId?.name,
                image: `http://localhost:5000${item.productId?.image}`,
                price: item.productId?.price || 0,
                qty: item.quantity,
            }));
            setProductItems(items);

            const totalPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);
            setTotal(totalPrice);
        } else {
            setProductItems([]);
            setTotal(0);
        }
    }, [location.state]);

    // -------------------
    // Load selected address from localStorage
    // -------------------
    useEffect(() => {
        const savedAddress = localStorage.getItem("selectedAddress");
        if (savedAddress) setSelectedAddress(JSON.parse(savedAddress));
    }, []);

    // -------------------
    // Handle address input
    // -------------------
    const handleChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    // -------------------
    // Add new address
    // -------------------
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

            // Refresh addresses
            const res = await axios.get(`http://localhost:5000/api/address/${user._id}`);
            setAddresses(res.data.addresses || []);
        } catch (err) {
            console.error(err);
            alert("Failed to add address");
        }
    };

    // -------------------
    // Place Order
    // -------------------
    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
          alert("Select a delivery address!");
          return;
        }
      
        const userId = localStorage.getItem("userId"); 
        const token = localStorage.getItem("token");
      
        if (!userId || !token) {
          alert("Please login first");
          navigate("/login");
          return;
        }
      
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
            date: new Date(),
          };
      
          // Place order
          await axios.post("http://localhost:5000/api/orders/place-order", order, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          // ✅ Clear cart from backend
          await axios.delete(`http://localhost:5000/api/cart/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          // ✅ Clear cart locally
          clearCart();
          localStorage.removeItem("cart");
          localStorage.removeItem("selectedAddress");
      
          navigate("/order-success");
        } catch (err) {
          console.error("Place order error:", err);
          alert("Failed to place order");
        }
      };
      

    // -------------------
    // Select address
    // -------------------
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

                    {/* Left Side: Products */}
                    <div className="col-md-5">
                        <h4>Product Details</h4>
                        {productItems.length > 0 ? productItems.map((item, idx) => (
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
                        )) : <p>No product selected</p>}
                    </div>

                    {/* Right Side: Order Summary & Address */}
                    <div className="col-md-4">
                        <h4>Order Summary</h4>

                        {/* Price Summary */}
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
                        </div>

                        {/* Select Address Button */}
                        {!selectedAddress && !addingNewAddress && (
                            <button
                                className="btn w-100 my-3"
                                style={{ background: "#4052b7", color: "#fff" }}
                                onClick={() => setShowAddressForm(true)}
                            >
                                Select Delivery Address
                            </button>
                        )}

                        {/* Selected Address */}
                        {selectedAddress && (
                            <div className="card p-3 mb-2 border-success">
                                <h5>{selectedAddress.fullName}</h5>
                                <p>{selectedAddress.address}, {selectedAddress.City}, {selectedAddress.State} - {selectedAddress.Pincode}</p>
                                {selectedAddress.phoneNumber}
                                <button className="btn btn-outline-secondary mt-2" onClick={() => setSelectedAddress(null)}>
                                    Change Address
                                </button>
                            </div>
                        )}

                        {/* Saved Addresses */}
                        {showAddressForm && !addingNewAddress && (
                            <div className="border p-3 mb-3">
                                <h5>Saved Addresses</h5>
                                {addresses.length > 0 ? addresses.map((addr, idx) => (
                                    <div key={idx} className="card p-2 mb-2" style={{ cursor: "pointer" }} onClick={() => handleSelectAddress(addr)}>
                                        <h5>{addr.fullName}</h5>
                                        <p>{addr.address}, {addr.City}, {addr.State} - {addr.Pincode}</p>
                                        {addr.phoneNumber}
                                    </div>
                                )) : <p>No saved addresses</p>}

                                <button
                                    className="btn w-100 mt-2"
                                    style={{ background: "#4052b7", color: "#fff" }}
                                    onClick={() => setAddingNewAddress(true)}
                                >
                                    + Add New Address
                                </button>
                            </div>
                        )}

                        {/* Add New Address Form */}
                        {addingNewAddress && (
                            <div className="border p-3 mb-3">
                                <h5>Add New Address</h5>
                                <form onSubmit={handleAddAddress}>
                                    <input type="text" name="fullName" placeholder="Full Name" value={addressData.fullName} onChange={handleChange} className="form-control my-1" />
                                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={addressData.phoneNumber} onChange={handleChange} className="form-control my-1" />
                                    <textarea name="address" placeholder="Street" value={addressData.address} onChange={handleChange} className="form-control my-1" />
                                    <input type="text" name="Pincode" placeholder="Pincode" value={addressData.Pincode} onChange={handleChange} className="form-control my-1" />
                                    <input type="text" name="City" placeholder="City" value={addressData.City} onChange={handleChange} className="form-control my-1" />
                                    <input type="text" name="State" placeholder="State" value={addressData.State} onChange={handleChange} className="form-control my-1" />
                                    <button type="submit" className="btn w-100 mt-2" style={{ background: "#4052b7", color: "#fff" }}>Save Address</button>
                                    <button type="button" className="btn btn-danger w-100 mt-2" onClick={() => setAddingNewAddress(false)}>Cancel</button>
                                </form>
                            </div>
                        )}

                        {/* Place Order Button */}
                        {selectedAddress && (
                            <button className="btn w-100 mt-2" style={{ background: "#4052b7", color: "#fff" }} onClick={handlePlaceOrder}>
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
