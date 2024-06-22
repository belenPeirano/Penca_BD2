import { Router } from "express";
import { validateJWT } from "../middlewares/jwt-validator";
import { createPartido, getEquipos, getPartidos, resolvePartido } from "../controllers/partido.controller";

const router = Router();

router.get('/', [validateJWT], getPartidos)
router.post('/', [validateJWT], createPartido)
router.put('/', [validateJWT], resolvePartido)
router.get('/equipos', [validateJWT], getEquipos)


export default router;