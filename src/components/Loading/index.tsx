import { Backdrop, CircularProgress } from "@mui/material";
import { useRecoilValue } from "recoil";
import { carregandoState } from "../../state/atom";

export default function Loading() {
    const carregando = useRecoilValue(carregandoState);

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={carregando}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}