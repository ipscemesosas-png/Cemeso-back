import Empleados from "../models/empleados.js";
import Empresas from "../models/empresas.js";


export const empleadosEmpresa = async (req, res) => {
  try {
    const empresaId = req.params.id;

    const empleados = await Empleados.find({ empresaId });

    if (empleados.length === 0) {
      return res.status(200).json({ mensaje: "Esta empresa no tiene empleados registrados" });
    }

    res.status(200).json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    res.status(500).json({ error: "Error al obtener empleados de la empresa" });
  }
};

export const crearEmpleado = async (req, res) => {
  try {
    const {
      empresaId,
      nombre,
      cedula,
      cargo,
      area,
    } = req.body;

    const nameEmpresa = await Empresas.findById(empresaId);
    if (!nameEmpresa) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }

    const cedulaExistente = await Empleados.findOne({ cedula });
    if (cedulaExistente) {
      return res.status(400).json({ error: "Cedula existente en la base de datos" });
    }

    const empleado = new Empleados({
      empresaId,
      nombre,
      cedula,
      empresa: nameEmpresa.nombre,
      cargo,
      area,
    });

    await empleado.save();
    res.status(200).json(empleado);
  } catch (error) {
    console.error("Error al crear empleado:", error);
    res.status(500).json({ error: "No se pudo crear el empleado" });
  }
};


export const actualizarEmpleado = async (req, res) => {
  try {
    const { id } = req.params; 
    const { empresaId, nombre, cedula, cargo, area } = req.body;

    let datosActualizados = { nombre, cedula, cargo, area };

    
    console.log("🚀 ~ actualizarEmpleado ~ empresaId:", empresaId)
    if (empresaId) {
      const empresa = await Empresas.findById(empresaId);
      if (!empresa) {
        return res.status(404).json({ error: "Empresa no encontrada" });
      }
      datosActualizados.empresaId = empresaId;
      datosActualizados.empresa = empresa.nombre;
    }

    const empleadoActualizado = await Empleados.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true }
    );

    if (!empleadoActualizado) {
      return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }

    res.status(200).json(empleadoActualizado);
  } catch (error) {
    console.error("Error al actualizar empleado:", error);
    res.status(500).json({ error: "No se pudo actualizar el empleado" });
  }
};

export const eliminarEmpleado = async (req, res) => {
  try {
    const { id } = req.params;

    const empleadoEliminado = await Empleados.findByIdAndDelete(id);

    if (!empleadoEliminado) {
      return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    res.json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el Empleado' });
  }
};


