import { useRecoilValue } from "recoil"
import { listaDePacientesState } from "../atom"

const usePacientes = () => {
    return useRecoilValue(listaDePacientesState);
}

export default usePacientes;