import IStatusSemana from "./IStatusSemana"

export default interface ISessao {
    _id: string
    mes: number
    ano: number
    valor_total_pago: number
    valor_total_devido: number
    status_semana: IStatusSemana
}