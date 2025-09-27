import Empresas from "../models/empresas.js";
import { v2 as cloudinary } from 'cloudinary';

export const obtenerEmpresas = async (req, res) => {
  try {
    const empresas = await Empresas.find().sort({ nombre: 1 }); // ordena alfabéticamente si quieres
    res.status(200).json(empresas);
  } catch (error) {
    console.error("Error al obtener empresas:", error);
    res.status(500).json({ error: "Error al obtener las empresas" });
  }
};

export const crearEmpresa = async (req, res) => {
  try {
    const { nombre, contextoEmpresa, departamento, ciudad } = req.body;
    const empresa = new Empresas({
      nombre,
      contextoEmpresa,
      departamento,
      ciudad,
    });
    await empresa.save();
    res.status(200).json(empresa);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const actualizarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, contextoEmpresa, departamento, ciudad } = req.body;

    const empresaActualizada = await Empresas.findByIdAndUpdate(
      id,
      { nombre, contextoEmpresa, departamento, ciudad },
      { new: true }
    );

    if (!empresaActualizada) {
      return res.status(404).json({ mensaje: "Empresa no encontrada" });
    }

    res.status(200).json(empresaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar la empresa", error });
  }
};

export const putActivarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const clientes = await Empresas.findByIdAndUpdate(
      id,
      { estado: 1 },
      { new: true }
    );
    res.json({ clientes });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const putDesactivarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;
    const clientes = await Empresas.findByIdAndUpdate(
      id,
      { estado: 0 },
      { new: true }
    );
    res.json({ clientes });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const editFoto = async (req, res) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
  });

  const { id } = req.params;
  
  try {
    const { tempFilePath } = req.files.file;
    let empresa = await Empresas.findById(id);
    console.log(empresa);
    
    if (!empresa) {
      return res.status(404).json({ message: "Actor not found" });
    }
    cloudinary.uploader.upload(
      tempFilePath,
      { width: 250, crop: "limit" },
      async function (error, result) {
        if (result) {
          if (empresa.foto) {
            const nameTemp = empresa.foto.split("/");
            const nameFile = nameTemp[nameTemp.length - 1];
            const [public_id] = nameFile.split(".");
            cloudinary.uploader.destroy(public_id);
          }
          empresa = await Empresas.findByIdAndUpdate(id, { foto: result.url });
          res.status(200).json({ url: result.url });
        } else {
          res.status(500).json({ message: "Server error" });
        }
      }
    );
  } catch (error) {
    console.log("🚀 ~ editfoto ~ error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const eliminarEmpresa = async (req, res) => {
  try {
    const { id } = req.params;

    const empresasEliminado = await Empresas.findByIdAndDelete(id);

    if (!empresasEliminado) {
      return res.status(404).json({ mensaje: 'Empresa no encontrado' });
    }

    res.json({ mensaje: 'Empresa eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el Empresas' });
  }
};
