import { useEffect, useState } from "react";
import http from "../../http";
import IPaciente from "../../interfaces/IPaciente";
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { Navigate } from "react-router-dom";
import SelectStatusSessao from "../../components/SelectStatusSessao";
import SelectNovoPaciente from "../../components/SelectNovoPaciente";

export default function Sessoes() {
    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();

    const [redirect, setRedirect] = useState(false);
    const [pacientes, setPacientes] = useState<IPaciente[]>([]);
    const [mes, setMes] = useState(mesAtual.toString());
    const [ano, setAno] = useState(anoAtual.toString());

    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            setRedirect(true);
            return;
        }
        // TODO verificar validade do token na API, e redirecionar para tela de login se já estiver inválido

        buscarPacientes();
    }, []);

    async function buscarPacientes() {
        try {
            const config = {
                headers: {
                    'x-access-token': localStorage.getItem('access-token')
                }
            };

            const resposta = await http.get<IPaciente[]>(`/pacientes/${mes}/${ano}`, config);
            setPacientes(resposta.data);
        } catch (err) {
            alert('Erro ao buscar sessões');
        }
    }

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
            {/* TODO transformar este formulário em componente e usar Recoil para mudar o estado do array de pacientes */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="mes-sessao-label">Mês</InputLabel>
                <Select
                    labelId="mes-sessao-label"
                    id="mes-sessao"
                    value={mes}
                    label="Mês"
                    onChange={evento => setMes(evento.target.value)}
                >
                    <MenuItem value={1}>01</MenuItem>
                    <MenuItem value={2}>02</MenuItem>
                    <MenuItem value={3}>03</MenuItem>
                    <MenuItem value={4}>04</MenuItem>
                    <MenuItem value={5}>05</MenuItem>
                    <MenuItem value={6}>06</MenuItem>
                    <MenuItem value={7}>07</MenuItem>
                    <MenuItem value={8}>08</MenuItem>
                    <MenuItem value={9}>09</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="ano-sessao-label">Ano</InputLabel>
                <Select
                    labelId="ano-sessao-label"
                    id="ano-sessao"
                    value={ano}
                    label="Mês"
                    onChange={evento => setAno(evento.target.value)}
                >
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                sx={{ padding: '1rem', mt: '0.5rem', ml: '8px', height: '100%' }}
                onClick={buscarPacientes}
            >
                Buscar
            </Button>

            <TableContainer component={Paper} sx={{ mt: '1.5rem' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: 'lightpink' }}>
                        <TableRow>
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
                                <TableCell align='left'>{paciente.nome}</TableCell>
                                <TableCell align='center'>
                                    <SelectStatusSessao paciente={paciente} semana={1} />
                                </TableCell>
                                <TableCell align='center'>
                                    <SelectStatusSessao paciente={paciente} semana={2} />
                                </TableCell>
                                <TableCell align='center'>
                                    <SelectStatusSessao paciente={paciente} semana={3} />
                                </TableCell>
                                <TableCell align='center'>
                                    <SelectStatusSessao paciente={paciente} semana={4} />
                                </TableCell>
                                <TableCell align='center'>
                                    <SelectStatusSessao paciente={paciente} semana={5} />
                                </TableCell>
                                <TableCell align='center'></TableCell>
                            </StyledTableRow>
                        )}
                        <StyledTableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                <SelectNovoPaciente mes={mes} ano={ano} />
                            </TableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
