import UserModel from "../Models/UserModel.js";

export const VerifyOTP = async (req, res) => {
  try {
    const { Email, OTP } = req.body;

    if (!Email || !OTP) {
      return res.status(400).json({
        message: "Email and OTP are required"
      });
    }

    const user = await UserModel.findOne({ Email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    console.log("DB OTP:", user.OTP);
    console.log("User OTP:", OTP);

    // Check OTP
    if (user.OTP !== Number(OTP)) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    // Check Expiry
    if (!user.OTPExpire || user.OTPExpire < Date.now()) {
      return res.status(400).json({
        message: "OTP Expired"
      });
    }

    // Clear OTP after verification
    user.OTP = undefined;
    user.OTPExpire = undefined;
 

    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};