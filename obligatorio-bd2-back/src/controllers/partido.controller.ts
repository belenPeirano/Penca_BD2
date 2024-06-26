import calculatePoints from '../helpers/calculatePoints';
import connection from '../db/db.conn';
import { Request, Response } from 'express';
import calculateChampionPoints from '../helpers/calculateChampionPoints';

export const getPartidos = async (req: Request, res: Response) => {
    try {
        const [partidos] = await connection.promise().query('SELECT p.id_partido, p.fecha, p.lugar, p.fase AS id_fase, p.equipo_local AS id_local, p.equipo_visitante AS id_visitante, f.nombre AS fase, e1.nombre AS local, e2.nombre AS visitante , p.result_local, p.result_visitante FROM partido p JOIN equipo e1 ON p.equipo_local = e1.id_equipo JOIN equipo e2 ON p.equipo_visitante = e2.id_equipo JOIN fase f ON p.fase = f.id_fase ORDER BY p.fecha ASC;');
        res.json(partidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener partidos'});
    }
} 

export const createPartido = async (req: Request, res: Response) => {
    try {
        const {fecha, lugar, fase, equipo_local, equipo_visitante} = req.body;
        await connection.promise().query('INSERT INTO partido (fecha, lugar, fase, equipo_local, equipo_visitante) VALUES (?, ?, ?, ?, ?);', [fecha, lugar, fase, equipo_local, equipo_visitante]);
        res.json({message: 'Partido creado'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al crear partido'});
    }
}

export const resolvePartido = async (req: Request, res: Response) => {
    try {
        const {id_partido, result_local, result_visitante} = req.body;
        await connection.promise().query('UPDATE partido SET result_local = ?, result_visitante = ? WHERE id_partido = ?;', [result_local, result_visitante, id_partido]);
        res.json({message: 'Partido resuelto'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al resolver partido'});
    }
}

export const getEquipos = async (req: Request, res: Response) => {
    try {
        const [equipos] = await connection.promise().query('SELECT * FROM equipo;');
        res.json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener equipos'});
    }
}


export const resolvePartidoNew = async (req: Request, res: Response) => {
    const { id_partido, result_local, result_visitante } = req.body;
    
    try {

        const fase = await connection.promise().query(
            'SELECT f.nombre AS fase_name FROM partido p JOIN fase f ON p.fase = f.id_fase WHERE p.id_partido = ?;',
            [id_partido]
        );
        await connection.promise().query(
            'UPDATE partido SET result_local = ?, result_visitante = ? WHERE id_partido = ?;',
            [result_local, result_visitante, id_partido]
        );

        const [predictions]: any[] = await connection.promise().query(
            'SELECT id_prediccion, ci_estudiante, result_local AS pred_local, result_visitante AS pred_visitante FROM prediccion WHERE id_partido = ?;',
            [id_partido]
        );

        for (const prediction of predictions) {
            const { id_prediccion, ci_estudiante, pred_local, pred_visitante } = prediction;
            
            const points = calculatePoints(result_local, result_visitante, pred_local, pred_visitante);

            await connection.promise().query(
                'UPDATE prediccion SET puntaje = ? WHERE id_prediccion = ?;',
                [points, id_prediccion]
            );

            await connection.promise().query(
                'UPDATE estudiante SET puntaje_total = puntaje_total + ? WHERE ci = ?;',
                [points, ci_estudiante]
            );
            
        }
        if (fase[0][0].fase_name === 'Final') {
            await calculateChampionPoints(result_local, result_visitante, id_partido);
        }
        
        res.json({ message: 'Partido resuelto y predicciones actualizadas' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al resolver partido' });
    }
};