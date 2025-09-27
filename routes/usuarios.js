import { Router } from "express";
import { check } from "express-validator";
import * as  usuarios from "../controllers/usuarios.js"
import { validateFields } from "../middlewares/validate-fields.js";

const router = Router()

router.get("/listar",usuarios.listarUsuario)

router.post("/crear",[
    check("nombre","El nombre es requerido").notEmpty(),
    check("cedula","La cedula es requerida").notEmpty(),
    check("password","El password es requerido").notEmpty(),
    validateFields
],usuarios.crearUsuario)

router.post("/login",usuarios.login)

export default router 