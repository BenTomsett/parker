/* eslint react/prop-types: 0 */

import React, {useEffect, useState} from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    VStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast, Select, Spinner,
} from '@chakra-ui/react';


const EditZone = ({zone,update}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast({status: 'error', isClosable: false});

    const [formData, setFormData] = useState({
        name:zone.name,
        carParkId: zone.CarPark.carParkId,
        spaces: zone.spaces,
    });
    const [carparks, setCarParks] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchCarParks = () => {
        setLoading(true);
        fetch('/api/carparks/', {
            method: 'GET',
        }).then((response) => {
            response.json().then((json) => {
                console.log(json);
                setCarParks(json);
                setLoading(false);
            })
        });
    }

    const updateFormData = (property, value) => {
        setFormData((prevState => ({
            ...prevState,
            [property]: value,
        })));
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const {
            name,
            carParkId,
            spaces,
        } = formData;
        console.log(formData);

        if (!name) {
            toast({
                title: "Please enter a name for the zone"
            })
        } else if (!carParkId) {
            toast({
                title: "Please choose a car park"
            })
        } else if (!spaces){
            toast({
                title: "Please enter a number of spaces"
            })
        }
        else {

            fetch(`/api/zones/${zone.zoneId}`, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                onClose();
                update();

            })
        };
    }
    useEffect(() => {
        fetchCarParks();
    }, [])
    return (
        <>
            <Button onClick={onOpen}>Edit</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    {
                        loading ? (
                            <Spinner />
                        ) : (
                            <form onSubmit={onSubmit}>
                                <ModalHeader>Edit Zone: {`${zone.zoneId}`}</ModalHeader>
                                <ModalCloseButton/>
                                <ModalBody>
                                    <VStack>
                                        <FormControl>
                                            <FormLabel htmlFor='name'>Zone Name</FormLabel>
                                            <Input id='name'
                                                   value={formData.name || ''}
                                                   onChange={(event) => updateFormData('name',
                                                       event.target.value)}/>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel htmlFor='carPark'>Car Park</FormLabel>
                                            <Select name="carPark" id="carPark" value={formData.carParkId} onChange={(event)=>{
                                                updateFormData("carParkId",event.target.value)
                                            }}>
                                                {carparks.map((carpark) => (
                                                    <option key={carpark.carParkId} value={carpark.carParkId} label={carpark.name} />
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel htmlFor='spaces'>Number Of Spaces</FormLabel>
                                            <Input id='spaces'
                                                   type='number'
                                                   value={formData.spaces || ''}
                                                   onChange={(event) => updateFormData('spaces',
                                                       event.target.value)}/>
                                        </FormControl>
                                    </VStack>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} type="submit">
                                        Update
                                    </Button>
                                </ModalFooter>

                            </form>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditZone;