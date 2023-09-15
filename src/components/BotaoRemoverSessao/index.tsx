import { Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import http from "../../http";
import useAtualizarPacientesMesAno from "../../state/hooks/useAtualizarPacientesMesAno";

interface Props {
    idPaciente: string
    idSessao: string
}

const config = {
    headers: {
        'x-access-token': localStorage.getItem('access-token')
    }
};

export default function BotaoRemoverSessao({ idPaciente, idSessao }: Props) {
    const atualizarListaPacientes = useAtualizarPacientesMesAno();

    const removeSessao = async () => {
        try {
            if (window.confirm('Esta operação irá remover as sessões do paciente no mês.')) {
                const resultado = await http.delete(`/pacientes/${idPaciente}/${idSessao}`, config);
                if (resultado.status !== 200) {
                    alert('Erro ao realizar operação');
                    return;
                }
                atualizarListaPacientes();
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