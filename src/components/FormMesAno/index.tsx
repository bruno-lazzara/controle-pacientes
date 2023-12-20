import { FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { mesState, anoState, carregandoState } from "../../state/atom";
import useAno from "../../state/hooks/useAno";
import useMes from "../../state/hooks/useMes";
import { memo } from "react";
import http from "../../http";
import usePacientesMesAno from "../../state/hooks/usePacientesMesAno";

function FormMesAno() {
    const mes = useMes();
    const ano = useAno();
    const setMes = useSetRecoilState<string>(mesState);
    const setAno = useSetRecoilState<string>(anoState);
    const setCarregando = useSetRecoilState<boolean>(carregandoState);
    const pacientes = usePacientesMesAno();

    const dataMesAno = new Date(+ano, +mes - 1).getTime();
    const mesAnoAtual = new Date(new Date().getFullYear(), new Date().getMonth()).getTime();

    const fecharMes = async () => {
        setCarregando(true);
        
        try {
            if (window.confirm(`Esta operação irá salvar o mês ${mes}/${ano} para consulta de relatório e não poderá ser desfeita ou realizada novamente para o mesmo mês.`)) {

                const resultado = await http.post(`/relatorios/novo/${mes}/${ano}`, pacientes);
                if (resultado.status !== 201) {
                    alert('Erro ao realizar operação');
                } else {
                    alert(`O mês ${mes}/${ano} foi fechado com sucesso`);
                }
            }
        } catch (err) {
            alert('Erro ao realizar operação');
        }

        setCarregando(false);
    }

    return (
        <>
            <FormControl sx={{ m: 1, ml: 0, minWidth: 120 }}>
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

            {mesAnoAtual > dataMesAno ?
                <Button
                    variant='contained'
                    color='success'
                    sx={{ padding: '1rem', ml: 3, mt: 1 }}
                    onClick={fecharMes}
                >
                    Fechar mês
                </Button> : <></>
            }
        </>
    )
}

export default memo(FormMesAno);