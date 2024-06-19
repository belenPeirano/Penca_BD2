import { Router } from "express";
import { validateJWT } from "../middlewares/jwt-validator";
import { getParticipantes, getPointsByParticipante, getPrediccionesByPartidoByParticipante, login, register } from "../controllers/participante.controller";

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.get('/', [validateJWT], getParticipantes)
router.get('/prediccion', [validateJWT], getPrediccionesByPartidoByParticipante)
router.get('/points', [validateJWT], getPointsByParticipante)


export default router;