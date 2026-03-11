import transporter from "../Config/MailConfig.js";

export const sendOTPEmail = async (email,OTP) =>{

    const mailOptions = {
        from: `hey "mr.yash.kushwah8085@gmail.com"`,
        to: email,
        subject: "SecretMatch Email Verification",
        html: `<h2>Your OPT is :${OTP}</h2>`
    };

    await transporter.sendMail(mailOptions);
}