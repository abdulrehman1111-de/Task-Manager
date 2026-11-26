import userModel from "../models/User.js";

export async function userController(req, res) {
  try {
    const allUsers = await userModel.find().select("-password");

    res.status(200).json({
      message: "All users successfully retrieved!",
      status: "success",
      users: allUsers,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
}
