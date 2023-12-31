import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import usePacientes from "../../state/hooks/usePacientes";
import { useRecoilValue } from "recoil";
import { pacientesState } from "../../state/atom";

export default function Pacientes() {
    const pacientes = useRecoilValue(pacientesState);
    const buscaPacientes = usePacientes();

    useEffect(() => {
        buscaPacientes();
    }, [buscaPacientes]);

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
        <Container maxWidth='lg'>
            <Button
                component={Link}
                to={'/admin/pacientes/novo'}
                variant="contained"
                sx={{ padding: '0.75rem', mt: '0.5rem', backgroundColor: '#6899b6' }}
            >
                Cadastrar Paciente
            </Button>

            <TableContainer component={Paper} sx={{ mt: '1.5rem' }}>
                <Table size='small'>
                    <TableHead sx={{ backgroundColor: '#b6acd1' }}>
                        <TableRow>
                            <TableCell align='left' sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Valor da sessão</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Desconta imposto?</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Paciente Psicologia Pelo Mundo?</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pacientes.map(paciente =>
                            <StyledTableRow
                                key={paciente._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='left'>{paciente.nome}</TableCell>
                                <TableCell align='center'>{paciente.valor_secao.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</TableCell>
                                <TableCell align='center'>{paciente.desconta_imposto ? 'Sim' : 'Não'}</TableCell>
                                <TableCell align='center'>{paciente.paciente_psi_mundo ? 'Sim' : 'Não'}</TableCell>
                                <TableCell align='center'>
                                    <Button
                                        component={Link}
                                        to={`/admin/pacientes/${paciente._id}`}
                                        variant="contained"
                                        color='info'
                                    >
                                        <EditIcon></EditIcon>
                                    </Button>
                                </TableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}