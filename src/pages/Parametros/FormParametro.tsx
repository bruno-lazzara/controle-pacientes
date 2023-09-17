import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IParametro from "../../interfaces/IParametro";
import http from "../../http";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { carregandoState } from "../../state/atom";

export default function FormParametro() {
    const parametrosUrl = useParams();
    const [naoEncontrado, setNaoEncontrado] = useState<boolean>(false);
    const [nome, setNome] = useState<string>('');
    const [valor, setValor] = useState<string>('');
    const navigate = useNavigate();
    const setCarregando = useSetRecoilState<boolean>(carregandoState);

    useEffect(() => {
        async function buscarParametro(id: string) {
            setCarregando(true);
            try {
                const config = {
                    headers: {
                        'x-access-token': localStorage.getItem('access-token')
                    }
                };

                const resposta = await http.get<IParametro>(`/parametros/porId/${id}`, config);
                setNome(resposta.data.nome);
                setValor(resposta.data.valor.toString());
            } catch (err) {
                setNome('');
                setValor('');
                setNaoEncontrado(true);
            }
            setCarregando(false);
        }

        if (parametrosUrl.id) {
            buscarParametro(parametrosUrl.id);
        }
    }, [parametrosUrl]);

    async function atualizarParametro(evento: React.FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        setCarregando(true);
        try {
            const config = {
                headers: {
                    'x-access-token': localStorage.getItem('access-token')
                }
            };

            const resposta = await http.put(`/parametros/${parametrosUrl.id}`, {
                valor: Number(valor)
            }, config);
            alert(resposta.status === 200 ? 'Parâmetro atualizado!' : 'Erro ao atualizar parâmetro');
        } catch (err) {
            alert('Erro ao atualizar parâmetro');
        }
        setCarregando(false);
    }

    if (!naoEncontrado) {
        return (
            <Box>
                <Typography component={'h1'} variant='h4'>Parâmetro</Typography>
                <Box
                    component={'form'}
                    onSubmit={atualizarParametro}
                >
                    <Grid container spacing={2} mt={1}>
                        <Grid md={4}>
                            <TextField
                                value={nome}
                                disabled
                                label='Nome do Parâmetro'
                                variant='standard'
                                sx={{ mt: 3, ml: 2, minWidth: '95%' }}
                            />
                        </Grid>

                        <Grid md={2}>
                            <TextField
                                label="Valor"
                                value={valor}
                                onChange={evento => setValor(evento.target.value)}
                                variant="standard"
                                sx={{ m: 3 }}
                                required
                            />
                        </Grid>

                        <Grid md={12}>
                            <Button
                                type='submit'
                                variant='contained'
                                sx={{ padding: '0.75rem', ml: 2 }}
                            >
                                Salvar
                            </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                sx={{ padding: '0.75rem', ml: 2 }}
                                onClick={() => { navigate(-1); }}
                            >
                                Voltar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        )
    } else {
        return (
            <Box>
                <Typography component={'h5'} variant='h5'>Parâmetro não encontrado</Typography>
                <Button
                    variant='contained'
                    color='secondary'
                    sx={{ padding: '0.75rem', mt: 2 }}
                    onClick={() => { navigate(-1); }}
                >
                    Voltar
                </Button>
            </Box>
        )
    }
}