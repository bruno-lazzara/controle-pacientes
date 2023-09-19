import { useSetRecoilState } from "recoil"
import IPaciente from "../../interfaces/IPaciente"
import { pacientesMesAnoState } from "../atom"
import useMes from "./useMes";
import useAno from "./useAno";
import http from "../../http";

const useAtualizarPacientesMesAno = () => {
    const setPacientes = useSetRecoilState<IPaciente[]>(pacientesMesAnoState);
    const mes = useMes();
    const ano = useAno();

    return async () => {
        try {
            const resposta = await http.get<IPaciente[]>(`/pacientes/${mes}/${ano}`);

            setPacientes(resposta.data);
        } catch (err) {
            setPacientes([]);
        }
    }
}

export default useAtualizarPacientesMesAno;