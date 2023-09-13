import { useRecoilValue } from "recoil"
import { mesState } from "../atom"

const useMes = () => {
    return useRecoilValue(mesState);
}

export default useMes;