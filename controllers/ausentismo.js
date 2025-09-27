import Ausentismo from "../models/ausentismo.js";
import Empleado from "../models/empleados.js";
import Code from "../models/codes.js"

export const AusentismosPorEmpleado = async (req, res) => {
  try {
    const { id } = req.params;
    const casos = await Ausentismo.find({ empleadoId: id }).populate(
      "empleadoId"
    );

    res.status(200).json(casos);
  } catch (error) {
    console.error("Error al obtener ausentismos:", error);
    res.status(500).json({ error: "Error al obtener los casos del empleado" });
  }
};

export const traerCodigos = async (req, res) => {
  try {
    const codigos = await Code.find()
    res.status(200).json(codigos)
  } catch (error) {
    console.error("Error al obtener codigos:", error);
    res.status(500).json({ error: "Error al obtener los codigos" });
  }
};

const obtenerNombreMes = (fecha) => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return meses[fecha.getMonth()];
};

export const crearAusentismo = async (req, res) => {
  try {
    const {
      empleadoId,
      tipoDeEvento,
      inicioIncapacidad,
      finIncapacidad,
      prorroga,
      codigoDiagnostico,
      descripcionIncapacidad,
    } = req.body;

    const empleado = await Empleado.findById(empleadoId);
    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }

    const inicio = new Date(inicioIncapacidad);
    const fin = new Date(finIncapacidad);

    if (isNaN(inicio) || isNaN(fin)) {
      return res
        .status(400)
        .json({ error: "Formato de fecha inválido. Usa 'YYYY-MM-DD'" });
    }

    if (fin < inicio) {
      return res
        .status(400)
        .json({
          error: "La fecha de fin no puede ser anterior a la de inicio",
        });
    }

    const diasIncapacidad =
      Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1;
    const mes = obtenerNombreMes(inicio); // ← Nombre del mes

    const nuevoAusentismo = new Ausentismo({
      empleadoId,
      mesName: mes,
      tipoDeEvento,
      inicioIncapacidad: inicio,
      finIncapacidad: fin,
      diasIncapacidad,
      prorroga,
      codigoDiagnostico,
      descripcionIncapacidad,
    });

    await nuevoAusentismo.save();

    res.status(201).json(nuevoAusentismo);
  } catch (error) {
    console.error("Error al crear ausentismo:", error);
    res.status(500).json({ error: "Error al registrar el caso de ausentismo" });
  }
};

export const actualizarAusentismo = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      empleadoId,
      tipoDeEvento,
      inicioIncapacidad,
      finIncapacidad,
      prorroga,
      codigoDiagnostico,
      descripcionIncapacidad,
    } = req.body;

    let datosActualizados = {
      tipoDeEvento,
      prorroga,
      codigoDiagnostico,
      descripcionIncapacidad,
    };

    if (empleadoId) {
      const empleado = await Empleado.findById(empleadoId);
      if (!empleado) {
        return res.status(404).json({ error: "Empleado no encontrado" });
      }
      datosActualizados.empleadoId = empleadoId;
    }

    if (inicioIncapacidad || finIncapacidad) {
      const inicio = inicioIncapacidad ? new Date(inicioIncapacidad) : null;
      const fin = finIncapacidad ? new Date(finIncapacidad) : null;

      if (
        (inicioIncapacidad && isNaN(inicio)) ||
        (finIncapacidad && isNaN(fin))
      ) {
        return res
          .status(400)
          .json({ error: "Formato de fecha inválido. Usa 'YYYY-MM-DD'" });
      }

      if (inicio && fin && fin < inicio) {
        return res
          .status(400)
          .json({
            error: "La fecha de fin no puede ser anterior a la de inicio",
          });
      }

      if (inicio) datosActualizados.inicioIncapacidad = inicio;
      if (fin) datosActualizados.finIncapacidad = fin;

      if (inicio && fin) {
        datosActualizados.diasIncapacidad =
          Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24)) + 1;
        datosActualizados.mesName = obtenerNombreMes(inicio);
      }
    }

    const ausentismoActualizado = await Ausentismo.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true }
    );

    if (!ausentismoActualizado) {
      return res
        .status(404)
        .json({ mensaje: "Caso de ausentismo no encontrado" });
    }

    res.status(200).json(ausentismoActualizado);
  } catch (error) {
    console.error("Error al actualizar ausentismo:", error);
    res
      .status(500)
      .json({ error: "Error al actualizar el caso de ausentismo" });
  }
};

export const eliminarAusentismo = async (req, res) => {
  try {
    const { id } = req.params;

    const ausentismoEliminado = await Ausentismo.findByIdAndDelete(id);

    if (!ausentismoEliminado) {
      return res.status(404).json({ mensaje: "Ausentismo no encontrado" });
    }

    res.json({ mensaje: "Ausentismo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el Ausentismo" });
  }
};
