import { Router } from "express";
import { validateJWT } from "../middlewares/jwt-validator";
import { createPrediccion, getParticipantes, getPointsByParticipante, getPrediccionesByParticipante, getPrediccionByPartidoByParticipante, login, register, actualizarParticipante, actualizarPrediccion } from "../controllers/participante.controller";

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.get('/', [validateJWT], getParticipantes)
router.get('/:ci/prediccion/:id_partido', [validateJWT], getPrediccionByPartidoByParticipante)
router.get('/:ci/points', [validateJWT], getPointsByParticipante)
router.post('/prediccion', [validateJWT], createPrediccion)
router.get('/predicciones/:ci', [validateJWT], getPrediccionesByParticipante)
router.put('/actualizar', [validateJWT], actualizarParticipante)
router.put('/prediccion', [validateJWT], actualizarPrediccion)



export default router;