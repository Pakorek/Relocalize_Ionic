import React, { useContext, useEffect, useState } from 'react';
import {
  IonAvatar,
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonDatetime, IonGrid,
  IonInput,
  IonItem, IonItemDivider,
  IonLabel,
  IonList,
  IonModal, IonRow,
  IonSelect,
  IonSelectOption, IonText,
  IonTextarea, useIonPicker,
} from '@ionic/react';
import { AxiosResponse } from 'axios';
import './AddPro.css';
import { MarkerState } from '../Search/Mapbox';
import {
  createContributionShopMutationGQL,
  ShopInput,
  useCreateContributionShopMutation,
} from '../../mutations/createContributionShopMutation';
import ModalContext from '../../context/ModalContext';
import { useMap } from 'react-leaflet';
import ShopContext from '../../context/ShopContext';
import UploadAvatar from '../UploadFile';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { UserType } from '../../pages/Myspace';
import ProfilContext from '../../context/ProfilContext';

const axios = require('axios').default;


const EditProfil = () => {

  const UpdateUserGQL = gql`
      mutation updateUser($id: Float!, $firstname: String!, $lastname: String!, $avatar: String, $shortDescription: String){
          updateUser(values: {id: $id, firstName: $firstname, lastName: $lastname, avatar: $avatar, shortDescription: $shortDescription}) {
              firstName
              lastName
              shortDescription
              avatar
          }
      }
  `;

  const [mutation, mutationResults] = useMutation(UpdateUserGQL, {
    onCompleted: (data) => {
      console.log('mutation completed', data);
    },
    refetchQueries: ["getUser"]
  });


  const values = useContext(ModalContext);
  const { user, setUser } = useContext(ProfilContext);

  const [firstname, setFirstname] = useState<string>(user.firstname);
  const [lastname, setLastname] = useState<string>(user.lastname);
  const [description, setDescription] = useState<string>(user.description);
  const [error, setError] = useState();

  useEffect(() => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setDescription(user.description);
  }, );

  const toggleModal = () => {
    if (values)
      values.dispatch({ type: 'TOGGLE_PROFIL_MODAL' });
  };

  const onSubmit = async () => {
    // update user with gql useMutation
    // check no empty required input
    try {
      await mutation({
        variables: {
          id: user.id,
          firstname,
          lastname,
          description,
        },
      });
      toggleModal();
    } catch (e) {
      setError(e);
      console.error(e);
    }
  };

  if (error) return <pre>{JSON.stringify(error)}</pre>;

  return (
    <ModalContext.Consumer>
      {(value) => (
        value &&
        <IonModal isOpen={value.state} cssClass='modal'>
          <IonContent scrollEvents={true}
                      onIonScrollStart={() => {
                      }}
                      onIonScroll={() => {
                      }}
                      onIonScrollEnd={() => {
                      }}
                      className="bone"
          >
            <IonCard>
              <IonCardHeader>
                Informations personnelles
              </IonCardHeader>
              <IonList>
                <IonItem>
                  <IonLabel position="floating">Prénom</IonLabel>
                  <IonInput value={firstname} onIonChange={e => setFirstname(e.detail.value!)} clearInput />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Nom</IonLabel>
                  <IonInput value={lastname} onIonChange={e => setLastname(e.detail.value!)} clearInput />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Courte description</IonLabel>
                  <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)} />
                </IonItem>
                <UploadAvatar />
              </IonList>
            </IonCard>

            <IonButton expand="block" color="secondary" size="large" onClick={onSubmit}>Enregistrer</IonButton>
            <IonButton expand="block" fill="outline" color="secondary" className="back-white"
                       onClick={() => value.dispatch({ type: 'TOGGLE_PROFIL_MODAL' })}>Retour</IonButton>
          </IonContent>

        </IonModal>
      )}
    </ModalContext.Consumer>

  );
};

export default EditProfil;
