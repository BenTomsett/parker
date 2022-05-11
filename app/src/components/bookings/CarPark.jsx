/* eslint react/prop-types: 0 */

import React from 'react';

const CarPark = ({carpark}) => (

  <option value={carpark.name}>{carpark.name}</option>
);

export default CarPark