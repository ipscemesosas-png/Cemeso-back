import mongoose from 'mongoose';

const codeSchema = new mongoose.Schema({
  codigoDiagnostico: { type: String},
  descripcionIncapacidad: { type: String},
});

export default mongoose.model('Code', codeSchema);