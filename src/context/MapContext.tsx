import { createContext, Dispatch } from "react";
import { Action } from '../reducers/mapReducer';

const MapContext = createContext<Dispatch<Action> | null>(null);

export default MapContext;
