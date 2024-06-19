"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const db_conn_1 = __importDefault(require("../db/db.conn"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ci, nombre, apellido, email, psw, id_carrera, predic_campeon, predic_subcampeon } = req.body;
        const [usuario] = yield db_conn_1.default.promise().query('INSERT INTO usuario (ci, nombre, apellido, email, psw) VALUES (?, ?, ?, ?, ?)', [ci, nombre, apellido, email, psw]);
        const [participante] = yield db_conn_1.default.promise().query('INSERT INTO participante (ci, id_carrera, predic_campeon, predic_subcampeon) VALUES (?, ?, ?, ?)', [ci, id_carrera, predic_campeon, predic_subcampeon]);
        res.json({ message: 'Participante registrado' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar participante' });
    }
});
exports.register = register;
//# sourceMappingURL=participante.controller.js.map