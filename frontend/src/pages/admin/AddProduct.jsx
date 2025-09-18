import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../user/utils";

const AddProduct = ({ onProductAdded }) => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProduct({ ...product, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = "⚠️ Product name is required";
    if (!product.category) newErrors.category = "⚠️ Select a category";
    if (!product.price || product.price <= 0)
      newErrors.price = "⚠️ Enter a valid price";
    if (!product.description)
      newErrors.description = "⚠️ Description is required";
    if (!product.image) newErrors.image = "⚠️ Please upload an image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("image", product.image);

      const res = await axios.post(
        "http://localhost:5000/api/products/add-product",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if(res.data.message){
         handleSucess("Product Add Sucessfully...");
         
      }else{
         handleError(response.data.message || "Product is Not Add !...");
      }
      
      //alert(res.data.message); // Success message
      setProduct({ name: "", category: "", price: "", description: "", image: null });
      setPreview(null);
      if (onProductAdded) onProductAdded(); // Refresh product list in ManageProducts
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="dynamic-card">
      <h2 className="dynamic-title">➕ Add New Product</h2>
      <form className="dynamic-form" onSubmit={handleSubmit}>
        {/* Product Name */}
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Enter Product Name"
            value={product.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Category */}
        <div className="form-group">
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">-- Select Category --</option>
            <option value="bags">👜 Bags</option>
            <option value="food">🍔 Food</option>
            <option value="embroidery">🧵 Embroidery</option>
            <option value="stitching">✂️ Stitching</option>
            <option value="tailoring">👗 Tailoring</option>
            <option value="festive">🎁 Festive Hampers</option>
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        {/* Price */}
        <div className="form-group">
          <input
            type="number"
            name="price"
            placeholder="Enter Price ₹"
            value={product.price}
            onChange={handleChange}
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>

        {/* Description */}
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Write Product Description..."
            value={product.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        {/* Image Upload */}
        <div className="form-group image-upload">
          <label className="upload-box">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              hidden
            />
            {preview ? (
              <img src={preview} alt="Preview" className="preview-img" />
            ) : (
              <span>📸 Drag & Drop or Click to Upload</span>
            )}
          </label>
          {errors.image && <p className="error">{errors.image}</p>}
        </div>

        {/* Submit */}
        <button type="submit" className="dynamic-btn">
          🚀 Add Product
        </button>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default AddProduct;
