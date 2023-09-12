import { FormControl, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import IStatusSemana from "../../interfaces/IStatusSemana";
import http from "../../http";
import IPaciente from "../../interfaces/IPaciente";

interface SessaoProp {
    paciente: IPaciente,
    semana: number
}

export default function SelectStatusSessao({ paciente, semana }: SessaoProp) {
    const [statusSemana, setStatusSemana] = useState<IStatusSemana>(paciente.sessoes[0].status_semana);
    const [valor, setValor] = useState<string>(getValor());

    function getValor() {
        switch (semana) {
            case 1:
                return statusSemana.semana_1 ?? '';
            case 2:
                return statusSemana.semana_2 ?? '';
            case 3:
                return statusSemana.semana_3 ?? '';
            case 4:
                return statusSemana.semana_4 ?? '';
            case 5:
                return statusSemana.semana_5 ?? '';
            default:
                return '';
        }
    }

    async function alteraStatusSemana(status: string) {
        setValor(status);
        switch (semana) {
            case 1:
                statusSemana.semana_1 = status;
                break;
            case 2:
                statusSemana.semana_2 = status;
                break;
            case 3:
                statusSemana.semana_3 = status;
                break;
            case 4:
                statusSemana.semana_4 = status;
                break;
            case 5:
                statusSemana.semana_5 = status;
                break;
            default:
                return '';
        }

        try {
            const config = {
                headers: {
                    'x-access-token': localStorage.getItem('access-token')
                }
            };

            const resultado = await http.put(
                `/pacientes/${paciente._id}/${paciente.sessoes[0]._id}`,
                {
                    status_semana: statusSemana
                },
                config
            );

            if (resultado.status === 200) {
                setStatusSemana(statusSemana);
            }
            else {
                throw new Error();
            }
        } catch (err) {
            alert('Erro ao atualizar sessão semanal do paciente');
        }
    }

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select value={valor} sx={{ fontSize: '0.875rem' }} onChange={evento => alteraStatusSemana(evento.target.value)}>
                <MenuItem value='' sx={{ height: '36px' }}></MenuItem>
                <MenuItem value={'NÃO TEVE'}>NÃO TEVE</MenuItem>
                <MenuItem value={'TEVE'}>TEVE</MenuItem>
                <MenuItem value={'NO SHOW'}>NO SHOW</MenuItem>
                <MenuItem value={'PAGO'}>PAGO</MenuItem>
            </Select>
        </FormControl>
    )
}