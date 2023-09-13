import { atom } from "recoil";
import IPaciente from "../interfaces/IPaciente";
import { pacientesAsync } from "./seletores";

export const listaDePacientesState = atom<IPaciente[]>({
    key: 'listaDePacientesState',
    default: pacientesAsync
});

export const mesState = atom<string>({
    key: 'mesState',
    default: (new Date().getMonth() + 1).toString()
});

export const anoState = atom<string>({
    key: 'anoState',
    default: new Date().getFullYear().toString()
});