import { useSetRecoilState } from "recoil"
import IPaciente from "../../interfaces/IPaciente"
import { listaDePacientesState } from "../atom"
import useMes from "./useMes";
import useAno from "./useAno";
import http from "../../http";

const useAtualizarPacientes = () => {
    const setPacientes = useSetRecoilState<IPaciente[]>(listaDePacientesState);
    const mes = useMes();
    const ano = useAno();

    return async () => {
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
    }
}

export default useAtualizarPacientes;