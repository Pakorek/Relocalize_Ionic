export type ModalAction =
  | {
  type: 'TOGGLE_SIGNUP_MODAL';
}
  | {
  type: 'TOGGLE_ADDPRO_MODAL';
}

export const modalReducer = (state: boolean, action: ModalAction): boolean => {
  let nextState: boolean;

  switch (action.type) {
    case 'TOGGLE_SIGNUP_MODAL':
      nextState = !state;
      return nextState;

    case 'TOGGLE_ADDPRO_MODAL':
      nextState = !state;
      return nextState;

    default:
      return state;
  }
};
