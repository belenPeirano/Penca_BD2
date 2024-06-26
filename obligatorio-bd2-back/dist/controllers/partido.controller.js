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
exports.getFases = exports.getEquipos = exports.resolvePartido = exports.createPartido = exports.getPartidos = void 0;
const db_conn_1 = __importDefault(require("../db/db.conn"));
const getPartidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [partidos] = yield db_conn_1.default.promise().query('SELECT p.id_partido, p.fecha, p.lugar, p.fase AS id_fase, p.equipo_local AS id_local, p.equipo_visitante AS id_visitante, f.nombre AS fase, e1.nombre AS local, e2.nombre AS visitante , p.result_local, p.result_visitante FROM partido p JOIN equipo e1 ON p.equipo_local = e1.id_equipo JOIN equipo e2 ON p.equipo_visitante = e2.id_equipo JOIN fase f ON p.fase = f.id_fase ORDER BY p.fecha ASC;');
        res.json(partidos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener partidos' });
    }
});
exports.getPartidos = getPartidos;
const createPartido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fecha, lugar, fase, equipo_local, equipo_visitante } = req.body;
        yield db_conn_1.default.promise().query('INSERT INTO partido (fecha, lugar, fase, equipo_local, equipo_visitante) VALUES (?, ?, ?, ?, ?);', [fecha, lugar, fase, equipo_local, equipo_visitante]);
        res.json({ message: 'Partido creado' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear partido' });
    }
});
exports.createPartido = createPartido;
const resolvePartido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_partido, result_local, result_visitante } = req.body;
        yield db_conn_1.default.promise().query('UPDATE partido SET result_local = ?, result_visitante = ? WHERE id_partido = ?;', [result_local, result_visitante, id_partido]);
        res.json({ message: 'Partido resuelto' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al resolver partido' });
    }
});
exports.resolvePartido = resolvePartido;
const getEquipos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [equipos] = yield db_conn_1.default.promise().query('SELECT * FROM equipo;');
        res.json(equipos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener equipos' });
    }
});
exports.getEquipos = getEquipos;
const getFases = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [fases] = yield db_conn_1.default.promise().query('SELECT * FROM fase;');
        res.json(fases);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener fases' });
    }
});
exports.getFases = getFases;
//# sourceMappingURL=partido.controller.js.map