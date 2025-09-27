import { Router } from "express";
import * as code from "../controllers/code.js"

const router = Router()

router.get("/listarcode", code.listarCode );

export default router