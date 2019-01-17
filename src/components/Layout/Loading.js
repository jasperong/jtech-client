import React from 'react';
import { RingLoader } from 'react-spinners';

const Loading = ({ size }) => (
  <div className="loading__container">
    <RingLoader size={size} />
  </div>
);

export default Loading;
