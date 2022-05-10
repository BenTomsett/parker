/* eslint react/prop-types: 0 */

import React from 'react';
import {Td, Tr} from '@chakra-ui/react';
import CancelBooking from "./CancelBooking";

const Booking = ({booking, update}) => (
    <Tr>
      <Td>{booking.bookingId}</Td>
      <Td>{booking.bookingId}</Td>
      <Td>{booking.spaceId}</Td>
      <Td>{booking.startDate.toLocaleString().slice(0,10)}</Td>
      <Td>{booking.startDate.toLocaleString().slice(12,19)}</Td>
      <Td>{booking.endDate.toLocaleString().slice(0,10)}</Td>
      <Td>{booking.endDate.toLocaleString().slice(12,19)}</Td>
      <Td>
        <CancelBooking booking={booking} update={update}/>
      </Td>
    </Tr>
  );

export default Booking;