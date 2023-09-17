import { FormControl, Select, MenuItem, TableCell } from "@mui/material";
import { useState } from "react";
import IStatusSemana from "../../interfaces/IStatusSemana";
import http from "../../http";
import IPaciente from "../../interfaces/IPaciente";
import useAtualizarPacientesMesAno from "../../state/hooks/useAtualizarPacientesMesAno";
import { useSetRecoilState } from "recoil";
import { carregandoState } from "../../state/atom";

interface SessaoProp {
    paciente: IPaciente,
    semana: 1 | 2 | 3 | 4 | 5
}

export default function SelectStatusSessao({ paciente, semana }: SessaoProp) {
    const [statusSemana, setStatusSemana] = useState<IStatusSemana>(paciente.sessoes[0].status_semana);
    const [valor, setValor] = useState<string>(getValor());
    const atualizaListaPacientes = useAtualizarPacientesMesAno();
    const setCarregando = useSetRecoilState<boolean>(carregandoState);

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
        }
    }

    async function alteraStatusSemana(status: string) {
        setCarregando(true);
        setValor(status);
        let novoStatusSemana = {
            semana_1: statusSemana.semana_1,
            semana_2: statusSemana.semana_2,
            semana_3: statusSemana.semana_3,
            semana_4: statusSemana.semana_4,
            semana_5: statusSemana.semana_5
        };
        switch (semana) {
            case 1:
                novoStatusSemana.semana_1 = status;
                break;
            case 2:
                novoStatusSemana.semana_2 = status;
                break;
            case 3:
                novoStatusSemana.semana_3 = status;
                break;
            case 4:
                novoStatusSemana.semana_4 = status;
                break;
            case 5:
                novoStatusSemana.semana_5 = status;
                break;
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
                    status_semana: novoStatusSemana
                },
                config
            );

            if (resultado.status === 200) {
                setStatusSemana(novoStatusSemana);
                atualizaListaPacientes();
            }
            else {
                throw new Error();
            }
        } catch (err) {
            alert('Erro ao atualizar sessão semanal do paciente');
        }
        setCarregando(false);
    }

    function getCor() {
        switch (valor) {
            case 'NÃO TEVE':
                return '#ffdbdb';
            case 'PAGO':
                return '#dbffe0';
            case 'TEVE':
                return '#fffedb';
            case 'NO SHOW':
                return '#fffedb';
            default:
                return '';
        }
    }

    const cor = getCor();

    return (
        <TableCell align='center' sx={{ backgroundColor: cor }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select value={valor} sx={{ fontSize: '0.875rem' }} onChange={evento => alteraStatusSemana(evento.target.value)}>
                    <MenuItem value='' sx={{ height: '36px' }}></MenuItem>
                    <MenuItem value={'NÃO TEVE'}>NÃO TEVE</MenuItem>
                    <MenuItem value={'TEVE'}>TEVE</MenuItem>
                    <MenuItem value={'NO SHOW'}>NO SHOW</MenuItem>
                    <MenuItem value={'PAGO'}>PAGO</MenuItem>
                </Select>
            </FormControl>
        </TableCell>
    )
}