import bcrypt from "bcrypt"
import mongoose from "mongoose"

export function createAdmin(){

    const adminName = process.env.adminName
    const adminEmail = process.env.adminEmail
    const adminPassword = process.env.adminPassword
    const url = process.env.MONGO_URI

    const adminEncryptedPassword = bcrypt.hash(adminPassword, 128)
    const role = "Admin"

    mongoose.connect().then((url)=>{
        console.log("Database connected!")
    })

}