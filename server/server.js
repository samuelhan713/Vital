const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { exec } = require('child_process');

const app = require("./app");

// IMPORTED ROUTES
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const questionRoutes = require("./routes/question");

// CONFIGURATIONS
dotenv.config();

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

app.get('/run-python', (req, res) => {
  // Execute the Python script
  exec('python check.py 4 "Vega" False', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Assuming the Python script prints a JSON result to stdout
    try {
      const result = JSON.parse(stdout);
      res.json(result);
    } catch (parseError) {
      console.error(`Error parsing Python script output: ${parseError}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});

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