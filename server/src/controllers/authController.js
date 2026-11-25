import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Incomplete credentials!",
    });
    return;
  }

  try {
    const requiredUser = await userModel.findOne({ email: email });
    if (!requiredUser) {
      res.status(401).json({
        message: "Incomplete credentials!",
      });
      return;
    }

    const storedHash = requiredUser.password;
    const passwordAuthentication = await bcrypt.compare(password, storedHash);
    if (!passwordAuthentication) {
      res.status(401).json({
        message: "Incomplete credentials!",
      });
      return;
    }

    const userId = requiredUser._id;
    const userRole = requiredUser.role;
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }

    const signedToken = jwt.sign(
      { userId: userId, userRole: userRole },
      secretKey,
      { expiresIn: "1d" },
    );

    res.status(200).json({
        userId: requiredUser._id,
        userRole: requiredUser.role,
        signedToken: signedToken
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
}
