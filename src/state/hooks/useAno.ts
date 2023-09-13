import { useRecoilValue } from "recoil"
import { anoState } from "../atom"

const useAno = () => {
    return useRecoilValue(anoState);
}

export default useAno;