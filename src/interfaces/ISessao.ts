import IStatusSemana from "./IStatusSemana"

export default interface ISessao {
    _id: string
    mes: number
    ano: number
    status_semana: IStatusSemana
}