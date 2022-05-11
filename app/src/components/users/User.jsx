/* eslint react/prop-types: 0 */
/* eslint no-else-return: 0 */
import React from 'react';
import {HStack, Td, Tr} from '@chakra-ui/react';
import DeleteUser from "./DeleteUser";
import BanUser from "./BanUser";
import EditUser from "./EditUser";

const User = ({user, update}) => (

    <Tr>
      <Td>{user.userId}</Td>
      <Td>{user.forename}</Td>
      <Td>{user.surname}</Td>
      <Td>{user.dob}</Td>
      <Td>{user.email}</Td>
      <Td>{user.isAdmin ? "Yes" : "No"}</Td>
      <Td>{user.isBanned ? "Yes" : "No"}</Td>


      <Td>
          <HStack>
            <EditUser user={user} update={update}/>
            <DeleteUser user={user} update={update}/>
            <BanUser user={user} update={update}/>

          </HStack>
      </Td>
    </Tr>
  );

export default User;