import { createContext, Dispatch } from "react";
import { Action } from '../reducers/modalReducer';

const ModalContext = createContext<Dispatch<Action> | null>(null);

export default ModalContext;
