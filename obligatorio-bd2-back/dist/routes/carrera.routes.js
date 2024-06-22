"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carrera_controller_1 = require("../controllers/carrera.controller");
const router = (0, express_1.Router)();
router.get('/', carrera_controller_1.getCarreras);
exports.default = router;
//# sourceMappingURL=carrera.routes.js.map