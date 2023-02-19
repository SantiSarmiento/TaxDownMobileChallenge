import React, { useState } from "react";
import { Alert, Box, HStack, Image, Pressable, Text, VStack } from "native-base";
import { CustomButtom } from "../../components/button/Button";
import { CustomInput } from "../../components/input/Input";
import { useDispatch } from 'react-redux'
import { logUser } from "../../store/user/userSlice";

const Login = ({ navigation }) => {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({
        name: "",
        password: ""
    })

    const login = async () => {
        setLoading(true)
        if (error !== "") setError("")
        fetch(`http://10.0.2.2:3000/users?name=${user.name.toLocaleLowerCase()}&password=${user.password}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    setLoading(false)
                    setError("Wrong username or password")
                } else {
                    setLoading(false)
                    dispatch(logUser(data[0]))
                }
            })
            .catch((error) => {
                setLoading(false)
                setError("Something went wrong")
            });
    }

    return (
        <VStack h={"100%"} alignItems={"center"} justifyContent={"space-between"}>
            <Box alignItems={"center"} >
                <Box ml={5} mr={5}>
                    <Image resizeMode={"center"} source={require('../../../assets/logo.png')} alt="Logo" />
                </Box>
                <CustomInput holder={"Name"} value={user.name} onChange={(text) => setUser({ ...user, name: text })} variant={"underlined"} type={"text"} />
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
                    <Text fontSize={"lg"} color={"gray.400"}>Don't have an account ? </Text>
                    <Pressable onPress={() => navigation.navigate("signup")}>
                        <Text fontSize={"lg"} fontWeight={"medium"} color={"#0fd48e"}>Sign up</Text>
                    </Pressable>
                </HStack>
                <CustomButtom text={"Sign in"} size={"lg"} callBack={() => login()} disabled={user.name === "" || user.password === "" || loading} />
            </Box>
        </VStack>
    )
}

export default Login