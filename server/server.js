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

app.get('/run-python/:age/:description', (req, res) => {
  // Execute the Python script
  let { age, description } = req.params;
  // let age = "true";
  // const description = "My eyes feel dry.";
  age = age.charAt(0).toUpperCase() + age.slice(1);
  // const command = `python check.py ${age} "Vega" False "${description}"`;
  // const description = "My bones feel weak.";
  exec(`python check.py ${age} "Vega" False "${description}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(501).json({ error: 'Description is not specific enough, hence, no detection.' });
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