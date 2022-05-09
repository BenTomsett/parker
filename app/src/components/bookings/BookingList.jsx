import React, {useState} from 'react';
import {Button, Heading, Text, VStack} from '@chakra-ui/react';

const BookingList = () => {
    const [bookings, setBookings] = useState(null);

    const fetchBookings = () => {
        fetch('http://localhost:5000/bookings', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0ZW1haWwxQGV4YW1wbGUuY29tIiwiZm9yZW5hbWUiOiJOYXRoYW4iLCJzdXJuYW1lIjoiU2ViaGFzdGlhbiIsImlhdCI6MTY1MjA5NTI2NywiZXhwIjoxNjUyMTgxNjY3fQ.4pEwHT17p5Z_SZNPxSjdKBpZnTBn0CqgK4Id1-PP8fU',
            }
        }).then((response) => {
            response.json().then((json) => {
                setBookings(json);
            })
        })
    }

    return (
        <VStack align="start" spacing={0}>
            <Heading size="lg">Welcome to your Bookings Page</Heading>
            <Text fontSize="xl">Here are your bookings.</Text>

            <Button onClick={fetchBookings()}>Get Bookings</Button>

            {bookings ? (
                <code>
                    {JSON.stringify(bookings)}
                </code>
            ) : (
                <p>No bookings Fetched</p>
            )}
        </VStack>
    );
};

export default BookingList;