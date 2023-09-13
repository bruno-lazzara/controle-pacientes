import { atom } from "recoil";
import IPaciente from "../interfaces/IPaciente";
import { parametroDescontoAsync } from "./seletores";

export const pacientesState = atom<IPaciente[]>({
    key: 'pacientesState',
    default: []
});

export const pacientesMesAnoState = atom<IPaciente[]>({
    key: 'pacientesMesAnoState',
    default: []
});

export const mesState = atom<string>({
    key: 'mesState',
    default: (new Date().getMonth() + 1).toString()
});

export const anoState = atom<string>({
    key: 'anoState',
    default: new Date().getFullYear().toString()
});

export const parametroDescontoState = atom<number>({
    key: 'parametroDescontoState',
    default: parametroDescontoAsync
})