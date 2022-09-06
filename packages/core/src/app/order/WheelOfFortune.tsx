import { Order } from '@bigcommerce/checkout-sdk';
import { createRequestSender } from '@bigcommerce/request-sender';
import React, { FC, useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const options = [{
  option: 'WIN!',
  style: { backgroundColor: '#44a0de', textColor: '#fef257' },
}, { option: '', style: { backgroundColor: '#ee8633' } }
];

const data = options.concat(options).concat(options).concat(options).concat(options);

const requestSender = createRequestSender();

const refundOrder = async (orderId: number, storeHash: string) => {
  await requestSender.post(`http://localhost:1234/${storeHash}/spin/${orderId}`);
}

export const WheelOfFortune: FC<{ orderId: number; storeHash: string }> = React.memo(({ orderId, storeHash }) => {
  const [spin, setSpin] = useState(false);
  const [win, setWin] = useState(false);

  return (
    <div>
      { win && <div>
        <h1>YOU WON!</h1>
        <h2>Your order was refunded!</h2>
      </div> }
      { !win && (
        <>
          <h1>Feeling Lucky?</h1>
          <h2>Try your luck and spin the wheel!</h2>
        </>
      ) }
      <button onClick={ () => {
        setSpin(true);
        void refundOrder(orderId, storeHash)
      } }>
        <Wheel
          data={ data }
          mustStartSpinning={ spin }
          onStopSpinning={ () => setWin(true) }
          prizeNumber={ 2 }
          spinDuration={ 0.5 }
        />
      </button>
    </div>
  );
});
