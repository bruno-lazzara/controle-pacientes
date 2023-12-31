import ISessao from "./ISessao"

export default interface IPaciente {
    _id: string
    nome: string
    valor_secao: number
    desconta_imposto: boolean
    paciente_psi_mundo: boolean
    sessoes: ISessao[]
}
