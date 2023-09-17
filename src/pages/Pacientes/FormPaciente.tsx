import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../http";
import IPaciente from "../../interfaces/IPaciente";
import InputValorSessao from "../../components/InputValorSessao";
import { useSetRecoilState } from "recoil";
import { carregandoState } from "../../state/atom";

export default function FormPaciente() {
    const navigate = useNavigate();
    const parametros = useParams();
    const [nome, setNome] = useState('');
    const [valorSessao, setValorSessao] = useState('');
    const [descontaImposto, setDescontaImposto] = useState(false);
    const setCarregando = useSetRecoilState<boolean>(carregandoState);

    useEffect(() => {
        async function buscarPaciente(id: string) {
            setCarregando(true);
            try {
                const config = {
                    headers: {
                        'x-access-token': localStorage.getItem('access-token')
                    }
                };

                const resposta = await http.get<IPaciente>(`/pacientes/${id}`, config);

                setNome(resposta.data.nome);
                setValorSessao(resposta.data.valor_secao.toString());
                setDescontaImposto(resposta.data.desconta_imposto);
            } catch (err) {
                setNome('');
                setValorSessao('');
                setDescontaImposto(false);
            }
            setCarregando(false);
        }

        if (parametros.id) {
            buscarPaciente(parametros.id);
        }
    }, [parametros]);

    const alterarDescontaImposto = (evento: SelectChangeEvent<boolean>) => {
        if (evento.target.value === 'true') {
            setDescontaImposto(true);
        } else {
            setDescontaImposto(false);
        }
    }

    const upsertPaciente = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        setCarregando(true);

        const valorSessaoFormatado = valorSessao.replace('R$ ', '').replace(',', '.');
        let paciente = {
            nome: nome,
            valor_secao: Number(valorSessaoFormatado).toFixed(2),
            desconta_imposto: descontaImposto,
            sessoes: []
        };

        setNome('');
        setValorSessao('');
        setDescontaImposto(false);

        try {
            console.log(paciente);
            if (parametros.id) {
                const config = {
                    headers: {
                        'x-access-token': localStorage.getItem('access-token')
                    }
                };

                const resposta = await http.put(`/pacientes/${parametros.id}`, paciente, config);
                alert(resposta.status === 200 ? 'Paciente atualizado!' : 'Erro ao atualizar paciente');
            } else {
                const config = {
                    headers: {
                        'x-access-token': localStorage.getItem('access-token')
                    }
                };

                const resposta = await http.post('/pacientes', paciente, config);
                alert(resposta.status === 201 ? 'Paciente cadastrado!' : 'Erro ao cadastrar paciente');
            }
        } catch (err) {
            alert('Erro na operação');
        }
        setCarregando(false);
    }

    return (
        <Box>
            <Typography component={'h1'} variant='h4'>Paciente</Typography>
            <Box
                component={'form'}
                onSubmit={upsertPaciente}
            >
                <Grid container spacing={2} mt={1}>
                    <Grid md={8}>
                        <TextField
                            value={nome}
                            onChange={evento => setNome(evento.target.value)}
                            label='Nome do Paciente'
                            variant='standard'
                            sx={{ mt: 3, ml: 2, minWidth: '95%' }}
                            required
                        />
                    </Grid>

                    <Grid md={2}>
                        <InputValorSessao valor={valorSessao} setValorSessao={setValorSessao} />
                    </Grid>

                    <Grid md={2}>
                        <FormControl variant="standard" sx={{ mt: 3, minWidth: 120 }}>
                            <InputLabel id="desconta-imposto-label">Desconta imposto?</InputLabel>
                            <Select
                                labelId="desconta-imposto-label"
                                id="desconta-imposto"
                                value={descontaImposto}
                                onChange={alterarDescontaImposto}
                                label="Desconta imposto?"
                                required
                            >
                                <MenuItem value={'false'}>Não</MenuItem>
                                <MenuItem value={'true'}>Sim</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid md={4}>
                        <Button
                            type='submit'
                            variant='contained'
                            sx={{ padding: '1rem', ml: 2 }}
                        >
                            Salvar
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            sx={{ padding: '1rem', ml: 2 }}
                            onClick={() => { navigate(-1); }}
                        >
                            Voltar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}