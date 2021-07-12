import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import './Search.css';
import Mapbox from '../components/Search/Mapbox';

const Search: React.FC = () => {

  const [onEdit, setOnEdit] = useState(false);

  const toggleEditMod = () => {
    setOnEdit(!onEdit);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Explorez les alentours</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        {/*Map*/}
        <Mapbox onEdit={onEdit} />

        {/*Edit Mod*/}
        <IonCard className="card">
          <IonText class="ion-text-center">
            <h4>Faites grandir la communauté !</h4>
          </IonText>

          { onEdit
            ? <IonButton className="edit-button" expand="full" fill="outline" color="primary" onClick={toggleEditMod}>Quitter le mode édition</IonButton>
            : <IonButton className="edit-button" expand="full" fill="solid" color="primary" onClick={toggleEditMod}>Mode édition</IonButton>
          }

          {/*Tutorial slides link*/}
          <IonText class="ion-text-center">
            <h6>Comment ça marche ?</h6>
          </IonText>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Search;
