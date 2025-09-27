import mongoose from "mongoose";

const empresaSchema = new mongoose.Schema({
    nombre:{ type: String, required: true},
    contextoEmpresa:{type: String, required: true},
    departamento:{type: String, required: true},
    ciudad:{type: String, required: true},
    foto:{type: String},
    estado:{type:Number, default:1},
})

export default mongoose.model("Empresas",empresaSchema)