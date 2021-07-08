import React, { createContext, Dispatch } from "react";
import { ModalAction } from '../reducers/modalReducer';
import { ModalDispatch, ModalState } from '../components/Search/Mapbox';

const ModalContext = createContext<Dispatch<ModalAction> | null>(null);
// const ModalContext = createContext<{state: ModalState; dispatch: ModalDispatch} | undefined>(undefined)

export default ModalContext;
