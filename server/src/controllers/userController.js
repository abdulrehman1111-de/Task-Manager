import mongoose from "mongoose";
import userModel from "../models/User.js";
import bcrypt from "bcrypt";

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

export async function createUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("Required credentials not provided!");
      res.status(400).json({
        message: "Required credentials not provided!",
        status: "failure",
      });
      return;
    }

    const findDuplicateUser = await userModel.findOne({ email: email });
    if (findDuplicateUser) {
      console.log("Duplicate email found!");
      res.status(409).json({
        message: "Duplicate email found!",
        status: "failure",
      });
      return;
    }

    const userPassword = await bcrypt.hash(password, 12);
    await userModel.create({
      name: name,
      email: email,
      password: userPassword,
      role: "User",
    });
    console.log("User created successfully!");
    res.status(201).json({
      message: "User created successfully",
      status: "success",
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      res.status(409).json({
        message: "Duplicate email or user",
        status: "failure",
      });
      return;
    }

    res.status(500).json({
      message: "Internal server error!",
      status: "failure",
    });
  }
}

export async function updateUserController(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid user id!");
      res.status(400).json({
        message: "Invalid user id!",
        status: "failure",
      });
      return;
    }

    const existingUser = await userModel.findOne({ _id: id });
    if (!existingUser) {
      console.log("User doesnot exist!");
      res.status(404).json({
        message: "User not found!",
        status: "failure",
      });
      return;
    }

    let { name, email, password } = req.body;
    if(!name && !email && !password){
      console.log("No editable fields given!")
      res.status(400).json({
        message: "No editable fields given!", 
        status: "failure"
      })
      return
    }

    if (email && email.length != 0) {
      const findDuplicateUser = await userModel.findOne({ email: email, _id: {$ne: id} });
      if (findDuplicateUser) {
        console.log("Duplicate email found!");
        res.status(409).json({
          message: "Duplicate email found!",
          status: "failure",
        });
        return;
      }
    }

    if (password && password.length != 0) {
      const userPassword = await bcrypt.hash(password, 12);
      password = userPassword
    }

    const updates = {}
    if(name && name.length != 0) updates.name = name
    if(email && email.length != 0) updates.email = email
    if(password && password.length != 0) updates.password = password

    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {$set: updates},
      {new:true, runValidators: true}
    );

    console.log("User updated successfully!");
    res.status(200).json({
      message: "User updated successfully",
      status: "success",
      user: await userModel.findOne({_id: id}).select("-password")
    });

  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      res.status(409).json({
        message: "Duplicate email or user",
        status: "failure",
      });
      return;
    }

    res.status(500).json({
      message: "Internal server error!",
      status: "failure",
    });
  }
}

export async function deleteUserController(req, res) {
  try {
    const { id } = req.params

    if (!id || id.length === 0) {
      console.log("Required credentials not provided!");
      res.status(400).json({
        message: "Required credentials not provided!",
        status: "failure",
      });
      return;
    }
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid user id!");
      res.status(400).json({
        message: "Invalid user id!",
        status: "failure",
      });
      return;
    }

    const existingUser = await userModel.findOne({ _id: id });
    if (!existingUser) {
      console.log("User doesnot exist!");
      res.status(404).json({
        message: "User not found!",
        status: "failure",
      });
      return;
    }

    const deletedUser = await userModel.findByIdAndDelete(id)
    if(!deletedUser){
      console.error("User not deleted!")
      res.status(500).json({
        message: "User not deleted!",
        status: "failure"
      })
      return
    }
    console.log("User deleted successfully!");
    res.status(200).json({
      message: "User deleted successfully",
      status: "success",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error!",
      status: "failure",
    });
  }
}


