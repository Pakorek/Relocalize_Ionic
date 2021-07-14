import React, { useEffect, useReducer, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
  IonAvatar, IonButton,
  IonCard, IonChip,
  IonContent,
  IonHeader, IonIcon,
  IonItem, IonLabel,
  IonList, IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { mail, share, star, wine } from 'ionicons/icons';
import gql from 'graphql-tag';
import { modalReducer } from '../reducers/modalReducer';
import EditProfil from '../components/Modal/EditProfil';
import ProfilContext from '../context/ProfilContext';
import ModalContext from '../context/ModalContext';
import MapContext from '../context/MapContext';

export type UserType = {
  id: number,
  firstname: string,
  lastname: string,
  avatar: string,
  description: string
}

export const InitialUser = { id: 0, firstname: '', lastname: '', avatar: '', description: '' };

const Myspace: React.FC = () => {

  const [user, setUser] = useState<UserType>(InitialUser);
  const [modalState, modalDispatch] = useReducer(modalReducer, false);
  const userValues = { user: user, setUser: setUser };
  const modalValues = { state: modalState, dispatch: modalDispatch };

  const getUSER = gql`
      query getUser{
          getUser {
              id
              firstName
              lastName
              email
              avatar
              shortDescription
          }
      }
  `;

  const { loading, error, data, refetch } = useQuery(getUSER, {
    onCompleted: () => {
      setUser({
        id: data.getUser.id,
        firstname: data.getUser.firstName,
        lastname: data.getUser.lastName,
        avatar: data.getUser.avatar,
        description: data.getUser.description,
      });
      userValues.user = user;
    }
  });

  // useEffect(() => {
  //   console.log('rendered')
  //   refetch()
  // }, [modalState])

  // need context to reload component when UploadAvatar handled

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
    <ProfilContext.Provider value={userValues}>
      <ModalContext.Provider value={modalValues}>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Mon espace</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonContent>
              <IonCard color="light">
                <IonItem color="light">
                  <IonAvatar slot="start">
                    <img src={user.avatar} />
                  </IonAvatar>
                  <IonList>
                    <IonLabel className="card-title">{user.firstname + ' ' + user.lastname}</IonLabel>
                    <IonNote>
                      {user.description}
                    </IonNote>
                  </IonList>
                  <IonButton fill="outline" slot="end"
                             onClick={() => modalDispatch({ type: 'TOGGLE_PROFIL_MODAL' })}>Editer</IonButton>
                </IonItem>
                <IonChip color="success" className="ion-chip">
                  <IonLabel color="success">22 contributions</IonLabel>
                </IonChip>
                <IonChip color="success">
                  <IonLabel color="success">3 transactions</IonLabel>
                </IonChip>
                <IonChip color="success">
                  <IonLabel color="success">7 favoris</IonLabel>
                </IonChip>
              </IonCard>
              {/*Edit Profil Modal*/}
              <EditProfil />
              {/*Menu*/}
              <IonCard>
                <IonItem href="#" className="ion-activated">
                  <IonIcon icon={star} slot="start" />
                  <IonLabel>Favoris</IonLabel>
                </IonItem>

                <IonItem href="#">
                  <IonIcon icon={wine} slot="start" />
                  <IonLabel>Contributions</IonLabel>
                </IonItem>

                <IonItem className="ion-activated">
                  <IonIcon icon={mail} slot="start" />
                  <IonLabel>Messagerie</IonLabel>
                </IonItem>

                <IonItem>
                  <IonIcon icon={share} slot="start" />
                  <IonLabel>Transactions</IonLabel>
                </IonItem>
              </IonCard>
            </IonContent>
          </IonContent>
        </IonPage>
      </ModalContext.Provider>
    </ProfilContext.Provider>
  );
};

export default Myspace;
