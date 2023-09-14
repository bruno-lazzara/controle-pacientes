import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../http";
import IPaciente from "../../interfaces/IPaciente";
import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

const NumericFormatCustom = React.forwardRef<NumericFormatProps>(
    function NumericFormatCustom(props, ref) {
        const { ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                thousandSeparator='.'
                decimalSeparator=','
                valueIsNumericString
                prefix='R$ '
            />
        );
    },
);

const config = {
    headers: {
        'x-access-token': localStorage.getItem('access-token')
    }
};

export default function FormPaciente() {
    const parametros = useParams();
    const [nome, setNome] = useState('');
    const [valorSessao, setValorSessao] = useState('');
    const [descontaImposto, setDescontaImposto] = useState(false);

    useEffect(() => {
        async function buscarPaciente(id: string) {
            try {
                const resposta = await http.get<IPaciente>(`/pacientes/${id}`, config);

                setNome(resposta.data.nome);
                setValorSessao(resposta.data.valor_secao.toString());
                setDescontaImposto(resposta.data.desconta_imposto);
            } catch (err) {
                setNome('');
                setValorSessao('');
                setDescontaImposto(false);
            }
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
                const resposta = await http.put(`/pacientes/${parametros.id}`, paciente, config);
                alert(resposta.status === 200 ? 'Paciente atualizado!' : 'Erro ao atualizar paciente');
            } else {
                const resposta = await http.post('/pacientes', paciente, config);
                alert(resposta.status === 201 ? 'Paciente cadastrado!' : 'Erro ao cadastrar paciente');
            }
        } catch (err) {
            alert('Erro na operação');
        }
    }

    return (
        <>
            <Box>
                <Typography component={'h1'} variant='h4'>Paciente</Typography>
                <Box
                    component={'form'}
                    onSubmit={upsertPaciente}
                >
                    <TextField
                        value={nome}
                        onChange={evento => setNome(evento.target.value)}
                        label='Nome do Paciente'
                        variant='standard'
                        sx={{ m: 3, ml: 0, minWidth: 300 }}
                        required
                    />

                    <TextField
                        label="Valor da Sessão"
                        value={valorSessao}
                        onChange={evento => setValorSessao(evento.target.value)}
                        InputProps={{
                            inputComponent: NumericFormatCustom as any,
                        }}
                        variant="standard"
                        sx={{ m: 3 }}
                        required
                    />

                    <FormControl variant="standard" sx={{ m: 3, minWidth: 120 }}>
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

                    <Button type='submit' variant='contained' sx={{ padding: '1rem', mt: '1rem', ml: 3, height: '100%' }}>Salvar</Button>
                </Box>
            </Box>
        </>
    )
}