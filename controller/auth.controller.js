import user from "../models/user.model.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import jwt from 'jsonwebtoken'


export const signup = async (req, res, next) => {
    console.log(req.body)
    const { UserName, Email, PhoneNumber } = req.body;
    const newuser = new user({ UserName, Email, PhoneNumber })
    try {
        const CreatedUser = await newuser.save();
        const responseData = { User: CreatedUser, message: "user created successfully" };
        res.json(responseData).status(201).toString()
        //sending created user detials as well as sending a message so that in frontend they can catch the things up .
    }
    catch (err) {
        res.json(err).status(400).toString()
        console.log(err)
    }
}

//sign in route -  what we are doing here taking username and other as parameters and checking whether user is there in the db with email as foriegn key and storign the user detaisl in a variable and based on the document id we are generaating a token and that token is sending in the form of cookie to the frontned 
export const SignIn = async (req, res, next) => {
    const { UserName, Email, PhoneNumber } = req.body
    try {
        const ValidUser = await user.findOne({ Email })
        console.log(ValidUser)
        if (!ValidUser) return next(errorHandler(404, "user not found")) // custom error chek utils for that - vaibav and vivek 
        const token = jwt.sign({ id: ValidUser._id, }, process.env.JWT_SECRET); //generating token 
        res.cookie('access_token', token, { httpOnly: true, expiresIn: '30d' }) // setting it as 30 days we can chnage it later 
            .status(200)
            .json(ValidUser).toString()
    } catch (error) {
        next(errorHandler(500, "internal server error" + error))
    }
}

// Google signin/signup - it can be used by google signin whether user exists previously or not check below for clear info
export const Google = async (req, res, next) => {
    const { Email } = req.body // definign email 
    const ValidUser = await user.findOne({ Email }) // checking whether user is there in the db or not 
    if (ValidUser) { // if user  exists we will send cookie  to the user
        const token = jwt.sign({ id: ValidUser._id, }, process.env.JWT_SECRET); 
        res.cookie('access_token', token, { httpOnly: true, expiresIn: '30d' })
            .status(200)
            .json(ValidUser).toString()
    } else {// if not exist we will create a user and store it in db and send cookie to the user . 
        const NewUser = await user.create({
            UserName: req.body.UserName,
            Email , 
            PhoneNumber :req.body.PhoneNumber
        })
        const CreatedUser = await NewUser.save();
        const token = jwt.sign({id:CreatedUser._id} , process.env.JWT_SECRET)
        res.cookie('access_token', token , '30d')
            .status(200)
            .json("created google signin").toString()
    }
}

// signout route - we will just clear cookie here 
export const signout = async(req,res,next)=>{
    try {
      res.clearCookie('access_token');
      res.status(200).json({message:"user logout successfully"})
    } catch (error) {
      next(error)
    }
  }