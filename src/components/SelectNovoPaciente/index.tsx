import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { memo, useEffect, useState } from "react";
import http from "../../http";
import useAtualizarPacientesMesAno from "../../state/hooks/useAtualizarPacientesMesAno";
import { useSetRecoilState } from "recoil";
import { carregandoState } from "../../state/atom";
import useMes from "../../state/hooks/useMes";
import useAno from "../../state/hooks/useAno";

interface INovoPaciente {
    _id: string,
    nome: string
}

function SelectNovoPaciente() {
    const mes = useMes();
    const ano = useAno();
    const [novosPacientes, setNovosPacientes] = useState<INovoPaciente[]>([]);
    const atualizarListaPacientes = useAtualizarPacientesMesAno();
    const setCarregando = useSetRecoilState<boolean>(carregandoState);
    
    useEffect(() => {
        async function buscarNovosPacientes() {
            try {
                const resposta = await http.get<INovoPaciente[]>(`/pacientes/semsessao/${mes}/${ano}`);
                setNovosPacientes(resposta.data);
            } catch (err) {
                setNovosPacientes([]);
            }
        }
        
        buscarNovosPacientes();
    }, [mes, ano]);

    const adicionaSessaoPaciente = async (idPaciente: string) => {
        setCarregando(true);
        try {
            const resultado = await http.put(
                '/pacientes/novasessao',
                {
                    pacienteId: idPaciente,
                    mes: Number(mes),
                    ano: Number(ano)
                }
            );

            if (resultado.status === 200) {
                await atualizarListaPacientes(mes, ano);
            }
            else {
                throw new Error();
            }
        } catch (err) {
            alert('Erro ao adicionar paciente no mês');
        }
        setCarregando(false);
    }

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: 240 }}>
            <InputLabel id="adicionar-paciente-label">Adicionar Paciente</InputLabel>
            <Select
                labelId="adicionar-paciente-label"
                id="adicionar-paciente"
                value={''}
                sx={{ fontSize: '0.875rem' }}
                onChange={evento => adicionaSessaoPaciente(evento.target.value)}
                label="Adicionar Paciente"
            >
                {novosPacientes.map(paciente =>
                    <MenuItem key={paciente._id} value={paciente._id}>{paciente.nome}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default memo(SelectNovoPaciente);