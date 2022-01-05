import React from 'react';
import {useParams} from 'react-router-dom';
import '../assets/css/DetailVehicle.css';
import WrappedDataVehicle from '../components/WrappedDataVehicle';

function DetailVehicle() {
  const params = useParams();
  return <WrappedDataVehicle vid={params.id} />;
}

export default DetailVehicle;
