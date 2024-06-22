import connection from '../db/db.conn';
import { Request, Response } from 'express';

export const getCarreras = async (req: Request, res: Response) => {
    try {
        const [carreras] = await connection.promise().query('SELECT * FROM carrera');
        res.json(carreras);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al obtener carreras'});
    }
}