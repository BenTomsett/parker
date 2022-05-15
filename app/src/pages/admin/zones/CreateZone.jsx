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
import {FiPlus} from "react-icons/fi";


const CreateZone = ({update}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast({status: 'error', isClosable: false});

    const [formData, setFormData] = useState({});
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
        console.log(formData)

        const {
            name,
            carParkId,
            spaces,
        } = formData;

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
                title: "Please enter number of spaces"
            })
        }

        else {

            fetch(`/api/zones/`, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                onClose();
                update();
            })
        }
    }
    useEffect(() => {
        fetchCarParks();
    }, [])
    return (
        <>
            <Button onClick={onOpen} colorScheme="blue" leftIcon={<FiPlus />}>Add Zone</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    {
                        loading ? (
                            <Spinner />
                        ) : (
                            <form onSubmit={onSubmit}>
                                <ModalHeader>Create new zone</ModalHeader>
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
                                            <Select name="carPark" id="carPark" value={formData.carParkId} defaultValue={-1} onChange={(event)=>{
                                                updateFormData("carParkId",event.target.value)
                                            }}>
                                                <option disabled value={-1}>Choose a car park</option>
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
                                        Add Zone
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

export default CreateZone;