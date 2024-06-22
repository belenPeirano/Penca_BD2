import connection from '../db/db.conn';
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import generateJWT from '../helpers/jwt';


export const register = async (req: Request, res: Response) => {
    try {
        const {ci, nombre, apellido, email, psw, id_carrera, predic_campeon, predic_subcampeon} = req.body;
        const salt = bcryptjs.genSaltSync(10);
        const pswHash = bcryptjs.hashSync(psw, salt);
        const[usuario] = await connection.promise().query('INSERT INTO usuario (ci, nombre, apellido, email, psw) VALUES (?, ?, ?, ?, ?)', [ci, nombre, apellido, email, pswHash]);
        const [participante] = await connection.promise().query('INSERT INTO estudiante (ci, id_carrera, predic_campeon, predic_subcampeon) VALUES (?, ?, ?, ?)', [ci, id_carrera, predic_campeon, predic_subcampeon]);
        res.json({message: 'Participante registrado'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al registrar participante'});
    }
    

}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, psw} = req.body;
        const [usuario] = await connection.promise().query('SELECT * FROM usuario WHERE email = ?', [email]);
        if (usuario.length === 0) {
            return res.status(400).json({message: 'Usuario o contraseña incorrectos'});
        }
        const [participante] = await connection.promise().query('SELECT e.*, u.rol FROM estudiante e LEFT JOIN usuario u ON e.ci = u.ci WHERE e.ci = ?', [usuario[0].ci]);
        if (!bcryptjs.compareSync(psw, usuario[0].psw)) {
            return res.status(400).json({message: 'Usuario o contraseña incorrectos'});
        }
        const token = await generateJWT(usuario[0].ci);
        res.json({message: 'Login exitoso', participante: participante[0], token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al loguear participante'});
    }
}

export const getParticipantes = async (req: Request, res: Response) => {
    try {
        const [participantes] = await connection.promise().query(`
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
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener participantes'});
    }
}

export const getPrediccionesByPartidoByParticipante = async (req: Request, res: Response) => {
    try {
        const {id_partido, ci} = req.body;
        const [predicciones] = await connection.promise().query(`
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
        res.json(predicciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener predicciones'});
    }
}

export const getPointsByParticipante = async (req: Request, res: Response) => {
    try {
        const {ci} = req.query;
        const [puntos] = await connection.promise().query(`
            SELECT SUM(pr.puntaje) AS total_puntos
            FROM prediccion pr
            JOIN estudiante e ON pr.ci_estudiante = e.ci
            WHERE pr.ci_estudiante = ?
        `, [ci]);
        const total_puntos = puntos[0].total_puntos;
        res.json({total_puntos});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener puntos'});
    }
}

export const getPrediccionesByParticipante = async (req: Request, res: Response) => {
    try {
        const {ci} = req.params;
        const [predicciones] = await connection.promise().query(`
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
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener predicciones'});
    }
}

export const createPrediccion = async (req: Request, res: Response) => {
    try {
        const {id_partido, ci_estudiante, equipo_ganador, result_local, result_visitante, puntaje} = req.body;
        const [prediccion] = await connection.promise().query('INSERT INTO prediccion (id_partido, ci_estudiante, equipo_ganador, result_local, result_visitante, puntaje) VALUES (?, ?, ?, ?, ?, ?)',
             [id_partido, ci_estudiante, equipo_ganador, result_local, result_visitante, puntaje]);
        res.json({message: 'Prediccion creada'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al crear prediccion'});
    }
}

