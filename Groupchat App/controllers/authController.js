
const bcrypt = require("bcrypt");
const User = require("../models/User1");

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

     if (!phone || phone.trim() === "") {
      return res.status(400).json({ message: "Phone number is required" });
    }

//     if (!/^[0-9]{10}$/.test(phone)) {
//       return res.status(400).json({ message: "Phone number must be 10 digits" });
//    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
