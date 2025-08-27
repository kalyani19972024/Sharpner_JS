// controllers/userController.js
const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ["id", "name", "email", "careerGoals", "phoneNumber", "linkedinUrl"]
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, careerGoals, phoneNumber, linkedinUrl } = req.body;

    await User.update(
      { name, careerGoals, phoneNumber, linkedinUrl },
      { where: { id: req.user.id } } // ✅ use id here
    );

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error); // log for debugging
    res.status(500).json({ message: "Error updating profile" });
  }
};

