import connection from "../db/db.conn";

const calculateChampionPoints = async (result_local: number, result_visitante: number) => {
    try {
        const champion = result_local > result_visitante ? 'local' : 'visitante';
        const runnerUp = result_local > result_visitante ? 'visitante' : 'local';

        const [championPredictions]: any[] = await connection.promise().query(
            'SELECT ci_estudiante, prediccion_campeon, prediccion_subcampeon FROM estudiante'
        );

        for (const prediction of championPredictions) {
            const { ci_estudiante, prediccion_campeon, prediccion_subcampeon } = prediction;
            let points = 0;

            if (prediccion_campeon === champion) {
                points += 10;
            }

            if (prediccion_subcampeon === runnerUp) {
                points += 5;
            }

            if (prediccion_campeon === champion && prediccion_subcampeon === runnerUp) {
                points = 15;
            }

            if (points > 0) {
                await connection.promise().query(
                    'UPDATE estudiante SET puntaje_total = puntaje_total + ? WHERE ci = ?;',
                    [points, ci_estudiante]
                );
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error al calcular los puntos del campeón y subcampeón');
    }
};

export default calculateChampionPoints;

