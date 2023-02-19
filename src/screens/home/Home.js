import React, { useState, useEffect } from "react";
import { VStack, Text } from 'native-base'
import RenderTabs from "./components/Tabs";
import { CustomSpinner } from "../../components/spinner/Spiner";
import UserInfo from "./components/UserInfo";


const Home = () => {

    const [loading, setLoading] = useState(true)
    const [taxes, setTaxes] = useState([])

    const getTaxes = () => {
        fetch('http://10.0.2.2:3000/taxes', {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                setTaxes(data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        getTaxes()
    }, [])

    return (
        <VStack bgColor={"#f5f9f6"} alignItems={"center"} justifyContent={loading ? "flex-start" : "space-between"} h={"100%"} w={"100%"}>
            <UserInfo />
            {
                loading
                    ?
                    <CustomSpinner color={"#99f1bd"} size={"lg"} />
                    :
                    taxes.length !== 0
                        ?
                        <RenderTabs taxes={taxes} />
                        :
                        <Text>No se encontraron impuestos</Text>
            }
        </VStack>
    )
}

export default Home