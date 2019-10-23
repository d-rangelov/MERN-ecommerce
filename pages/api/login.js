import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1.) Check if the user exists with the provided email
    const user = await User.findOne({ email }).select("+password");
    // 2.) --if not, return error
    if (!user) {
      return res.status(404).send("No user with that email exists");
    }
    // 3.) Check if the password matches the one in the DB
    const passwordsMatch = await bcrypt.compare(password, user.password);
    // 4.) --if so, generate a json web token and send it back
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
      res.status(200).json(token);
    } else {
      return res.status(400).send("Passwords do not match!");
    }
    // 5.) --if not, return error
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while logging in user");
  }
};
