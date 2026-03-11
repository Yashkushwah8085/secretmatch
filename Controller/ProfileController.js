import mongoose from "mongoose";
import ProfileModel from "../Models/ProfileModel.js";

 export const CreateProfile = async (req,res) =>{
     
    try {
           const {name,age,gender,interestedIn,bio,location} = req.body;
           if( !name || !age || !gender){
            return res.status(400).json({message: "all fields are required"
            });
           }

           const existingprofile = await ProfileModel.findOne({name})
           if(existingprofile){
            return res.status(400).json({
                message:"profile already exists"
            });
           }

           const profile = await ProfileModel.create({
    
            name,
            age,
            gender,
            interestedIn,
            bio,
            location,
           })
            return res.status(201).json({
                message:"profile created successfully",
                profile
            })


    }catch (error){
        return res.status(500).json({
            message: error.message
        });
    }
 };

 export const UpdateProfile = async (req,res) =>{

    try {
    const {id} = req.params;
    const {name,age,gender,interestedIn,bio,location} = req.body;
     
     const user = await ProfileModel.findById(id);
        if(!user){
            return res.status(404).json({
                message:"user not found"
            });
        }

        if(name) user.name = name;
        if(age) user.age = age;
        if(gender) user.gender = gender;
        if(interestedIn) user.interestedIn = interestedIn;
        if(bio) user.bio = bio;
        if(location) user.location = location;

        await user.save();

        return res.status(200).json({
            message:"profile updated succesfully",
            user
        });

    }catch (error){
        return res.status(500).json({
            message:error.message
        })
    }
 }

 export const GetUser = async (req,res) =>{
    try{

        const user = await ProfileModel.find().select("-OTP -OTPExpire -token")
        .sort({createdAt:-1});
         
        if(!user || user.length === 0){
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"user fetched successfully",
            totaluser: user.length,
            user
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        });
    }
 };

 export const DeleteProfile = async (req, res) => {
  try {

    const { id } = req.params;

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile id"
      });
    }

    const profile = await ProfileModel.findById(id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    await ProfileModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });

  }
};
 