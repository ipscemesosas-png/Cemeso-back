import mongoose from "mongoose";

const usuariosSchema = new mongoose.Schema({
    nombre:{ type: String, required: true},
    cedula:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    estado:{ type: Number, default: 1},
    createAt:{type:Date, default:Date.now}
})

export default mongoose.model("Usuarios",usuariosSchema)