import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonAvatar, IonNote, IonList, IonChip, IonBadge,
} from '@ionic/react';
import { pin, wifi, wine, warning, walk, star, mail, share } from 'ionicons/icons';
import './Sandbox.css';

const CardExamples: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CardExamples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonCard color="light" >
          <IonItem color="light">
            <IonAvatar slot="start">
              <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
            </IonAvatar>
            <IonList>
              <IonLabel className="card-title">Brice d'Arménia</IonLabel>
              <IonNote>
                Décrivez-vous en quelques mots...
              </IonNote>
            </IonList>
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
    </IonPage>
  );
};

export default CardExamples;
