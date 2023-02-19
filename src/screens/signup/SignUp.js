import React, { useState } from "react";
import { Alert, Box, HStack, Pressable, Text, useToast, VStack } from "native-base";
import { CustomButtom } from "../../components/button/Button";
import { CustomInput } from "../../components/input/Input";
import ToastAlert from "../../components/toast/CustomToast";

const SignUp = ({ navigation }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({
        name: "",
        last_name: "",
        password: ""
    })
    const toast = useToast()

    const checkUser = () => {
        fetch(`http://10.0.2.2:3000/users?name=${user.name.toLocaleLowerCase()}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    register()
                } else {
                    setLoading(false)
                    setError("Username already in use")
                }
            })
            .catch((error) => {
                setLoading(false)
                setError("Something went wrong")
            });
    }

    const register = () => {
        if (error !== "") setError("")
        setLoading(true)

        let myHeaders = new Headers()
        myHeaders.append('Accept', 'application/json')
        myHeaders.append('Content-Type', 'application/json')

        fetch(`http://10.0.2.2:3000/users`, {
            method: "POST",
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                toast.show({
                    placement: "bottom",
                    duration: 400,
                    render: ({
                        id
                    }) => {
                        return <ToastAlert status={"success"} variant={"left-accent"} title={"Registration successful"} description={"Now you can use your account"} />;
                    }
                })
                navigation.goBack()
            })
            .catch((error) => {
                setLoading(false)
                setError("Something went wrong")
            });
    }

    return (
        <VStack h={"100%"} alignItems={"center"} justifyContent={"space-between"}>
            <Box alignItems={"center"} >
                <CustomInput holder={"Name"} value={user.name} onChange={(text) => setUser({ ...user, name: text })} variant={"underlined"} type={"text"} />
                <CustomInput holder={"Surname"} value={user.last_name} onChange={(text) => setUser({ ...user, last_name: text })} variant={"underlined"} type={"text"} />
                <CustomInput holder={"Password"} value={user.password} onChange={(text) => setUser({ ...user, password: text })} variant={"underlined"} type={showPassword ? "text" : "password"} rigthIcon={showPassword ? "ios-eye-off-outline" : "ios-eye-outline"} iconCallBack={() => setShowPassword(!showPassword)} />

                {
                    error !== ""
                        ?
                        <Alert mt={4} w={"90%"} variant="left-accent" colorScheme={"error"} status="error">
                            <HStack space={2} flexShrink={1} alignItems="center">
                                <Alert.Icon />
                                <Text>
                                    {error}
                                </Text>
                            </HStack>
                        </Alert>
                        :
                        null

                }
            </Box>
            <Box w={"80%"} mb={3}>
                <HStack mb={4} alignItems={"center"} justifyContent={"center"}>
                    <Text fontSize={"lg"} color={"gray.400"}>Already have an account ? </Text>
                    <Pressable onPress={() => navigation.navigate("login")}>
                        <Text fontSize={"lg"} fontWeight={"medium"} color={"#0fd48e"}>Login</Text>
                    </Pressable>
                </HStack>
                <CustomButtom text={"Sign up"} size={"lg"} callBack={() => checkUser()} disabled={user.name === "" || user.last_name === "" || user.password === "" || loading} />
            </Box>
        </VStack>
    )
}

export default SignUp