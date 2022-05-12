/* eslint react/prop-types: 0 */
/* eslint no-else-return: 0 */
import React from 'react';
import {HStack, Td, Tr} from '@chakra-ui/react';
import DeleteRequestedBooking from "./DeleteRequestedBooking";
import ApproveRequestedBooking from "./ApproveRequestedBooking";

const RequestedBooking = ({requestedBooking, update}) => (

  <Tr>
    <Td>{requestedBooking.bookingRequestId}</Td>
    <Td>{requestedBooking.userId}</Td>
    <Td>{requestedBooking.buildingId}</Td>
    <Td>{requestedBooking.startDate.toLocaleString().slice(0,10)}</Td>
    <Td>{requestedBooking.startDate.toLocaleString().slice(12,19)}</Td>
    <Td>{requestedBooking.endDate.toLocaleString().slice(0,10)}</Td>
    <Td>{requestedBooking.endDate.toLocaleString().slice(12,19)}</Td>

    <Td>
      <HStack>
        <ApproveRequestedBooking requestedBooking={requestedBooking} update={update}/>
        <DeleteRequestedBooking requestedBooking={requestedBooking} update={update}/>
      </HStack>
    </Td>
  </Tr>
);

export default RequestedBooking;