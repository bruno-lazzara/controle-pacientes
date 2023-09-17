import { TextField } from "@mui/material";
import React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface Props {
    valor: string,
    setValorSessao: React.Dispatch<React.SetStateAction<string>>
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps>(
    function NumericFormatCustom(props, ref) {
        const { ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                thousandSeparator='.'
                decimalSeparator=','
                valueIsNumericString
                prefix='R$ '
            />
        );
    },
);

export default function InputValorSessao({ valor, setValorSessao }: Props) {
    return (
        <TextField
            label="Valor da Sessão"
            value={valor}
            onChange={evento => setValorSessao(evento.target.value)}
            InputProps={{
                inputComponent: NumericFormatCustom as any,
            }}
            variant="standard"
            sx={{ m: 3 }}
            required
        />
    )
}