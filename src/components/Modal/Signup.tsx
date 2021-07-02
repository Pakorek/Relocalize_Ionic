import React, { useState, FormEvent, useReducer } from 'react';
import { useCreateUserMutation } from '../../mutations/createUserMutation';
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonModal } from '@ionic/react';
import { Action, modalReducer } from '../../reducers/modalReducer';
import ModalContext from '../../context/ModalContext';

export type UserInput = {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  // role: string
}

const Signup = ({ state, dispatch }: {state: boolean, dispatch: React.Dispatch<Action>}) => {

  const [createUser] = useCreateUserMutation();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [firstname, setFirstname] = useState<string>();
  const [lastname, setLastname] = useState<string>();
  const [error, setError] = useState([]);

  console.log('state component', state);

  const signup = async () => {
    try {
      const values = { firstname, lastname, email, password };
      // @ts-ignore
      await createUser(values);
      // login him so display mySpace
    } catch (e) {
      setError(e);
      // setError(e.graphQLErrors[0].extensions.exception.validationErrors ?? e.graphQLErrors[0].message);
    }
  };

  const toggleModal = () => {
    dispatch({ type: 'TOGGLE_SIGNUP_MODAL' })
  }

  return (
    <IonModal isOpen={state} cssClass='modal'>
      <IonList>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={email}
            type="email"
            onIonChange={e => setEmail(e.detail.value!)} clearInput />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Prénom</IonLabel>
          <IonInput
            value={firstname}
            onIonChange={e => setFirstname(e.detail.value!)} clearInput />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nom</IonLabel>
          <IonInput
            value={lastname}
            onIonChange={e => setLastname(e.detail.value!)} clearInput />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Mot de passe</IonLabel>
          <IonInput value={password} type="password" onIonChange={e => setPassword(e.detail.value!)} clearInput />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Confirmer mot de passe</IonLabel>
          <IonInput value={confirmPassword} type="password" onIonChange={e => setConfirmPassword(e.detail.value!)}
                    clearInput />
        </IonItem>
        <IonButton expand="block" fill="outline" onClick={() => signup()}>Valider</IonButton>
      </IonList>
      <IonButton onClick={toggleModal}>Retour</IonButton>
    </IonModal>
  );

};
export default Signup;
