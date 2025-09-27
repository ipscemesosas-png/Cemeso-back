import mongoose from "mongoose";

const empleadosSchema = new mongoose.Schema({
    empresaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empresa', required: true },
    nombre:{ type: String, required: true},
    cedula:{ type: String, required: true, unique: true},
    cargo:{ type: String, required: true},
    area:{ type: String, required: true},
})

export default mongoose.model("Empleados",empleadosSchema)