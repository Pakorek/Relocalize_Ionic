import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList, IonModal, IonNote,
  IonPage, IonProgressBar, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './AddPro.css';
import React, { useState } from 'react';

const axios = require('axios').default;

type APIresponse = {
  owner: string;
  activity: string;
  subActivity: string;
  address: string;
  zipcode: string;
  city: string;
  department: string;
}

type newPro = {
  society: string;

}

const AddPro: React.FC = () => {

  // submit potential pro
  const [society, setSociety] = useState<string>();
  const [activity, setActivity] = useState<string>();
  const [professionalArea, setProfessionalArea] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [address2, setAddress2] = useState<string>();
  const [city, setCity] = useState<string>();
  const [zipCode, setZipCode] = useState<string>();
  const [country, setCountry] = useState<string>();

  const proposePro = () => {
    // loading true
    // object pro -> setObject
    // add db
    // alert success
    // raz form
  }

  // Create component Modal Pro
  const [showModal, setShowModal] = useState(false);
  const [siret, setSiret] = useState<string>();
  const [APIres, setAPIres] = useState<APIresponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const apiSearch = async () => {
    const API_ADDRESS = 'https://data.opendatasoft.com/api/records/1.0/search/?dataset=sirene_v3%40public&q=';
    setLoading(true);
    //
    try {
      const response = await axios.get(API_ADDRESS + siret);
      const fields = response.data.records[0].fields;
      const owner = fields.l1_adressage_unitelegale;
      const activity = fields.soussectionetablissement;
      const subActivity = fields.classeetablissement;
      const address = fields.adresseetablissement;
      const zipcode = fields.codepostaletablissement;
      const city = fields.libellecommuneetablissement;
      const department = fields.departementetablissement;
      setAPIres({ owner, activity, subActivity, address, zipcode, city, department });
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const options = {
    cssClass: 'select-container',
  };

  // Submit my society


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajouter un professionnel</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <section>
          <p className="center">Contribuez au projet en proposant un professionnel</p>
          <p className="center">Saisissez les informations suivantes et nous nous chargerons d'ajouter son profil au plus vite</p>
        </section>

        <IonList>
          <IonItem>
            <IonLabel position="floating">Nom de l'entreprise</IonLabel>
            <IonInput value={society} onIonChange={e => setSociety(e.detail.value!)} clearInput />
          </IonItem>
          <IonItem>
            <IonLabel>Domaine professionnel</IonLabel>
            <IonSelect
              value={professionalArea}
              okText="Ok"
              cancelText="Retour"
              onIonChange={e => setProfessionalArea(e.detail.value)}>
              <IonSelectOption value="artisan">Artisan</IonSelectOption>
              <IonSelectOption value="producer">Producteur</IonSelectOption>
              <IonSelectOption value="merchant">Commerçant</IonSelectOption>
              <IonSelectOption value="service provider">Prestataire de service</IonSelectOption>
              {/*Profession libérale, ..., + input 'autre' : ...*/}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Activité</IonLabel>
            <IonSelect
              value={activity}
              interfaceOptions={options}
              okText="Ok"
              cancelText="Retour"
              onIonChange={e => setActivity(e.detail.value)}>
              {/*Selon domaine professionnel, ..., + input 'autre' : ...*/}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Localisation</IonLabel>
            <IonInput placeholder="Adresse" value={address} onIonChange={e => setAddress(e.detail.value!)} />
            <IonInput placeholder="Complément adresse" value={address2}
                      onIonChange={e => setAddress2(e.detail.value!)} />
            <IonInput placeholder="Ville" value={city} onIonChange={e => setCity(e.detail.value!)} />
            <IonInput placeholder="Code postal" value={zipCode} onIonChange={e => setZipCode(e.detail.value!)} />
            <IonInput placeholder="Pays" value={country} onIonChange={e => setCountry(e.detail.value!)} />
          </IonItem>
          <IonButton expand="block" fill="outline" onClick={() => proposePro()}>Je contribue !</IonButton>

          {/*modal*/}
          <IonModal isOpen={showModal} cssClass='modal'>
            <IonList>
              <IonItem>
                <IonLabel position="floating">SIRET</IonLabel>
                <IonInput
                  value={siret}
                  type="number"
                  onIonChange={e => setSiret(e.detail.value!)} clearInput />
              </IonItem>
              <IonButton expand="block" fill="outline" onClick={() => apiSearch()}>Rechercher</IonButton>

              {loading && <IonProgressBar type="indeterminate" />}

              {APIres &&
              <IonList>
                <IonItem>
                  <IonLabel>Propriétaire</IonLabel>
                  <IonNote slot="end" className="ion-note">{APIres.owner}</IonNote>

                </IonItem>
                <IonItem>
                  <IonLabel>Activité</IonLabel>
                  <IonNote slot="end" className="ion-note">{APIres.activity}</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>Classe</IonLabel>
                  <IonNote slot="end" className="ion-note">{APIres.subActivity}</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>Adresse</IonLabel>
                  <IonNote slot="end" className="ion-note">{APIres.address}</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>Code postal</IonLabel>
                  <IonNote slot="end" className="ion-note">{APIres.zipcode}</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>Commune</IonLabel>
                  <IonNote slot="end" className="ion-note">{APIres.city}</IonNote>
                </IonItem>
                <IonItem>
                  <IonLabel>Département</IonLabel>
                  <IonNote slot="end" className="ion-note">{APIres.department}</IonNote>
                </IonItem>
                <IonButton expand="block" fill="outline" onClick={() => console.log}>Oui c'est bien moi</IonButton>
              </IonList>
              }
            </IonList>

            <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
          </IonModal>
          {/*modal end*/}
        </IonList>

        <IonList className="flex-end">
          <h1 className="center">Vous souhaitez ajouter votre entreprise ? </h1>
          <IonButton expand="block" onClick={() => setShowModal(true)}>Cliquez ici !</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddPro;
