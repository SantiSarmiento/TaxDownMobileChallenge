import React from "react";
import { ArrowBackIcon, HStack, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";

const Header = ({ tittle }) => {
    
    const navigation = useNavigation()

    return (
        <HStack alignItems="center" bg={"#0fd48e"} p={2} w={"100%"}>
            <ArrowBackIcon color={"white"} size={6} onPress={() => navigation.goBack()} />
            <Text color="white" fontWeight={"medium"} fontSize="20" ml={5}>
                {tittle}
            </Text>
        </HStack>
    )
}

export default Header