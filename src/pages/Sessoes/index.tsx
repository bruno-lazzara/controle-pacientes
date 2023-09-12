import { useEffect, useState } from "react";
import http from "../../http";
import IPaciente from "../../interfaces/IPaciente";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";



export default function Sessoes() {
    const [pacientes, setPacientes] = useState<IPaciente[]>([]);
    const [mes, setMes] = useState(new Date().getMonth().toString());
    const [ano, setAno] = useState(new Date().getFullYear().toString());

    useEffect(() => {
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

    const buscarPorMesAno = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        buscarPacientes();
    }

    return (
        // Essa página deverá ter:
        // - Uma lista <select> com os meses e outra com os anos, e um botão de enviar (seleciona o mês/ano das sessões que serão mostradas)
        // - listagem dos pacientes e os status das sessões de cada semana para o mês/ano selecionado
        <>
            <Box component={'form'} onSubmit={buscarPorMesAno}>
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

                <Button type='submit' variant="contained" sx={{ padding: '1rem', mt: '0.5rem', ml: '8px', height: '100%' }}>Buscar</Button>
            </Box>
        </>
    );
}
