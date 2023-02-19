import React, { useEffect } from "react";
import { Image, VStack } from 'native-base'
import { CustomSpinner } from "../../components/spinner/Spiner";
import { useDispatch, useSelector } from 'react-redux'
import { syncUpSubmissions } from '../../store/submissions/submissionsSlice'
import { useIsFocused } from "@react-navigation/native";

const Loading = ({ navigation }) => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const state = useSelector((state) => state.user.state)
    const submissions = useSelector((state) => state.submissions.synchronized)

    const checkUser = () => {
        if (state) {
            navigation.navigate("navStack")
        } else {
            navigation.navigate("login")
        }
    }

    const checkSubmissions = () => {
        if (submissions) {
            checkUser()
        } else {
            fetch('http://10.0.2.2:3000/submissions', {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then(data => {
                    dispatch(syncUpSubmissions(data))
                    checkUser()
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    useEffect(() => {
        if (isFocused) {
            checkSubmissions()
        }
    }, [isFocused])

    return (
        <VStack bgColor={"white"} alignItems={"center"} justifyContent={"center"} h={"100%"}>
            <Image resizeMode={"center"} source={require('../../../assets/logo.png')} alt="Logo" />
            <CustomSpinner color={"#99f1bd"} size={"lg"} />
        </VStack>
    )
}

export default Loading