import { useSetRecoilState } from "recoil";
import IPaciente from "../../interfaces/IPaciente";
import { pacientesMesAnoState } from "../atom";
import http from "../../http";
import { useCallback } from "react";

const useAtualizarPacientesMesAno = () => {
    const setPacientes = useSetRecoilState<IPaciente[]>(pacientesMesAnoState);

    return useCallback(async (mes: string, ano: string) => {
        try {
            const resposta = await http.get<IPaciente[]>(`/pacientes/${mes}/${ano}`);

            setPacientes(resposta.data);
        } catch (err) {
            setPacientes([]);
        }
    }, [setPacientes]);
}

export default useAtualizarPacientesMesAno;