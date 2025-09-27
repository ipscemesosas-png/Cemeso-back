import mongoose from 'mongoose';

const ausentismoSchema = new mongoose.Schema({
  empleadoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleados', required: true },
  mesName:{ type: String},
  tipoDeEvento: { type: String, required: true },
  inicioIncapacidad: { type: Date, required: true },
  finIncapacidad: { type: Date, required: true },
  diasIncapacidad: { type: Number},
  prorroga: { type: String, required: true },
  codigoDiagnostico: { type: String, required: true },
  descripcionIncapacidad: { type: String, required: true },
});

export default mongoose.model('Ausentismo', ausentismoSchema);
