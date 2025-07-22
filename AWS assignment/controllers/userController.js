
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.adduser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }


    console.log('Original password:', password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password:', hashedPassword);
    //const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword }); 

    res.status(201).json({ message: 'User registered successfully' });

    const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });

    // 3. Send token back to frontend
    res.json({ token }); // you can also send name/email/etc. if needed


  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};
