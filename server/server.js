const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = require("./app");

// IMPORTED ROUTES
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// IMPORTED CONTROLLERS
const userController = require("./controllers/user");

// CONFIGURATIONS
dotenv.config();

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    }
  })
  .catch((error) => console.log(`${error} did not connect`));

module.exports = app;