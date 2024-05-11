import user from "../models/user.model.js";



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
