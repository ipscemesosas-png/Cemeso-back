import { Router } from "express";
import { check } from "express-validator";
import * as empleados from "../controllers/empleados.js"
import { validateFields } from "../middlewares/validate-fields.js"

const router = Router()

router.get('/listar/:id', empleados.empleadosEmpresa);

router.post("/crear",[
    check("empresaId","La empresaId es requerida").notEmpty(),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("cedula", "La cedula es requerida").notEmpty(),
    check("area","El area es requerida").notEmpty(),
    validateFields
],empleados.crearEmpleado)

router.put("/actualizar/:id",[
    check("empresaId","La empresaId es requerida").notEmpty(),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("cedula", "La cedula es requerida").notEmpty(),
    check("area","El area es requerida").notEmpty(),
    validateFields
], empleados.actualizarEmpleado);

router.delete("/eliminar/:id",[
    validateFields
], empleados.eliminarEmpleado);


export default router