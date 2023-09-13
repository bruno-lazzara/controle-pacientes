import { selector } from "recoil";
import http from "../../http";
import IParametro from "../../interfaces/IParametro";

export const parametroDescontoAsync = selector({
    key: 'parametroDescontoAsync',
    get: async () => {
        try {
            const config = {
                headers: {
                    'x-access-token': localStorage.getItem('access-token')
                }
            };

            const resultado = await http.get<IParametro>('/parametros/Custo Mensal', config);
            return resultado.data.valor;
        } catch (err) {
            return 0;
        }
    }
});