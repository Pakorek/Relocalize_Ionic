import React, { useEffect, useReducer, useState } from 'react';
import './Mapbox.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import MapContext from '../../context/MapContext';
import ModalContext from '../../context/ModalContext';
import ShopContext from '../../context/ShopContext';
import { Action, mapReducer } from '../../reducers/mapReducer';
import { ModalAction, modalReducer } from '../../reducers/modalReducer';
import Addpro from '../Modal/AddPro';
import { IonButton } from '@ionic/react';
import { ShopInput } from '../../mutations/createContributionShopMutation';

export type ShopType = {
  name: string,
  professionalArea: string,
  professionalClass: string,
  address_1: string,
  zipCode: string,
  city: string,
  department: string,
  latitude: number,
  longitude: number
}
export type MarkerState = {
  lat: number;
  lng: number;
}
export type ModalState = {
  state: boolean;
}
export type ModalDispatch = (action: ModalAction) => void

function InteractiveComponent({ state, dispatch }: { state: MarkerState, dispatch: React.Dispatch<Action> }) {
  const [marker, setMarker] = useState<MarkerState>({ lat: 0, lng: 0 });
  const map = useMapEvents({
    click: (e) => {
      map.locate();
      const { lat, lng } = e.latlng;
      dispatch({ type: 'ADD_MARKER', lat: lat, lng: lng });
    },
  });
  return null;
}

const initialMarkerState = { lat: 0, lng: 0 };

const Mapbox: (onEdit: { onEdit: boolean }) => (JSX.Element) = (onEdit: { onEdit: boolean }) => {

  const [shops, setShops] = useState<ShopInput[]>([]);
  const [markerState, markerDispatch] = useReducer(mapReducer, initialMarkerState);
  const [modalState, modalDispatch] = useReducer(modalReducer, false);

  const toggleModal = () => {
    modalDispatch({ type: 'TOGGLE_ADDPRO_MODAL' });
  };

  const getShopsGQL = gql`
      query getShops {
          getShops(country: "FRANCE") {
              name
              professionalArea
              professionalClass
              address_1
              zipCode
              city
              department
              latitude
              longitude
          }
      }
  `;

  useEffect(() => {
    console.log('mapbox rendered');
  }, [shops]);

  const { error, loading, data } = useQuery(getShopsGQL, {
    onCompleted: () => {
      setShops(data.getShops);
    },
  });
  const modalValues = { state: modalState, dispatch: modalDispatch };
  const shopValues = {shops: shops, setShops: setShops}

  if (error) return <pre>{error}</pre>;
  if (loading) return <pre>{loading}</pre>;

  return (
    <MapContext.Provider value={markerDispatch}>
      <ModalContext.Provider value={modalValues}>
        <ShopContext.Provider value={shopValues}>
          <MapContainer
            center={[44.484642, 4.690246]}
            zoom={13}
            scrollWheelZoom={false}
            className="map"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              // url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            />

            {/*  EditMod  */}
            {onEdit.onEdit &&
            <InteractiveComponent state={markerState} dispatch={markerDispatch} />
            }
            {/*Modal*/}
            <Addpro markerState={markerState} />
            {/*Marker*/}
            {(markerState.lat !== 0 && markerState.lng !== 0) &&
            <Marker position={[markerState.lat, markerState.lng]}>
              <Popup>
                <IonButton className="popup-button" type="button" onClick={toggleModal}>Editer</IonButton>
              </Popup>
            </Marker>}
            {/*End EditMod*/}

            {/*DB shops*/}
            {shops.map((shop: ShopInput, key: number) => (
                <Marker position={[shop.latitude, shop.longitude]} key={key}>
                  <Popup>
                    <h1>{shop.name}</h1>
                    <p>{shop.professionalArea}</p>
                    <br />
                    <a href="/">Link</a>
                  </Popup>
                </Marker>
              ),
            )}
            {/*End DB shops*/}
          </MapContainer>
        </ShopContext.Provider>
      </ModalContext.Provider>
    </MapContext.Provider>

  );
};

export default Mapbox;
