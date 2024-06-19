"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const participante_controller_1 = require("../controllers/participante.controller");
const router = (0, express_1.Router)();
router.post('/register', participante_controller_1.register);
// router.post('/login', login)
// router.get('/participantes', getParticipantes)
// router.get('/points', getPointsByParticipante)
exports.default = router;
//# sourceMappingURL=participante.routes.js.map