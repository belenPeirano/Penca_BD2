import { Router } from "express";
import { validateJWT } from "../middlewares/jwt-validator";
import { createPrediccion, getParticipantes, getPointsByParticipante, getPrediccionesByParticipante, getPrediccionesByPartidoByParticipante, login, register } from "../controllers/participante.controller";

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.get('/', [validateJWT], getParticipantes)
router.get('/prediccion', [validateJWT], getPrediccionesByPartidoByParticipante)
router.get('/points', [validateJWT], getPointsByParticipante)
router.post('/prediccion', [validateJWT], createPrediccion)
router.get('/predicciones/:ci', [validateJWT], getPrediccionesByParticipante)



export default router;