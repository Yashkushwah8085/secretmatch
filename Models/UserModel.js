import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    Email: {
        type: String,
        unique: true,
        required: true,
    },

    Password: {
        type: String
    },

    OTP: {
        type: Number,
        default: null
    },

    OTPExpire: {
        type: Date,
        required: false,
    },
    token: {
        type: String
    }


})

const UserModel = mongoose.model("SecretMatch", UserSchema);

export default UserModel