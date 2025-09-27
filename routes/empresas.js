import { Router } from "express";
import { check } from "express-validator";
import * as empresas from "../controllers/empresas.js"
import { validateFields } from "../middlewares/validate-fields.js"
import validateFile from "../middlewares/validateFile.js";

const router = Router()

router.get("/obtener",empresas.obtenerEmpresas)

router.post("/crear",[
    check("nombre","El nombre es requerido").notEmpty(),
    check("contextoEmpresa","El contextoEmpresa es requerido").notEmpty(),
    check("departamento","El departamento es querido").notEmpty(),
    check("ciudad","La ciudad es querido").notEmpty(),
    validateFields
],empresas.crearEmpresa)

router.put('/actualizar/:id',[
    check("nombre","El nombre es requerido").notEmpty(),
    check("contextoEmpresa","El contextoEmpresa es requerido").notEmpty(),
    check("departamento","El departamento es querido").notEmpty(),
    check("ciudad","La ciudad es querido").notEmpty(),
    validateFields
], empresas.actualizarEmpresa);

router.put("/editarFoto/:id",[validateFile,validateFields],empresas.editFoto)

router.put("/activarEmpresa/:id",empresas.putActivarEmpresa)

router.put("/desactivarEmpresa/:id",empresas.putDesactivarEmpresa)

router.delete("/eliminar/:id",empresas.eliminarEmpresa)

export default router


