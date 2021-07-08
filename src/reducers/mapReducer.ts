import { MarkerState } from '../components/Search/Mapbox';

export type Action =
  | {
  type: 'ADD_MARKER';
  lat: number;
  lng: number;
}

export const mapReducer = (state: MarkerState, action: Action): MarkerState => {
  let nextState;

  switch (action.type) {
    case 'ADD_MARKER':
      nextState = {lat: action.lat, lng: action.lng};
      return nextState;

    default:
      return state;
  }
};
