const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const userRoutes = require("./router/web/userRoutes");
app.use("/web/api/", userRoutes);

const authRoutes = require("./router/web/auth");
app.use("/web/api/", authRoutes);

const adminRoutes = require("./router/admin/adminRoutes"); 
app.use("/api/admin", adminRoutes); 

const userProfile=require("./router/web/profileRoutes");
app.use("/web/api/",userProfile);

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
