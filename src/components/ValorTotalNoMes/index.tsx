import usePacientes from "../../state/hooks/usePacientes";
import useValorDesconto from "../../state/hooks/useValorDesconto";

export default function ValorTotalNoMes() {
    const desconto = useValorDesconto();
    const pacientes = usePacientes();
    const valorTotalNoMes = calcularTotal();

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