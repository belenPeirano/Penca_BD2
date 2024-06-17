import { Router } from "express";

const router = Router();

router.post('/register', register)
router.post('/login', login)
router.get('/participantes', getParticipantes)
router.get('/points', getPointsByParticipante)
