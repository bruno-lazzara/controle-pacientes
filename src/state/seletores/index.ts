import { selector } from "recoil";
import http from "../../http";
import IPaciente from "../../interfaces/IPaciente";
import { anoState, mesState } from "../atom";

export const pacientesAsync = selector({
    key: 'pacientesAsync',
    get: async ({ get }) => {
        try {
            const mes = get(mesState);
            const ano = get(anoState);

            const config = {
                headers: {
                    'x-access-token': localStorage.getItem('access-token')
                }
            };

            const resposta = await http.get<IPaciente[]>(`/pacientes/${mes}/${ano}`, config);
            return resposta.data;
        } catch (err) {
            return [];
        }
    }
});