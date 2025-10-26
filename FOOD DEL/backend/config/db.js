import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://salmanmakki443_db_user:ylodD2knmFjnjjyk@cluster0.5qibb7y.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}