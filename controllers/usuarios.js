import Usuarios from "../models/usuarios.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";

export const listarUsuario = async (req, res) => {
  try {
    const { busqueda } = req.query;
    const usuarios = await Usuarios.find({
      $or: [{ nombre: new RegExp(busqueda, "i") }],
    });
    res.status(200).json({ usuarios });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const salt = bcryptjs.genSaltSync(10);
    const { nombre, cedula, password } = req.body;

    const existeUsuario = await Usuarios.findOne({ cedula });
    if (existeUsuario) {
      return res.status(400).json({ error: "La cedula del usuario ya esta registrada" });
    }

    const usuario = new Usuarios({ nombre, cedula, password });
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ err: "No se pudo crear el usuario" });
  }
};



export const login = async (req, res) => {
  const { cedula, password } = req.body;
  try {
    const user = await Usuarios.findOne({ cedula });


    if (!user) {
      return res.status(401).json({
        msg: "Usuario/Contraseña no son  correctos",
      });
    }

    if (user.estado === 0) {
      return res.status(401).json({
        msg: "Usuario/Contraseña no son  correctos",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: "Usuario/Contraseña no son  correctos",
      });
    }

    const token = await generarJWT(user._id);
    res.json({
      usuario: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Hable con el Administrador",
    });
  }
};
