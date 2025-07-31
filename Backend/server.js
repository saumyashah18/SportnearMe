const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const ownerRoutes = require("./Routes/Owner");
const userRoute = require("./Routes/UserRoute");
const turfRoute = require("./Routes/turfSetupRoute");

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://sportnear-me-git-main-saumyashah18s-projects.vercel.app",
  "https://sportnear-me.vercel.app",
  "https://sportnearme.onrender.com",
];


app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/users", userRoute);
app.use("/api/owner", ownerRoutes);
app.use("/api/turfs", turfRoute);

app.get("/", (req, res) => {
  res.send("✅ SportNearMe Backend is running!");
});


console.log("MONGO_URI from env:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
