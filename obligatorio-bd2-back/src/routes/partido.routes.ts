import { Router } from "express";
import { validateJWT } from "../middlewares/jwt-validator";
import { createPartido, getEquipos, getFases, getPartidos, resolvePartido } from "../controllers/partido.controller";

const router = Router();

router.get('/', [validateJWT], getPartidos)
router.post('/', [validateJWT], createPartido)
router.put('/', [validateJWT], resolvePartido)
router.get('/equipos', getEquipos)
router.get('/fases', getFases)


export default router;