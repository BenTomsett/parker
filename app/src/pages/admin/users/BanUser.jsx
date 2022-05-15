/* eslint react/prop-types: 0 */
/* eslint no-else-return: 0 */

import React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from '@chakra-ui/react';

const BanUser = ({user, update}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    const toggleBanUser = async () => {
        if (user.isBanned) {
            return fetch(`/api/users/${user.userId}/unban`, {
                method: 'PUT',
            })
        } else {
            return fetch(`/api/users/${user.userId}/ban`, {
                method: 'PUT',
            })
        }
    }

    return (
        <>
            <Button colorScheme='orange' onClick={onOpen}>{user.isBanned ? "Unban" : "Ban"} user</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>{user.isBanned ? "Unban" : "Ban"} user</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <h2> Are you sure you want to {user.isBanned ? "unban" : "ban"} {user.forename} {user.surname}?</h2>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={async () => {
                            await toggleBanUser(user);
                            update();
                            onClose();
                        }}>
                            {user.isBanned ? "Unban" : "Ban"} user
                        </Button>
                        <Button mr={3} onClick={onClose}>
                            No
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default BanUser;