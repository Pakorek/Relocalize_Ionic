import React, { useEffect, useState } from 'react';
import {
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
import { ModalAction } from '../../reducers/modalReducer';
import { MarkerState } from '../Search/Mapbox';
import { ShopInput, useCreateContributionShopMutation } from '../../mutations/createContributionShopMutation';
import ModalContext from '../../context/ModalContext';

const axios = require('axios').default;

const getAddress = async (lat: number, lng: number) => {
  const q = lat.toString() + ', ' + lng.toString();
  const options = {
    method: 'GET',
    url: 'https://opencage-geocoder.p.rapidapi.com/geocode/v1/json',
    params: {
      key: 'eefe35726c5944cdb1acc06949285160',
      q: q,
      language: 'en',
    },
    headers: {
      'x-rapidapi-key': '0701bccf9emsh1d8d01563c06330p12b202jsnec8c9f26b627',
      'x-rapidapi-host': 'opencage-geocoder.p.rapidapi.com',
    },
  };
  try {
    const response: AxiosResponse = await axios.request(options);
    console.log(response.data.results);
    if (response.status === 200) return response.data.results[0].components;
  } catch (err) {
    console.error(err);
  }
};


const Addpro = ({
                  state,
                  dispatch,
                  markerState,
                }: {
  state: boolean,
  dispatch: React.Dispatch<ModalAction>,
  markerState: MarkerState
}) => {
  const [society, setSociety] = useState<string>();
  const [activity, setActivity] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [num, setNum] = useState<string>();
  const [street, setStreet] = useState<string>();
  const [city, setCity] = useState<string>();
  const [zipCode, setZipCode] = useState<string>();
  const [department, setDepartment] = useState<string>();

  const [website, setWebsite] = useState<string>();
  const [phone, setPhone] = useState<string>();

  ////// schedules
  const [present] = useIonPicker();
  //// period
  const [startDay, setStartDay] = useState<string>();
  const [endDay, setEndDay] = useState<string>();
  const [fromHour, setFromHour] = useState<string>();
  const [toHour, setToHour] = useState<string>();
  //// custom days
  // monday
  const [mondayAmFrom, setMondayAmFrom] = useState<string>();
  const [mondayAmTo, setMondayAmTo] = useState<string>();
  const [mondayPmFrom, setMondayPmFrom] = useState<string>();
  const [mondayPmTo, setMondayPmTo] = useState<string>();
  // tuesday
  const [tuesdayAmFrom, setTuesdayAmFrom] = useState<string>();
  const [tuesdayAmTo, setTuesdayAmTo] = useState<string>();
  const [tuesdayPmFrom, setTuesdayPmFrom] = useState<string>();
  const [tuesdayPmTo, setTuesdayPmTo] = useState<string>();
  // wednesday
  const [wednesdayAmFrom, setWednesdayAmFrom] = useState<string>();
  const [wednesdayAmTo, setWednesdayAmTo] = useState<string>();
  const [wednesdayPmFrom, setWednesdayPmFrom] = useState<string>();
  const [wednesdayPmTo, setWednesdayPmTo] = useState<string>();
  // thursday
  const [thursdayAmFrom, setThursdayAmFrom] = useState<string>();
  const [thursdayAmTo, setThursdayAmTo] = useState<string>();
  const [thursdayPmFrom, setThursdayPmFrom] = useState<string>();
  const [thursdayPmTo, setThursdayPmTo] = useState<string>();
  // friday
  const [fridayAmFrom, setFridayAmFrom] = useState<string>();
  const [fridayAmTo, setFridayAmTo] = useState<string>();
  const [fridayPmFrom, setFridayPmFrom] = useState<string>();
  const [fridayPmTo, setFridayPmTo] = useState<string>();
  // saturday
  const [saturdayAmFrom, setSaturdayAmFrom] = useState<string>();
  const [saturdayAmTo, setSaturdayAmTo] = useState<string>();
  const [saturdayPmFrom, setSaturdayPmFrom] = useState<string>();
  const [saturdayPmTo, setSaturdayPmTo] = useState<string>();
  // sunday
  const [sundayAmFrom, setSundayAmFrom] = useState<string>();
  const [sundayAmTo, setSundayAmTo] = useState<string>();
  const [sundayPmFrom, setSundayPmFrom] = useState<string>();
  const [sundayPmTo, setSundayPmTo] = useState<string>();

  const toggleModal = () => {
    dispatch({ type: 'TOGGLE_ADDPRO_MODAL' });
  };
  const { lat, lng } = markerState;

  // get address from reverse geoloc
  useEffect(() => {
    const fetchAddress = async () => {
      const APIres = await getAddress(lat, lng);
      setNum(APIres.house_number);
      setStreet(APIres.street);
      setZipCode(APIres.postcode);
      setCity(APIres.city);
      setDepartment(APIres.state_district);
      // const number: string = APIres.house_number;
      // const street: string = APIres.street;
      // const postcode: string = APIres.postcode;
      // const city: string = APIres.city;
      // const stateDistrict: string = APIres.state_district;
    };
    fetchAddress();
  }, [markerState]);

  const [createShop] = useCreateContributionShopMutation();

  const proposePro = async () => {
    console.log('submitted');
    // loading true
    if (society && activity && description && num && street && zipCode && city && department) {
      try {
        const addressJoin = num + ' ' + street;
        const input: ShopInput = {
          name: society,
          professionalArea: activity,
          shortDescription: description,
          latitude: lat,
          longitude: lng,
          address_1: addressJoin,
          zipCode: zipCode,
          city: city,
          department: department,
        };
        // @ts-ignore
        const res = await createShop(input);
        console.log('created shop ?', res);
        // loading false
        // alert success
        toggleModal();
        // leave edition mode
        // reload map
      } catch (e) {
        // alert error
        console.error(e);
      }
    } else {
      console.log('some data are missing');
    }
  };

  const customDayNames = [
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ];
  const options = {
    cssClass: 'select-container',
  };

  return (
    <ModalContext.Consumer>
      {(dispatch) => (
        <IonModal isOpen={state} cssClass='modal'>
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
                Informations requises
              </IonCardHeader>
              <IonList>
                <IonItem>
                  <IonLabel position="floating">Nom de l'entreprise</IonLabel>
                  <IonInput value={society} onIonChange={e => setSociety(e.detail.value!)} clearInput />
                </IonItem>
                <IonItem>
                  <IonLabel>Activité</IonLabel>
                  <IonSelect
                    value={activity}
                    interfaceOptions={options}
                    okText="Ok"
                    cancelText="Retour"
                    onIonChange={e => setActivity(e.detail.value)}>
                    <IonSelectOption value="Producteur Fruits & Légumes">Producteur Fruits & Légumes</IonSelectOption>
                    {/*Selon domaine professionnel, ..., + input 'autre' : ...*/}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Description</IonLabel>
                  <IonTextarea value={description} onIonChange={e => setDescription(e.detail.value!)} />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Localisation</IonLabel>
                  <IonInput placeholder="Numéro" value={num} onIonChange={e => setNum(e.detail.value!)} />
                  <IonInput placeholder="Rue" value={street} onIonChange={e => setStreet(e.detail.value!)} />
                  <IonInput placeholder="Code postal" value={zipCode} onIonChange={e => setZipCode(e.detail.value!)} />
                  <IonInput placeholder="Ville" value={city} onIonChange={e => setCity(e.detail.value!)} />
                  <IonInput placeholder="Département" value={department}
                            onIonChange={e => setDepartment(e.detail.value!)} />
                </IonItem>
              </IonList>
            </IonCard>
            <IonCard>
              <IonCardHeader>
                Informations supplémentaires
              </IonCardHeader>
              <IonList>
                <IonItem>
                  <IonLabel position="floating">Site web</IonLabel>
                  <IonInput value={website} onIonChange={e => setWebsite(e.detail.value!)} clearInput />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Téléphone</IonLabel>
                  <IonInput value={phone} onIonChange={e => setPhone(e.detail.value!)} clearInput />
                </IonItem>
                <IonCard>
                  <IonCardHeader>Horaires</IonCardHeader>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonLabel>Du</IonLabel>
                          <IonItem className="schedules-item" onClick={() =>
                            present({
                              buttons: [
                                {
                                  text: 'Confirmer',
                                  handler: (selected: any) => {
                                    setStartDay(selected.day.value);
                                  },
                                },
                              ],
                              columns: [
                                {
                                  name: 'day',
                                  options: [
                                    { text: 'Lundi', value: 'lundi' },
                                    { text: 'Mardi', value: 'mardi' },
                                    { text: 'Mercredi', value: 'mercredi' },
                                    { text: 'Jeudi', value: 'jeudi' },
                                    { text: 'Vendredi', value: 'vendredi' },
                                    { text: 'Samedi', value: 'samedi' },
                                    { text: 'Dimanche', value: 'dimanche' },
                                  ],
                                },
                              ],
                            })
                          }>
                            {startDay}
                          </IonItem>
                        </IonCol>
                        <IonCol>
                          <IonLabel>Au</IonLabel>
                          <IonItem className="schedules-item" onClick={() =>
                            present({
                              buttons: [
                                {
                                  text: 'Confirmer',
                                  handler: (selected: any) => {
                                    setEndDay(selected.day.value);
                                  },
                                },
                              ],
                              columns: [
                                {
                                  name: 'day',
                                  options: [
                                    { text: 'Lundi', value: 'lundi' },
                                    { text: 'Mardi', value: 'mardi' },
                                    { text: 'Mercredi', value: 'mercredi' },
                                    { text: 'Jeudi', value: 'jeudi' },
                                    { text: 'Vendredi', value: 'vendredi' },
                                    { text: 'Samedi', value: 'samedi' },
                                    { text: 'Dimanche', value: 'dimanche' },
                                  ],
                                },
                              ],
                            })
                          }>
                            {endDay}
                          </IonItem>
                        </IonCol>
                        <IonCol>
                          <IonLabel>De</IonLabel>
                          <IonItem className="schedules-item">
                            <IonDatetime displayFormat="HH:mm" value={fromHour}
                                         onIonChange={e => setFromHour(e.detail.value!)} />
                          </IonItem>
                        </IonCol>
                        <IonCol>
                          <IonLabel>A</IonLabel>
                          <IonItem className="schedules-item">
                            <IonDatetime displayFormat="HH:mm" value={toHour}
                                         onIonChange={e => setToHour(e.detail.value!)} />
                          </IonItem>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    <IonItemDivider />
                    {/*Custom days*/}
                    <IonGrid>
                      <IonRow>
                        <IonCol><IonLabel>Lundi</IonLabel></IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={mondayAmFrom}
                                       onIonChange={e => setMondayAmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={mondayAmTo}
                                       onIonChange={e => setMondayAmTo(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={mondayPmFrom}
                                       onIonChange={e => setMondayPmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={mondayPmTo}
                                       onIonChange={e => setMondayPmTo(e.detail.value!)} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol><IonLabel>Mardi</IonLabel></IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={tuesdayAmFrom}
                                       onIonChange={e => setTuesdayAmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={tuesdayAmTo}
                                       onIonChange={e => setTuesdayAmTo(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={tuesdayPmFrom}
                                       onIonChange={e => setTuesdayPmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={tuesdayPmTo}
                                       onIonChange={e => setTuesdayPmTo(e.detail.value!)} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol><IonLabel>Mercredi</IonLabel></IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={wednesdayAmFrom}
                                       onIonChange={e => setWednesdayAmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={wednesdayAmTo}
                                       onIonChange={e => setWednesdayAmTo(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={wednesdayPmFrom}
                                       onIonChange={e => setWednesdayPmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={wednesdayPmTo}
                                       onIonChange={e => setWednesdayPmTo(e.detail.value!)} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol><IonLabel>Jeudi</IonLabel></IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={thursdayAmFrom}
                                       onIonChange={e => setThursdayAmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={thursdayAmTo}
                                       onIonChange={e => setThursdayAmTo(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={thursdayPmFrom}
                                       onIonChange={e => setThursdayPmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={thursdayPmTo}
                                       onIonChange={e => setThursdayPmTo(e.detail.value!)} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol><IonLabel>Vendredi</IonLabel></IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={fridayAmFrom}
                                       onIonChange={e => setFridayAmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={fridayAmTo}
                                       onIonChange={e => setFridayAmTo(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={fridayPmFrom}
                                       onIonChange={e => setFridayPmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={fridayPmTo}
                                       onIonChange={e => setFridayPmTo(e.detail.value!)} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol><IonLabel>Samedi</IonLabel></IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={saturdayAmFrom}
                                       onIonChange={e => setSaturdayAmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={saturdayAmTo}
                                       onIonChange={e => setSaturdayAmTo(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={saturdayPmFrom}
                                       onIonChange={e => setSaturdayPmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={saturdayPmTo}
                                       onIonChange={e => setSaturdayPmTo(e.detail.value!)} />
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol><IonLabel>Dimanche</IonLabel></IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={sundayAmFrom}
                                       onIonChange={e => setSundayAmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={sundayAmTo}
                                       onIonChange={e => setSundayAmTo(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={sundayPmFrom}
                                       onIonChange={e => setSundayPmFrom(e.detail.value!)} />
                        </IonCol>
                        <IonCol>
                          <IonDatetime className="am-pm" displayFormat="HH:mm" value={sundayPmTo}
                                       onIonChange={e => setSundayPmTo(e.detail.value!)} />
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonList>
            </IonCard>
            <IonButton expand="block" color="secondary" size="large" onClick={proposePro}>Je contribue !</IonButton>
            <IonButton expand="block" fill="outline" color="secondary" className="back-white"
                       onClick={toggleModal}>Retour</IonButton>
          </IonContent>

        </IonModal>
      )}
    </ModalContext.Consumer>

  );
};

export default Addpro;
