export type Action =
  | {
  type: 'TOGGLE_SIGNUP_MODAL';
}

export const modalReducer = (state: boolean, action: Action): boolean => {
  let nextState: boolean;

  switch (action.type) {
    case 'TOGGLE_SIGNUP_MODAL':
      nextState = !state;
      console.log('next', nextState);
      console.log('state', state);
      return nextState;

    default:
      return state;
  }
};
