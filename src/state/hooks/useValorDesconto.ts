import { useRecoilValue } from "recoil"
import { parametroDescontoState } from "../atom"

const useValorDesconto = () => {
    return useRecoilValue(parametroDescontoState);
}

export default useValorDesconto;