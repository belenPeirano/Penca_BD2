export interface IPrediccion {
    id: number;
    partido: number;
    prediccionLocal: number;
    prediccionVisitante: number;
    usuarioId: number;
    puntaje: number;
    equipoGanador: string;
}
