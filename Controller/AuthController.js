import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
import { generateOTP } from "../Utils/genratedOTP.js";
import { sendOTPEmail } from "../Services/EmailServices.js";

export const Register = async (req,res) =>{

 try{

    const { Email } = req.body;

    if(!Email){
        return res.status(400).json({
            message:"Email required"
        });
    }

    const existingUser = await UserModel.findOne({ Email });

    if(existingUser){
        return res.status(400).json({
            message:"User already exists"
        });
    }

    const otp = generateOTP();

    // JWT Token Generate
    const token = jwt.sign(
      { Email },
      process.env.JWT_SECRET,
      { expiresIn:"7d" }
    );

    const user = await UserModel.create({
        Email,
        OTP: otp,
        OTPExpire: Date.now() + 5*60*1000,
        token
    });

    await sendOTPEmail(Email,otp);

    res.status(200).json({
        message:"OTP sent to mail",
        token
    });

 }catch(error){

    res.status(500).json({
        message:error.message
    });

 }

};