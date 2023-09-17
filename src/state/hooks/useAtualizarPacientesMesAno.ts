import { useSetRecoilState } from "recoil"
import IPaciente from "../../interfaces/IPaciente"
import { carregandoState, pacientesMesAnoState } from "../atom"
import useMes from "./useMes";
import useAno from "./useAno";
import http from "../../http";

const useAtualizarPacientesMesAno = () => {
    const setPacientes = useSetRecoilState<IPaciente[]>(pacientesMesAnoState);
    const setCarregando = useSetRecoilState<boolean>(carregandoState);
    const mes = useMes();
    const ano = useAno();

    return async () => {
        setCarregando(true);
        try {
            const config = {
                headers: {
                    'x-access-token': localStorage.getItem('access-token')
                }
            };

            const resposta = await http.get<IPaciente[]>(`/pacientes/${mes}/${ano}`, config);

            setPacientes(resposta.data);
        } catch (err) {
            setPacientes([]);
        }
        setCarregando(false);
    }
}

export default useAtualizarPacientesMesAno;