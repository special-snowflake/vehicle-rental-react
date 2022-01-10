import React from 'react';
import {Link} from 'react-router-dom';

function VehicleCard(props) {
  const dataVehicle = props.dataVehicle;
  console.log('vehicle card', dataVehicle);
  let lengthData =
    typeof props.length === 'undefined'
      ? props.dataVehicle.length
      : props.length > props.dataVehicle.length
      ? props.dataVehicle.length
      : !props.length
      ? props.dataVehicle.length
      : props.length;
  const card = [];
  for (let index = 0; index < lengthData; index++) {
    const id = dataVehicle[index].id;
    const image = JSON.stringify(dataVehicle[index].image);
    const imgURL =
      image !== 'null'
        ? `http://localhost:8000/vehicles${JSON.parse(image)}`
        : require(`../assets/images/car-default.jpg`);
    const element = (
      <section
        className='col-md-3 col-sm-6 col-6 text-center vehicle-card'
        key={'vcard' + id}>
        <div className='vehicle-content'>
          <div className='vehicle-images'>
            <Link to={`/vehicle/${id}`}>
              <img src={imgURL} alt='vehicles' />
              <figcaption>
                <span className='fig-title'>
                  {dataVehicle[index].brand + ' ' + dataVehicle[index].model}
                </span>
                <br />
                <span className='fig-subtitle'>{dataVehicle[index].city}</span>
              </figcaption>
            </Link>
          </div>
        </div>
      </section>
    );
    card.push(element);
  }
  return card;
}

export default VehicleCard;
