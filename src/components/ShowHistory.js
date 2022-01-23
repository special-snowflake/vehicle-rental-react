import React, {useState} from 'react';
import {numberToRupiah} from '../helpers/collection';

function ShowHistory(props) {
  const [stateCheckId, setStateCheckId] = useState({historyId: []});
  const host = process.env.REACT_APP_HOST;
  const elements = [];
  const {dataHistory} = props;
  function onChange(event) {
    const isChecked = event.target.checked;
    if (isChecked) {
      setStateCheckId({
        historyId: [...stateCheckId.historyId, event.target.value],
      });
      props.callbackHistoryId([...stateCheckId.historyId, event.target.value]);
    } else {
      const index = stateCheckId.historyId.indexOf(event.target.value);
      const array = stateCheckId.historyId;
      array.splice(index);
      setStateCheckId({
        historyId: [...array],
      });
      props.callbackHistoryId([...array]);
    }
  }
  for (let index = 0; index < dataHistory.length; index++) {
    const image = dataHistory[index].image;
    let imgSrc = `${host}/vehicles${image}`;
    if (image === null || typeof image === 'undefined' || image === '')
      imgSrc = require('../assets/images/car-default.jpg');
    const element = (
      <React.Fragment key={`history-${index}`}>
        <div
          className='history-product col-10 col-sm-11 p-0 mb-4 d-flex'
          key={`history-${index}`}>
          <div className='history-img-wrapper'>
            <img src={imgSrc} alt='' />
          </div>
          <div className='history-product-info mt-auto mb-auto'>
            <p className='vehicle-detail-header'>{dataHistory[index].name}</p>
            <p className='date-rental'>{`${dataHistory[index].rental_date} - ${dataHistory[index].return_date}`}</p>
            <p className='fw-bold'>
              Prepayment : {numberToRupiah(dataHistory[index].total_payment)}
            </p>
            <p className='availabiliy mt-2'>
              {dataHistory[index].return_status !== null
                ? dataHistory[index].return_status
                : 'Vehicle has been returned.'}
            </p>
          </div>
        </div>
        <div className='col-2 col-sm-1 m-auto'>
          <input
            type='checkbox'
            className='checkbox-history'
            name='historyId'
            onChange={onChange}
            value={dataHistory[index].history_id}
          />
        </div>
        {/* <div className='col-12 col-sm-11 p-0'>
          <button className='btn btn-yellow'>Delete Selected Item</button>
        </div> */}
      </React.Fragment>
    );
    elements.push(element);
  }
  if (dataHistory.length === 0) {
    elements.push(
      <>
        <p>No history found.</p>
      </>,
    );
  }
  return elements;
}

export default ShowHistory;
