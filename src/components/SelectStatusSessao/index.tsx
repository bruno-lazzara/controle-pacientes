import { FormControl, Select, MenuItem } from "@mui/material";

interface ValorProp {
    valor: string
}

export default function SelectStatusSessao({ valor }: ValorProp) {
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select value={valor} sx={{ fontSize: '0.875rem' }}>
                <MenuItem value={'NÃO TEVE'}>NÃO TEVE</MenuItem>
                <MenuItem value={'TEVE'}>TEVE</MenuItem>
                <MenuItem value={'NO SHOW'}>NO SHOW</MenuItem>
                <MenuItem value={'PAGO'}>PAGO</MenuItem>
            </Select>
        </FormControl>
    )
}