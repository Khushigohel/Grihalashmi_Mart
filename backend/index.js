const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path=require("path")
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/uploads/images", express.static(path.join(__dirname, "uploads/images")));

const userRoutes = require("./router/web/userRoutes");
app.use("/web/api/", userRoutes);

const authRoutes = require("./router/web/auth");
app.use("/web/api/", authRoutes);

const userProfile = require("./router/web/profileRoutes");
app.use("/web/api/", userProfile);

const addressRoutes = require("./router/web/addressRoutes");
app.use("/api/address", addressRoutes);


//Admin Routes call here
const adminRoutes = require("./router/admin/adminRoutes");
app.use("/api/admin", adminRoutes);

const productRoutes = require("./router/admin/productRoutes");
app.use("/api/products", productRoutes);

const orderRoutes = require("./router/admin/orderRoutes");
app.use("/api/orders", orderRoutes);

const adminStats = require("./router/admin/adminStats");
app.use("/api/admin/stats", adminStats);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB is connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () =>
  console.log("Server is Runnig to the ", process.env.PORT)
);
