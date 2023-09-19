import { selector } from "recoil";
import http from "../../http";
import IParametro from "../../interfaces/IParametro";

export const parametroDescontoAsync = selector({
    key: 'parametroDescontoAsync',
    get: async () => {
        try {
            const resultado = await http.get<IParametro>('/parametros/Custo Mensal');
            return resultado.data.valor;
        } catch (err) {
            return 0;
        }
    }
});