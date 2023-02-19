import React from 'react'
import { HStack, Text, VStack, Box, ChevronRightIcon } from 'native-base'
import { StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native"

const RenderTaxes = ({ arrData }) => {

    const navigation = useNavigation()

    return (
        <VStack alignItems={"center"} mt={2}>
            {
                arrData.map((tax, i) => {
                    return (
                        <HStack p={2} key={i} style={styles.card} shadow={4} >
                            <Text fontSize={"xl"} color={"white"} fontWeight={"medium"}>{tax.name}</Text>
                            <ChevronRightIcon size={"xl"} color={"white"} onPress={() => navigation.navigate("submissions", { id: tax.id, tax: tax })} />
                        </HStack>
                    )
                })
            }
        </VStack>
    )
}

export default RenderTaxes

const styles = StyleSheet.create({
    card: {
        margin: 10,
        backgroundColor: "#0fd48e",
        alignItems: "center",
        justifyContent: "space-around",
        width: "85%",
        justifyContent: "space-between",
        borderRadius: 12
    }
})