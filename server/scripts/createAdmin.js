import "dotenv/config"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import userModel from "../src/models/User.js"

export async function createAdmin(){

    const adminName = process.env.ADMIN_NAME
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD
    const url = process.env.MONGO_URI
    const role = "Admin"

    if(!adminName || !adminEmail || !adminPassword || !url){
        console.log("Initial credentials for the admin creation are missing!")
        return
    }

    try{
        await mongoose.connect(url)
        console.log("Database connected!")

        const findDuplicateUser = await userModel.findOne({"email": adminEmail})
        if(findDuplicateUser){
           console.log("Duplicate email found!")
           return
        }

        const adminEncryptedPassword = await bcrypt.hash(adminPassword, 12)
        await userModel.create({
            "name": adminName,
            "email": adminEmail,
            "password": adminEncryptedPassword,
            "role": role
        })
        console.log("Admin created successfully!")
    }
    catch(error){
        console.error(error)
    }
    finally{
        await mongoose.connection.close()
    }
}
createAdmin()