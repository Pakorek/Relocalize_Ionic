import { createContext, Dispatch, SetStateAction } from 'react';
import { InitialUser, UserType } from '../pages/Myspace';

const ProfilContext = createContext<{ user: UserType, setUser: Dispatch<SetStateAction<UserType>> | undefined }>({
  user: { id: 0, firstname: '', lastname: '', avatar: '', description: '' },
  setUser: undefined,
});

export default ProfilContext;
