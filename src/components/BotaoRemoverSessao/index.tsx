import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import http from "../../http";
import useAtualizarPacientesMesAno from "../../state/hooks/useAtualizarPacientesMesAno";
import { useSetRecoilState } from "recoil";
import { carregandoState } from "../../state/atom";
import useAno from "../../state/hooks/useAno";
import useMes from "../../state/hooks/useMes";

interface Props {
    idPaciente: string
    idSessao: string
}

export default function BotaoRemoverSessao({ idPaciente, idSessao }: Props) {
    const mes = useMes();
    const ano = useAno();
    const atualizarListaPacientes = useAtualizarPacientesMesAno();
    const setCarregando = useSetRecoilState<boolean>(carregandoState);

    const removeSessao = async () => {
        try {
            if (window.confirm('Esta operação irá remover as sessões do paciente no mês.')) {
                setCarregando(true);

                const resultado = await http.delete(`/pacientes/${idPaciente}/${idSessao}`);
                if (resultado.status !== 200) {
                    setCarregando(false);
                    alert('Erro ao realizar operação');
                    return;
                }
                await atualizarListaPacientes(mes, ano);
                setCarregando(false);
            }
        } catch (err) {
            alert('Erro ao realizar operação');
        }
    }

    return (
        <Button variant="contained" color='error' sx={{ minWidth: 0, px: '8px' }} onClick={removeSessao}>
            <DeleteIcon />
        </Button>
    )
}