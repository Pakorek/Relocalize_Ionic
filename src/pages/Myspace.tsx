import React, { useState } from 'react';
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
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/base";
// Import any actions required for transformations.
import {fill} from "@cloudinary/base/actions/resize";
import UploadAvatar from '../components/UploadFile';

const Myspace: React.FC = () => {

  const [cookies, ,] = useCookies(["user"]);

/*
  const [file, setFile] = useState<Blob>()
  // On file upload (click the upload button)
  const onFileUpload = () => {

    // Create an object of formData
    const formData = new FormData();

    // On file select (from the pop up)
    const onFileChange = (e: any) => {
      // Update the state
      setFile(e.target.files[0]);
    };
    if (file) {
      // Update the formData object
      formData.append(
        "myFile",
        file,
        file.name
      );
    }


    // Details of the uploaded file
    console.log(file);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
  };
*/

  // gql to get user info with cookie.user

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mon espace</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
  )
}

export default Myspace;
