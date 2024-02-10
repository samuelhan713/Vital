const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});

    if (!existingUser) {
      return res.status(404).json({message: "User doesn't exist!"})
    } else {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      console.log(isMatch);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
  
      // make sure the password not send back to the frontend
      const { password: hashedPassword, ...user } = existingUser._doc;
  
      const expiryDate = new Date(Date.now() + 3600); // 1 hour cookie
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json({ token, user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Create or REGISTER
const register = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser)
      return res.status(400).json({ msg: "Username is already used." });

    // hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // if not, continue
    const newUser = new User({
      email,
      firstName,
      lastName,
      password: passwordHash,
    });
    const savedUser = await newUser.save();
    const { password: hashedPassword, ...user } = savedUser._doc;
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { register: register, login: login  };