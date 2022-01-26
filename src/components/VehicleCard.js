import React from 'react';
import {Link} from 'react-router-dom';

function VehicleCard(props) {
  const dataVehicle = props.dataVehicle;
  // console.log('vehicle card', dataVehicle);
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
    let classMarginMD = '';
    // console.log('idx', index, index + 2, (index + 2) % 2 === 0);
    const x = index < 4 ? 0 : index < 8 ? 1 : 2;
    const i = index + 1;
    if ((i - x * 4) % 4 === 0) {
      classMarginMD = 'ms-md-auto me-md-0';
    } else if ((i - x * 4) % 2 === 0 || (i - x * 4) % 3 === 0) {
      classMarginMD = 'mx-md-auto';
    } else {
      classMarginMD = 'ms-md-0';
    }
    const imgURL =
      image !== 'null'
        ? `${process.env.REACT_APP_HOST}/vehicles${JSON.parse(image)}`
        : require(`../assets/images/car-default.jpg`);
    const element = (
      <section
        className='col-md-3 col-sm-6 col-6 text-center vehicle-card'
        key={'vcard' + id}>
        <div className='vehicle-content'>
          <div className={`vehicle-images ${classMarginMD}`}>
            <Link to={`/vehicle/${id}`}>
              <img src={imgURL} alt='vehicles' />
              <figcaption>
                <span className='fig-title'>{dataVehicle[index].name}</span>
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
