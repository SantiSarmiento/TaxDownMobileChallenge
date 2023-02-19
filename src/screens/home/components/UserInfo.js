import React, { useState } from "react";
import { HStack, Text } from "native-base";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../../components/modal/CustomModal";
import { clearUp } from "../../../store/submissions/submissionsSlice";
import { signOut } from "../../../store/user/userSlice";

const UserInfo = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const [showModal, setShowModal] = useState(false)

    const logout = async () => {
        await dispatch(clearUp())
        await dispatch(signOut())
    }

    const capitalize = (s) => {
        return s[0].toUpperCase() + s.slice(1)
    }

    return (
        <>
            <HStack w={"100%"} bgColor={"#0fd48e"} justifyContent={"space-between"} alignItems={"center"} p={2}>
                <Text color={"white"} fontWeight={"medium"} fontSize={"lg"}>Welcome {capitalize(user.name)} {capitalize(user.last_name)}</Text>
                <Icon onPress={() => setShowModal(true)} name={"logout"} size={25} color="white" />
            </HStack>
            <CustomModal showModal={showModal} onClose={() => setShowModal(false)} tittle={"Log out"} text={"Are you sure you want to log out?"} confirm={() => logout()} />
        </>
    )
}

export default UserInfo