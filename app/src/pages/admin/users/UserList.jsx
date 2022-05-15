import React, {useEffect, useState} from 'react';
import {
  Box, HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import EditUser from './EditUser';
import DeleteUser from './DeleteUser';
import BanUser from './BanUser';



const UserList = () => {
  const [users, setUsers] = useState(null);

  const fetchUsers = () => {
    fetch('/api/users/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setUsers(json);
      })
    });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <VStack align="start" spacing={0}>
      {
        users ?
          (
            <Box w="100%" borderWidth="1px" >
            <TableContainer >
              <Table>
                <Thead>
                  <Tr alignItems='center'>
                    <Th>Name</Th>
                    <Th>Date of Birth</Th>
                    <Th>Email</Th>
                    <Th>Admin?</Th>
                    <Th>Banned?</Th>
                    <Th/>
                  </Tr>
                </Thead>


                <Tbody>
                  {
                    users.map((user) => (
                      <Tr key={user.userId}>
                        <Td>{user.forename} {user.surname}</Td>
                        <Td>{user.dob}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.isAdmin ? "Yes" : "No"}</Td>
                        <Td>{user.isBanned ? "Yes" : "No"}</Td>
                        <Td>
                          <HStack align="end" justify="end">
                            <EditUser user={user} update={fetchUsers}/>
                            <BanUser user={user} update={fetchUsers}/>
                            <DeleteUser user={user} update={fetchUsers}/>
                          </HStack>
                        </Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
            </Box>
          ) : (
            <p>No Users Fetched</p>
          )
      }
    </VStack>
  );
};

export default UserList;