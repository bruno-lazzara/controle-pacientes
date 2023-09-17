import { useEffect, useState } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { Navigate } from "react-router-dom";
import SelectStatusSessao from "../../components/SelectStatusSessao";
import SelectNovoPaciente from "../../components/SelectNovoPaciente";
import usePacientesMesAno from "../../state/hooks/usePacientesMesAno";
import useMes from "../../state/hooks/useMes";
import useAno from "../../state/hooks/useAno";
import FormMesAno from "../../components/FormMesAno";
import useAtualizarPacientesMesAno from "../../state/hooks/useAtualizarPacientesMesAno";
import ValorTotalNoMes from "../../components/ValorTotalNoMes";
import BotaoRemoverSessao from "../../components/BotaoRemoverSessao";
import { useSetRecoilState } from "recoil";
import { carregandoState } from "../../state/atom";

export default function Sessoes() {
    const mes = useMes();
    const ano = useAno();
    const pacientes = usePacientesMesAno();
    const [redirect, setRedirect] = useState(false);
    const atualizaListaPacientes = useAtualizarPacientesMesAno();
    const setCarregando = useSetRecoilState<boolean>(carregandoState);

    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            setRedirect(true);
            return;
        }
        // TODO verificar validade do token na API, e redirecionar para tela de login se já estiver inválido

        async function carregarPacientes() {
            setCarregando(true);
            await atualizaListaPacientes();
            setCarregando(false);
        }

        carregarPacientes();
    }, []);

    if (redirect) {
        return <Navigate to={'/'} />
    }

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <>
            <FormMesAno />

            <TableContainer component={Paper} sx={{ mt: '1.5rem' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#b6acd1' }}>
                        <TableRow>
                            <TableCell align='center'></TableCell>
                            <TableCell align='left'>Pacientes</TableCell>
                            <TableCell align='center'>Semana 1</TableCell>
                            <TableCell align='center'>Semana 2</TableCell>
                            <TableCell align='center'>Semana 3</TableCell>
                            <TableCell align='center'>Semana 4</TableCell>
                            <TableCell align='center'>Semana 5</TableCell>
                            <TableCell align='center'>Total Recebido</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pacientes.map(paciente =>
                            <StyledTableRow
                                key={paciente._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center' sx={{ px: '8px' }}>
                                    <BotaoRemoverSessao idPaciente={paciente._id} idSessao={paciente.sessoes[0]._id} />
                                </TableCell>
                                <TableCell align='left'>{paciente.nome}</TableCell>
                                <SelectStatusSessao paciente={paciente} semana={1} />
                                <SelectStatusSessao paciente={paciente} semana={2} />
                                <SelectStatusSessao paciente={paciente} semana={3} />
                                <SelectStatusSessao paciente={paciente} semana={4} />
                                <SelectStatusSessao paciente={paciente} semana={5} />
                                <TableCell align='center'>
                                    {paciente.sessoes[0].valor_total_pago.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                </TableCell>
                            </StyledTableRow>
                        )}
                        <StyledTableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell colSpan={5}>
                                <SelectNovoPaciente mes={mes} ano={ano} />
                            </TableCell>
                            <TableCell colSpan={2} align='right' sx={{ fontWeight: 'bold' }}>
                                TOTAL APÓS DESCONTOS
                            </TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                                <ValorTotalNoMes />
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
