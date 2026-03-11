import express from "express"
import { Register } from "../Controller/AuthController.js"
import { VerifyOTP } from "../Controller/VerfiyOTP.js"
const router = express.Router()

router.post("/Register",Register)
router.post("/verifyOTP",VerifyOTP)
 
export default router