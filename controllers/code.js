import Codes from "../models/codes.js";

export const listarCode = async (req, res) => {
  try {
    const code = await Codes.find()
    res.status(200).json(code);
  } catch (error) {
    console.error("Error al obtener codigos:", error);
    res.status(500).json({ error: "Error al obtener los codigos" });
  }
};

