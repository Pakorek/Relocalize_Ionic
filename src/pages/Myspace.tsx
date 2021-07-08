import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useCookies } from 'react-cookie';

const Myspace: React.FC = () => {

  const [cookies, ,] = useCookies(["user"]);

  // gql to get user info with cookie.user

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mon espace</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

      </IonContent>
    </IonPage>
  )
}

export default Myspace;
