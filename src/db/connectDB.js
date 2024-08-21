import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://dimrihemant27:6xPEVYcou79eqC4N@cluster0.k5s9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0}`)
        console.log("DB is connected sucessfully!");
    } catch (error) {
        console.log("DB is not connected! : ", error);
    }
}


export default connectDB;