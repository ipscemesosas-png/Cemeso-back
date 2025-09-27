import Usuarios from "../models/usuarios.js";
import jwt from "jsonwebtoken"

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h"//4h
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })

}

const validarJWT = async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try { 
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        let usuario = await Usuarios.findById({ _id: uid });

        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido "
            })
        }


        if (usuario.estado == 0) {
            return res.status(401).json({
                msg: "Token no válido " 
            })
        }

        req.usuario=usuario

        next();

    } catch (error) {
        res.status(401).json({
            msg: "Token no valido"
        })
    }
}


export { generarJWT, validarJWT }