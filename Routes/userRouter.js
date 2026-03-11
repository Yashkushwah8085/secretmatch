import express from "express"
import { CreateProfile, DeleteProfile, GetUser, UpdateProfile } from "../Controller/ProfileController.js"
import { upload } from "../Middleware/Upload.js";
import { uploadphoto } from "../Controller/photoUpload.js" 
const router = express.Router()

router.post("/createprofile",CreateProfile)
router.put("/updateprofile/:id",UpdateProfile)
router.get("/getuser",GetUser)
router.delete("/deleteuser/:id",DeleteProfile)
router.post("/upload-photo/:id", upload.single("photos"), uploadphoto);
export default router