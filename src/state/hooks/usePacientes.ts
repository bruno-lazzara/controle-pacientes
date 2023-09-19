import { useSetRecoilState } from "recoil";
import http from "../../http";
import IPaciente from "../../interfaces/IPaciente";
import { carregandoState, pacientesState } from "../atom";

const usePacientes = () => {
    const setPacientes = useSetRecoilState<IPaciente[]>(pacientesState);
    const setCarregando = useSetRecoilState<boolean>(carregandoState);

    return async () => {
        setCarregando(true);
        try {
            const resposta = await http.get<IPaciente[]>('/pacientes');

            setCarregando(false);
            return setPacientes(resposta.data);
        } catch (err) {
            setCarregando(false);
            return setPacientes([]);
        }
    }
}

export default usePacientes;