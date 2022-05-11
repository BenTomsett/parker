import React, {useEffect, useState} from 'react';
import {Box, Table, TableContainer, Tbody, Th, Thead, Tr, VStack} from '@chakra-ui/react';
import User from './User';



const UserList = () => {
  const [users, setUsers] = useState(null);

  const fetchUsers = () => {
    fetch('/api/users/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
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
                    <Th>User ID</Th>
                    <Th>First Name</Th>
                    <Th>Last Name</Th>
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
                      <User key={user.userId} user={user} update={fetchUsers} />
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