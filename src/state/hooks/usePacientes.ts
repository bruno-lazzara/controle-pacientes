import { useSetRecoilState } from "recoil";
import http from "../../http";
import IPaciente from "../../interfaces/IPaciente";
import { pacientesState } from "../atom";

const usePacientes = () => {
    const setPacientes = useSetRecoilState<IPaciente[]>(pacientesState);

    return async () => {
        try {
            const config = {
                headers: {
                    'x-access-token': localStorage.getItem('access-token')
                }
            };

            const resposta = await http.get<IPaciente[]>('/pacientes', config);

            return setPacientes(resposta.data);
        } catch (err) {
            return setPacientes([]);
        }
    }
}

export default usePacientes;