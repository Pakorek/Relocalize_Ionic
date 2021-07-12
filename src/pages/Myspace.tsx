import React, { useEffect, useState } from 'react';
import { useQuery, ApolloError } from '@apollo/react-hooks';

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
import { useCookies } from 'react-cookie';
import { mail, share, star, wine } from 'ionicons/icons';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/base';
// Import any actions required for transformations.
import { fill } from '@cloudinary/base/actions/resize';
import UploadAvatar from '../components/UploadFile';
import gql from 'graphql-tag';

const Myspace: React.FC = () => {

  const [user, setUser] = useState({ firstname: '', lastname: '', avatar: '' });

  const getUSER = gql`
      query getUser{
          getUser {
              firstName
              lastName
              email
              avatar
          }
      }
  `;

  const { loading, error, data } = useQuery(getUSER, {
    onCompleted: () => {
      setUser({ firstname: data.getUser.firstName, lastname: data.getUser.lastName, avatar: data.getUser.avatar });
    }
  });

  // need context to reload component when UploadAvatar handled

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  return (
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
                  Décrivez-vous en quelques mots...
                </IonNote>
              </IonList>

              <UploadAvatar />

              <IonButton fill="outline" slot="end">Editer</IonButton>
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
  );
};

export default Myspace;
