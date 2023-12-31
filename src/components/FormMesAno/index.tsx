import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSetRecoilState } from "recoil";
import { mesState, anoState } from "../../state/atom";
import useAno from "../../state/hooks/useAno";
import useMes from "../../state/hooks/useMes";
import { memo } from "react";

function FormMesAno() {
    const mes = useMes();
    const ano = useAno();
    const setMes = useSetRecoilState<string>(mesState);
    const setAno = useSetRecoilState<string>(anoState);
    
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
        </>
    )
}

export default memo(FormMesAno);