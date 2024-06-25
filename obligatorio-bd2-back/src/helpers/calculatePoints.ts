
const calculatePoints = (result_local: number, result_visitante: number, pred_local: number, pred_visitante: number): number => {

    let points = 0;

    if (result_local == pred_local && result_visitante == pred_visitante) {
        points += 2;
    }

    const actualWinner = result_local > result_visitante ? 'local' : result_local < result_visitante ? 'visitante' : 'draw';
    const predictedWinner = pred_local > pred_visitante ? 'local' : pred_local < pred_visitante ? 'visitante' : 'draw';

    if (predictedWinner === actualWinner) {
        points += 2;
    }
    
    return points;
};

export default calculatePoints;