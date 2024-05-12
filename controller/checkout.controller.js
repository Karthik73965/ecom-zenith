import Chekcout from "../models/checkout.model.js"
import { errorHandler } from "../utils/ErrorHandler.js"

export const ChekOutController = async (req, res, next) => {
    const { FirstName, LastName, PhoneNumber, Address, Email, PinCode } = req.body

    const CheckOUtOBj = new Chekcout({
        FirstName,
        LastName,
        PhoneNumber,
        Address,
        Email,
        PinCode
    })
    try {
        const sentcheckout = await CheckOUtOBj.save()
        res.status(201).json({message:"submitted succesfully"}).toString()
    } catch (error) {
        next(errorHandler(500 , error.message || "internal server error"))
        
    }
}