import nodemaller from "nodemailer"

const transporter = nodemaller.createTransport({

    service:"gmail",
    auth:{
        user: "mr.yash.kushwah8085@gmail.com",
        pass: "spwu gfsr cxlp jorr", 
    }
});

export default transporter