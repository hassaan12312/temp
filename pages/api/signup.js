// pages/api/signup.js
import dbConnect from "@/lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    await dbConnect();  // Ensure the DB connection

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password before saving it
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await user.save();

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
