import IStatusSemana from "./IStatusSemana"

export default interface ISessao {
    _id: string
    mes: number
    ano: number
    valor_total_pago: number
    status_semana: IStatusSemana
}