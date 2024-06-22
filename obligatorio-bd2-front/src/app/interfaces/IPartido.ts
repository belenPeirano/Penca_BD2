export interface IPartido {
    id_partido: number;
    fecha: string;
    lugar: string;
    id_fase: number;
    id_local: number;
    id_visitante: number;
    fase: string;
    local: string;
    visitante: string;
    result_local: number;
    result_visitante: number;
}
