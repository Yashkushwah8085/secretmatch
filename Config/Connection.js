import mongoose from "mongoose";

mongoose.connect("mongodb+srv://mryashkushwah8085_db_user:RuM99aTdrcgA6950@cluster0.ymchq2u.mongodb.net/secretMatch")
.then(()=>{
    console.log("Connected to database");
})
.catch((err)=>{
    console.log(err);
});

const connect = mongoose.connection;

export default connect;