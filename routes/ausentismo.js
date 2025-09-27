import { Router } from "express";
import { check } from "express-validator";
import * as ausentismo from "../controllers/ausentismo.js"
import { validateFields } from "../middlewares/validate-fields.js"

const router = Router()

router.get("/listarEmpleado/:id", ausentismo.AusentismosPorEmpleado);

router.get("/traerCodigos", ausentismo.traerCodigos);

router.post("/crear",[
    check("tipoDeEvento","El tipoDeEvento es requerida").notEmpty(),
    check("inicioIncapacidad","El inicioDeIncapacidad es requerida").notEmpty(),
    check("finIncapacidad","El finDeIncapacidad es requerida").notEmpty(),
    check("prorroga","La prorroga es requerida").notEmpty(),
    check("codigoDiagnostico","El codigoDiagnostico es requerida").notEmpty(),
    check("descripcionIncapacidad","La descripcionIncapacidad es requerida").notEmpty(),
    validateFields
], ausentismo.crearAusentismo);

router.put("/actualizar/:id",[
    check("tipoDeEvento","El tipoDeEvento es requerida").notEmpty(),
    check("inicioIncapacidad","El inicioDeIncapacidad es requerida").notEmpty(),
    check("finIncapacidad","El finDeIncapacidad es requerida").notEmpty(),
    check("prorroga","La prorroga es requerida").notEmpty(),
    check("codigoDiagnostico","El codigoDiagnostico es requerida").notEmpty(),
    check("descripcionIncapacidad","La descripcionIncapacidad es requerida").notEmpty(),
    validateFields
], ausentismo.actualizarAusentismo);

router.delete("/eliminar/:id", ausentismo.eliminarAusentismo);

export default router 