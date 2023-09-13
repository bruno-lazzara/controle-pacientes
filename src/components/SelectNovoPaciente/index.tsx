import { FormControl, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../http";

interface INovoPaciente {
    _id: string,
    nome: string
}

interface Props {
    mes: string,
    ano: string
}

export default function SelectNovoPaciente({ mes, ano }: Props) {
    const [novosPacientes, setNovosPacientes] = useState<INovoPaciente[]>([]);

    useEffect(() => {
        buscarNovosPacientes();
    }, []);

    async function buscarNovosPacientes() {
        try {
            const config = {
                headers: {
                    'x-access-token': localStorage.getItem('access-token')
                }
            };

            const resposta = await http.get<INovoPaciente[]>(`/pacientes/semsessao/${mes}/${ano}`, config);
            setNovosPacientes(resposta.data);
        } catch (err) {
            setNovosPacientes([]);
        }
    }

    const adicionaSessaoPaciente = async (idPaciente: string) => {
        try {
            const config = {
                headers: {
                    'x-access-token': localStorage.getItem('access-token')
                }
            };

            const resultado = await http.put(
                '/pacientes/novasessao',
                {
                    pacienteId: idPaciente,
                    mes: Number(mes),
                    ano: Number(ano)
                },
                config
            );

            if (resultado.status === 200) {
                // TODO chamar método que atualiza lista dos pacientes com sessão no mês atual (Recoil)
            }
            else {
                throw new Error();
            }
        } catch (err) {
            alert('Erro ao adicionar paciente no mês')
        }
    }

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select value={''} sx={{ fontSize: '0.875rem' }} onChange={evento => adicionaSessaoPaciente(evento.target.value)}>
                <MenuItem value='' sx={{ height: '36px' }}></MenuItem>
                {novosPacientes.map(paciente =>
                    <MenuItem key={paciente._id} value={paciente._id}>{paciente.nome}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}