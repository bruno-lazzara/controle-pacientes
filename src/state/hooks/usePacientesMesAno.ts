import { useRecoilValue } from "recoil"
import { pacientesMesAnoState } from "../atom"

const usePacientesMesAno = () => {
    return useRecoilValue(pacientesMesAnoState);
}

export default usePacientesMesAno;