import React, { useEffect } from 'react';
import './Mapbox.css';
import './mapbox';
import { loadMap } from './mapbox';

const Mapbox: React.FC = () => {

  useEffect(() => {
    loadMap();
  }, [])

  return (
    <section id="map"/>
  )
}

export default Mapbox;
