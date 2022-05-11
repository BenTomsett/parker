/* eslint react/prop-types: 0 */

import React from 'react';

const Building = ({building}) => (

  <option value={building.name}>{building.name}</option>
);

export default Building