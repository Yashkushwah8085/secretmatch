import ProfileModel from "../Models/ProfileModel.js";


export const uploadphoto = async (req,res) =>{
    try{
        const {id} = req.params;
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"no photo uploaded"
            })
        }
        
        const photo = await ProfileModel.findById(id)
        if(!photo){
            return res.status(404).json({
                success:false,
                message:"photo not found"
            });
        }
        photo.profile = req.file.filename;
        await photo.save()

        res.status(200).json({
            success:true,
            message:"photo uploaded successfully",
            photo:req.file.filename
        });
    }catch(error){
         return res.status(500).json({
            success:false,
            message:error.message
         });
    }
};