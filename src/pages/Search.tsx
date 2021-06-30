import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Search.css';
import Mapbox from '../components/Search/Mapbox';

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Trouvez un professionnel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Mapbox />
      </IonContent>
    </IonPage>
  );
};

export default Search;
