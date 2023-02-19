import React from "react";
import { Box, Button, FormControl, HStack, Input, Modal, Text } from "native-base";
import { CustomButtom } from "../button/Button";

const CustomModal = ({ showModal, onClose, tittle, text, confirm }) => {
    return (
        <Modal isOpen={showModal} onClose={onClose}>
            <Modal.Content w={"90%"}>
                <Modal.CloseButton />
                <Modal.Header>{tittle}</Modal.Header>
                <Modal.Body>
                    <Text textAlign={"center"} fontSize={"lg"}>{text}</Text>
                </Modal.Body>
                <HStack w={"100%"} mt={2} mb={3} justifyContent={"space-around"}>
                    <Box w={120} >
                        <CustomButtom text={"Cancel"} size={"sm"} callBack={onClose} variant={"outline"} />
                    </Box>
                    <Box w={120}>
                        <CustomButtom text={"Confirm"} size={"sm"} callBack={confirm} />
                    </Box>
                </HStack>
            </Modal.Content>
        </Modal>
    )
}

export default CustomModal