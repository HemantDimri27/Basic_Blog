import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://dimrihemant27:sQk6icfI0R4gWa98@cluster0.8o0oq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
        console.log("DB is connected sucessfully!");
    } catch (error) {
        console.log("DB is not connected! : ", error);
    }
}


export default connectDB;