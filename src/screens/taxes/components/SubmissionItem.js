import React, { useState } from 'react'
import { CloseIcon, HStack, Text, VStack } from 'native-base'
import CustomModal from '../../../components/modal/CustomModal'
import { useDispatch } from 'react-redux'
import { deleteOne } from '../../../store/submissions/submissionsSlice'

const SubmissionItem = ({ item, apiDelete }) => {

    const dispatch = useDispatch()

    const [showModal, setShowModal] = useState(false)

    const deleteSubmission = () => {
        setShowModal(false)
        apiDelete(item.id)
        dispatch(deleteOne({ id: item.id, taxId: item.taxId }))

    }

    const capitalize = (s) => {
        return s[0].toUpperCase() + s.slice(1)
    }


    return (
        <>
            <HStack borderRadius={5} shadow={5} w={"85%"} bgColor={"#0fd48e"} p={2} m={2} alignItems={"center"} justifyContent={"space-between"}>
                <VStack w={"50%"}>
                    <Text fontSize={"md"} color={"white"}>Name: {capitalize(item.name)}</Text>
                    <Text fontSize={"md"} color={"white"}>Surname : {capitalize(item.surname)}</Text>
                </VStack>
                <VStack>
                    <Text fontSize={"md"} color={"white"}>Age: {item.age}</Text>
                    <Text fontSize={"md"} color={"white"}>Year: {item.year}</Text>
                </VStack>
                <CloseIcon onPress={() => setShowModal(true)} mr={2} color={"white"} />
            </HStack>
            <CustomModal showModal={showModal} onClose={() => setShowModal(false)} tittle={"Delete submission"} text={"Are you sure you want to delete this submission?"} confirm={() => deleteSubmission()} />
        </>
    )
}

export default SubmissionItem