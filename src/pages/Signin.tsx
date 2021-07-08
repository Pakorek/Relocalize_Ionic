import React, { useReducer, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList, IonModal, IonNote,
  IonPage, IonProgressBar, IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Myspace.css';
import { useLoginMutation } from '../mutations/loginMutation';
import { useAuthToken } from '../hooks/auth';
import { useCookies } from 'react-cookie';
import Signup from '../components/Modal/Signup';
import { modalReducer } from '../reducers/modalReducer';
import ModalContext from '../context/ModalContext';


const Signin: React.FC = () => {

  const [loginMutation] = useLoginMutation();
  const [authToken] = useAuthToken();
  const [cookies] = useCookies(['user']);
  const [state, dispatch] = useReducer(modalReducer, false);


  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [firstname, setFirstname] = useState<string>();
  const [lastname, setLastname] = useState<string>();
  const [error, setError] = useState();

  const login = async () => {
    console.log('email', email)
    console.log('pass', password)
    try {
      // @ts-ignore
      // don't know how to types this (yet)
      await loginMutation(email, password);
    } catch (err) {
      setError(err);
    }
  }

  const toggleModal = () => {
    dispatch({ type: 'TOGGLE_SIGNUP_MODAL' })
  }

  return (
    <ModalContext.Provider value={dispatch}>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Mon espace</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {/*if logged, component mySpace*/}
          {/*if not logged, component login form + create account link*/}
          <IonList>
            {error && <pre className="error">Identifiants incorrects</pre>}
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput value={email} type="email" onIonChange={e => setEmail(e.detail.value!)} clearInput />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Mot de passe</IonLabel>
              <IonInput value={password} type="password" onIonChange={e => setPassword(e.detail.value!)} clearInput />
            </IonItem>
            <IonButton expand="block" onClick={() => login()}>Connexion</IonButton>
            <IonText>
              <p>Mot de passe oublié ? <a href="">Cliquez-ici</a></p>
            </IonText>
          </IonList>
          <IonList>
            <IonText>
              <p>Pas encore de compte ? Inscrivez-vous gratuitement pour profiter de l'ensemble des fonctionnalités</p>
              <IonButton expand="block" onClick={toggleModal}>Je m'inscris !</IonButton>
            </IonText>
          </IonList>
          {/* component signup modal*/}
          <Signup state={state} dispatch={dispatch}/>
        </IonContent>
      </IonPage>
    </ModalContext.Provider>

  );
};

export default Signin;
