import { useSetRecoilState } from "recoil";
import http from "../../http";
import IPaciente from "../../interfaces/IPaciente";
import { carregandoState, pacientesState } from "../atom";
import { useCallback } from "react";

const usePacientes = () => {
    const setPacientes = useSetRecoilState<IPaciente[]>(pacientesState);
    const setCarregando = useSetRecoilState<boolean>(carregandoState);

    return useCallback(async () => {
        setCarregando(true);
        try {
            const resposta = await http.get<IPaciente[]>('/pacientes');

            setCarregando(false);
            return setPacientes(resposta.data);
        } catch (err) {
            setCarregando(false);
            return setPacientes([]);
        }
    }, [setCarregando, setPacientes]);
}

export default usePacientes;