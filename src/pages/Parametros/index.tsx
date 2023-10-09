import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, styled, Container } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import IParametro from "../../interfaces/IParametro";
import http from "../../http";
import { useSetRecoilState } from "recoil";
import { carregandoState, parametroDescontoState } from "../../state/atom";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Parametros() {
    const [parametros, setParametros] = useState<IParametro[]>([]);
    const setDescontoMensal = useSetRecoilState<number>(parametroDescontoState);
    const setCarregando = useSetRecoilState<boolean>(carregandoState);

    useEffect(() => {
        async function buscaParametros() {
            setCarregando(true);
            try {
                const resultado = await http.get<IParametro[]>('/parametros');
                setParametros(resultado.data);
                setDescontoMensal(resultado.data.filter(p => p.nome === 'Custo Mensal')[0].valor);
            } catch (err) {
                setParametros([]);
            }
            setCarregando(false);
        }
        buscaParametros();
    }, [setDescontoMensal, setCarregando]);

    return (
        <Container maxWidth='lg'>
            <TableContainer component={Paper} sx={{ mt: '1.5rem' }}>
                <Table size='small'>
                    <TableHead sx={{ backgroundColor: '#b6acd1' }}>
                        <TableRow>
                            <TableCell align='left' sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Valor</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>Editar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {parametros.map(parametro =>
                            <StyledTableRow
                                key={parametro._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='left'>{parametro.nome}</TableCell>
                                <TableCell align='center'>{parametro.valor}</TableCell>
                                <TableCell align='center'>
                                    <Button
                                        component={Link}
                                        to={`/admin/parametros/${parametro._id}`}
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