import React, { useEffect, useState } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import ProductDetailModal from "../../components/ProductDetailModalAdmin";
import "../../css/ManageProduct.css";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <div className="manage-products-container">
      {/* Header */}
      <div className="manage-header">
        <h2>Manage Products</h2>
        <button
          className="toggle-add-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Close Add Product" : "Add New Product"}
        </button>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="add-product-form">
          <AddProduct onProductAdded={fetchProducts} />
        </div>
      )}

      {/* Products Table */}
      {products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>
                    {p.image && (
                      <img
                        src={`http://localhost:5000${p.image}`}
                        alt={p.name}
                        className="product-image"
                      />
                    )}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>₹{p.price}</td>
                  <td>{p.description}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelectedProduct(p)}
                    >
                      View / Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(p._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onProductUpdated={fetchProducts} // refresh after edit
        />
      )}
    </div>
  );
}
