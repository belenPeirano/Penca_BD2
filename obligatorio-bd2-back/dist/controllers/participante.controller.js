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
exports.actualizarPrediccion = exports.actualizarParticipante = exports.createPrediccion = exports.getPrediccionesByParticipante = exports.getPointsByParticipante = exports.getPrediccionByPartidoByParticipante = exports.getParticipantes = exports.login = exports.register = void 0;
const db_conn_1 = __importDefault(require("../db/db.conn"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ci, nombre, apellido, email, psw, id_carrera, predic_campeon, predic_subcampeon } = req.body;
        const salt = bcryptjs_1.default.genSaltSync(10);
        const pswHash = bcryptjs_1.default.hashSync(psw, salt);
        const [usuario] = yield db_conn_1.default.promise().query('INSERT INTO usuario (ci, nombre, apellido, email, psw) VALUES (?, ?, ?, ?, ?)', [ci, nombre, apellido, email, pswHash]);
        const [participante] = yield db_conn_1.default.promise().query('INSERT INTO estudiante (ci, id_carrera, predic_campeon, predic_subcampeon) VALUES (?, ?, ?, ?)', [ci, id_carrera, predic_campeon, predic_subcampeon]);
        res.json({ message: 'Participante registrado' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar participante' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, psw } = req.body;
        const [usuario] = yield db_conn_1.default.promise().query('SELECT * FROM usuario WHERE email = ?', [email]);
        if (usuario.length === 0) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }
        const [participante] = yield db_conn_1.default.promise().query('SELECT e.rol, u.* FROM usuario e LEFT JOIN estudiante u ON e.ci = u.ci WHERE e.ci = ?', [usuario[0].ci]);
        if (!bcryptjs_1.default.compareSync(psw, usuario[0].psw)) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }
        const token = yield (0, jwt_1.default)(usuario[0].ci);
        res.json({ message: 'Login exitoso', participante: participante[0], token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al loguear participante' });
    }
});
exports.login = login;
const getParticipantes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [participantes] = yield db_conn_1.default.promise().query(`
            SELECT u.ci, u.nombre, u.apellido, u.email, e.puntaje_total, c.nombre AS carrera, eq1.nombre AS campeon, eq2.nombre AS subcampeon 
                FROM usuario u 
                JOIN estudiante e ON u.ci = e.ci 
                JOIN carrera c ON e.id_carrera = c.id_carrera
                LEFT JOIN equipo eq1 ON e.predic_campeon = eq1.id_equipo
                LEFT JOIN equipo eq2 ON e.predic_subcampeon = eq2.id_equipo
                ORDER BY e.puntaje_total DESC;`);
        for (let i = 0; i < participantes.length; i++) {
            participantes[i].posicion = i + 1;
        }
        res.json(participantes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener participantes' });
    }
});
exports.getParticipantes = getParticipantes;
const getPrediccionByPartidoByParticipante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ci, id_partido } = req.params;
        const [prediccion] = yield db_conn_1.default.promise().query(`
            SELECT pr.id_prediccion, pr.id_partido, pr.ci_estudiante, pr.equipo_ganador AS id_equipo_ganador, pr.result_local, pr.result_visitante, pr.puntaje,
                   p.fecha, p.lugar, p.fase AS id_fase, f.nombre AS fase,
                   p.equipo_local AS id_local, e1.nombre AS local,
                   p.equipo_visitante AS id_visitante, e2.nombre AS visitante
            FROM prediccion pr
            JOIN partido p ON pr.id_partido = p.id_partido
            JOIN equipo e1 ON p.equipo_local = e1.id_equipo
            JOIN equipo e2 ON p.equipo_visitante = e2.id_equipo
            JOIN fase f ON p.fase = f.id_fase
            WHERE pr.ci_estudiante = ? AND pr.id_partido = ?
            ORDER BY p.fecha ASC;
        `, [ci, id_partido]);
        res.json(prediccion[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener predicciones' });
    }
});
exports.getPrediccionByPartidoByParticipante = getPrediccionByPartidoByParticipante;
const getPointsByParticipante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ci } = req.query;
        const [puntos] = yield db_conn_1.default.promise().query(`
            SELECT SUM(pr.puntaje) AS total_puntos
            FROM prediccion pr
            JOIN estudiante e ON pr.ci_estudiante = e.ci
            WHERE pr.ci_estudiante = ?
        `, [ci]);
        const total_puntos = puntos[0].total_puntos;
        res.json({ total_puntos });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener puntos' });
    }
});
exports.getPointsByParticipante = getPointsByParticipante;
const getPrediccionesByParticipante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ci } = req.params;
        const [predicciones] = yield db_conn_1.default.promise().query(`
            SELECT pr.id_prediccion, pr.id_partido, pr.ci_estudiante, pr.equipo_ganador AS id_equipo_ganador, pr.result_local, pr.result_visitante, pr.puntaje,
                   p.fecha, p.lugar, p.fase AS id_fase, f.nombre AS fase,
                   p.equipo_local AS id_local, e1.nombre AS local,
                   p.equipo_visitante AS id_visitante, e2.nombre AS visitante
            FROM prediccion pr
            JOIN partido p ON pr.id_partido = p.id_partido
            JOIN equipo e1 ON p.equipo_local = e1.id_equipo
            JOIN equipo e2 ON p.equipo_visitante = e2.id_equipo
            JOIN fase f ON p.fase = f.id_fase
            WHERE pr.ci_estudiante = ?
            ORDER BY p.fecha ASC;
        `, [ci]);
        res.json(predicciones);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener predicciones' });
    }
});
exports.getPrediccionesByParticipante = getPrediccionesByParticipante;
const createPrediccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_partido, ci_estudiante, equipo_ganador, result_local, result_visitante } = req.body;
        const [prediccion] = yield db_conn_1.default.promise().query('INSERT INTO prediccion (id_partido, ci_estudiante, equipo_ganador, result_local, result_visitante, puntaje) VALUES (?, ?, ?, ?, ?, 0)', [id_partido, ci_estudiante, equipo_ganador, result_local, result_visitante]);
        res.json({ message: 'Prediccion creada' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear prediccion' });
    }
});
exports.createPrediccion = createPrediccion;
const actualizarParticipante = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ci, nombre, apellido, email } = req.body;
        yield db_conn_1.default.promise().query(`
            update usuario
            set nombre = ?, apellido = ?, email = ?
            where ci = ?;`, [nombre, apellido, email, ci]);
        res.json({ message: 'Participante actualizado' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el participante' });
    }
});
exports.actualizarParticipante = actualizarParticipante;
const actualizarPrediccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_partido, ci_estudiante, equipo_ganador, result_local, result_visitante } = req.body;
        yield db_conn_1.default.promise().query(`
            update prediccion
            set id_partido = ?, ci_estudiante = ?, equipo_ganador = ?, result_local = ?, result_visitante = ?, puntaje = 0
            where ci_estudiante = ? AND id_partido = ?;
            `, [id_partido, ci_estudiante, equipo_ganador, result_local, result_visitante, ci_estudiante, id_partido]);
        res.json({ message: 'Predicción actualizada' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la predicción' });
    }
});
exports.actualizarPrediccion = actualizarPrediccion;
//# sourceMappingURL=participante.controller.js.map