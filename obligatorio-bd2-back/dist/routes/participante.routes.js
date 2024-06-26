"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_validator_1 = require("../middlewares/jwt-validator");
const participante_controller_1 = require("../controllers/participante.controller");
const router = (0, express_1.Router)();
router.post('/register', participante_controller_1.register);
router.post('/login', participante_controller_1.login);
router.get('/', [jwt_validator_1.validateJWT], participante_controller_1.getParticipantes);
router.get('/:ci/prediccion/:id_partido', [jwt_validator_1.validateJWT], participante_controller_1.getPrediccionByPartidoByParticipante);
router.get('/points', [jwt_validator_1.validateJWT], participante_controller_1.getPointsByParticipante);
router.post('/prediccion', [jwt_validator_1.validateJWT], participante_controller_1.createPrediccion);
router.get('/predicciones/:ci', [jwt_validator_1.validateJWT], participante_controller_1.getPrediccionesByParticipante);
router.put('/actualizar', [jwt_validator_1.validateJWT], participante_controller_1.actualizarParticipante);
router.put('/prediccion', [jwt_validator_1.validateJWT], participante_controller_1.actualizarPrediccion);
exports.default = router;
//# sourceMappingURL=participante.routes.js.map