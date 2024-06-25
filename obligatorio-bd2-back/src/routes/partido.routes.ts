import { Router } from "express";
import { validateJWT } from "../middlewares/jwt-validator";
import { createPartido, getEquipos, getPartidos, resolvePartido, resolvePartidoNew } from "../controllers/partido.controller";

const router = Router();

router.get('/', [validateJWT], getPartidos)
router.post('/', [validateJWT], createPartido)
router.put('/', resolvePartidoNew)
router.get('/equipos', getEquipos)


export default router;