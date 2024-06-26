"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_validator_1 = require("../middlewares/jwt-validator");
const partido_controller_1 = require("../controllers/partido.controller");
const router = (0, express_1.Router)();
router.get('/', [jwt_validator_1.validateJWT], partido_controller_1.getPartidos);
router.post('/', [jwt_validator_1.validateJWT], partido_controller_1.createPartido);
router.put('/', [jwt_validator_1.validateJWT], partido_controller_1.resolvePartido);
router.get('/equipos', partido_controller_1.getEquipos);
router.get('/fases', partido_controller_1.getFases);
exports.default = router;
//# sourceMappingURL=partido.routes.js.map