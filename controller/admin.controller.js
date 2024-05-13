import admin from "../models/admin.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import jwt from 'jsonwebtoken'
import user from "../models/user.model.js";
import Chekcout from "../models/checkout.model.js";



export const AdminSignup = async (req, res, next) => {
    console.log(req.body)
    const { UserName, Email, PhoneNumber } = req.body;
    const newadmin = new admin({ UserName, Email, PhoneNumber })
    try {
        const CreatedAdmin = await newadmin.save();
        const responseData = { Admin: CreatedAdmin, message: "admin created successfully" };
        res.json(responseData).status(201).toString()
    }
    catch (err) {
        res.json(err).status(400).toString()
        console.log(err)
    }
}

export const AdminLogin = async (req, res, next) => {
    console.log(req.body)
    const { UserName, Email, PhoneNumber } = req.body;
    try {
        const ValidAdmin = await admin.findOne({ Email })
        // console.log(ValidAdmin)
        if (!ValidAdmin) return next(errorHandler(404, "user not found")) 
        const token = jwt.sign({ id: ValidAdmin._id }, process.env.JWT_SECRET)
        res.cookie('access_admin', token, { httpOnly: true, expiresIn: '3d' })
            .status(200)
            .json({ message: "cookie sent  succcesfully" })

    } catch (error) {
        next(errorHandler(500, "internal server error" + error.message))
    }
}

export const GetAllUsers = async (req, res , next )=>{
    try {
        const users = await user.find()   
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json("internal server error" + error.message)        
    }

}

export const GetAllCheckOuts = async (req, res, next)=>{
    try {
        const checkout = await Chekcout.find()
        res.status(200).json(checkout)
    } catch (error) {
        res.status(500).json("internal server error" + error.message)        
    }
}