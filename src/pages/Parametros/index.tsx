import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, styled } from "@mui/material";
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
    const atualizaDescontoMensal = useSetRecoilState<number>(parametroDescontoState);
    const atualizaCarregando = useSetRecoilState<boolean>(carregandoState);

    useEffect(() => {
        async function buscaParametros() {
            atualizaCarregando(true);
            try {
                const config = {
                    headers: {
                        'x-access-token': localStorage.getItem('access-token')
                    }
                };

                const resultado = await http.get<IParametro[]>('/parametros', config);
                setParametros(resultado.data);
                atualizaDescontoMensal(resultado.data.filter(p => p.nome === 'Custo Mensal')[0].valor);
                atualizaCarregando(false);
            } catch (err) {
                setParametros([]);
                atualizaCarregando(false);
            }
        }
        buscaParametros();
    }, [])

    return (
        <TableContainer component={Paper} sx={{ mt: '1.5rem' }}>
            <Table size='small'>
                <TableHead sx={{ backgroundColor: '#b6acd1' }}>
                    <TableRow>
                        <TableCell align='left'>Nome</TableCell>
                        <TableCell align='center'>Valor</TableCell>
                        <TableCell align='center'>Editar</TableCell>
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
    )
}