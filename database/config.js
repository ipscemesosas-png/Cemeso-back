import mongoose from "mongoose";

const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_CNX)
        console.log("Base de datos conectada exitosamente");
    } catch(error) {
        console.log("🚀 ~ dbConnect ~ error:", error)
        throw new Error("Error al conectar con MongoDB")
    }
}

export {dbConnect}