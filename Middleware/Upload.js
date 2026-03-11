import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"upload");
    },

    filename: (req,file,cb) =>{
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null,uniqueName);
    }
});

const fileFilter = (req,file,cb) =>{
 const allowedTypes = ["image/jpeg","image/jpg","image/png"]
  if(allowedTypes.includes(file.mimetype)){
    cb(null,true)
  }else{
    cb(new Error("only image are allowed"),false)
  }
};

export const upload = multer({
    storage,
    fileFilter,
    limits:{fileSize:5*1024*1024}
});
   
