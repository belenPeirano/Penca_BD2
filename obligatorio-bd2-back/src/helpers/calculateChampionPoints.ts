import connection from "../db/db.conn";

const calculateChampionPoints = async (result_local: number, result_visitante: number, id_partido: number) => {
    try {
        const [partidoResult]: any[] = await connection.promise().query(
            'SELECT equipo_local, equipo_visitante FROM partido WHERE id_partido = ?',
            [id_partido]
        );

        if (partidoResult.length === 0) {
            console.log('No partido found with the given id');
            return;
        }

        const equipoLocalId = partidoResult[0].equipo_local;
        const equipoVisitanteId = partidoResult[0].equipo_visitante;

        const champion = result_local > result_visitante ? equipoLocalId : equipoVisitanteId;
        const runnerUp = result_local > result_visitante ? equipoVisitanteId : equipoLocalId;

        const [championPredictions]: any[] = await connection.promise().query(
            'SELECT ci, predic_campeon, predic_subcampeon FROM estudiante',
            [id_partido]
        );

        for (const prediction of championPredictions) {
            const { ci, predic_campeon, predic_subcampeon } = prediction;
            let points = 0;

            if (predic_campeon == champion) {
                points += 10;
            }

            if (predic_subcampeon == runnerUp) {
                points += 5;
            }

            if (predic_campeon == champion && predic_subcampeon === runnerUp) {
                points = 15;
            }

            if (points > 0) {
                await connection.promise().query(
                    'UPDATE estudiante SET puntaje_total = puntaje_total + ? WHERE ci = ?',
                    [points, ci]
                );
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error al calcular los puntos del campeón y subcampeón');
    }
};

export default calculateChampionPoints;
