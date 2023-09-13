import { useEffect, useState } from "react";
import usePacientes from "../../state/hooks/usePacientes";
import http from "../../http";
import IParametro from "../../interfaces/IParametro";

export default function ValorTotalNoMes() {
    const [desconto, setDesconto] = useState<number>(0.00);
    const pacientes = usePacientes();
    const valorTotalNoMes = calcularTotal();

    useEffect(() => {
        async function buscarValorDesconto() {
            try {
                const config = {
                    headers: {
                        'x-access-token': localStorage.getItem('access-token')
                    }
                };
    
                const resultado = await http.get<IParametro>('/parametros/Custo Mensal', config);
                setDesconto(resultado.data.valor);
            } catch (err) {
                alert('Erro para buscar valor do desconto mensal');
            }
        }

        buscarValorDesconto();
    }, []);

    function calcularTotal() {
        let total = 0.00;
        pacientes.map(paciente =>
            total += paciente.sessoes[0].valor_total_pago
        );
        total -= desconto;
        return total;
    }

    return (
        <>
            {valorTotalNoMes.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </>
    )
}