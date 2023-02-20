import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Image, Pressable, Text, useToast, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch } from "react-redux";
import { CustomButtom } from "../../components/button/Button";
import Header from "../../components/header/Header";
import { CustomInput } from "../../components/input/Input";
import { CustomSpinner } from "../../components/spinner/Spiner";
import ToastAlert from "../../components/toast/CustomToast";
import { insertSubmissions } from "../../store/submissions/submissionsSlice";

const Submissions = ({ route }) => {

    const dispatch = useDispatch()

    const tax = route.params.tax
    const navigation = useNavigation()
    const [formData, setFormData] = useState([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({})
    const [disabled, setDisabled] = useState(true)
    const [photoUrl, setPhotoUrl] = useState(null)
    const [errors, setErrors] = useState({})
    const toast = useToast()

    let options = {
        saveToPhotos: true,
        mediaType: 'photo',
        fixOrientation: true
    }

    const formatErrors = (data) => {
        let newObj = new Object()
        for (let item of data) {
            if (item.id !== "picture") {
                newObj[item.id] = false
            }
        }
        setErrors(newObj)
        validateForm(newObj)
    }

    const getForm = () => {
        fetch(`http://10.0.2.2:3000/taxes/${tax.id}/form`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                setFormData(data)
                formatErrors(data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const openGalery = async () => {
        const result = await launchImageLibrary(options)
        if (result.didCancel === true) {
            return
        }
        setPhotoUrl(result.assets[0].uri)
        setForm({ ...form, picture: result.assets[0].uri })
    }

    const takePhoto = () => {
        launchCamera(options, (res) => {
            if (res.didCancel === true) {
                return
            }
            setForm({ ...form, picture: res.assets[0].uri })
            setPhotoUrl(res.assets[0].uri)
        })
    }

    const validateForm = (data) => {

        let validForm = true;
        const formErrors = {};
        for (const key in data ? data : errors) {
            let invalidValue;
            invalidValue = !form[key];
            formErrors[key] = invalidValue;
            if (invalidValue) validForm = false;
        }
        setDisabled(!validForm)
    }

    const handleSubmit = () => {

        let myHeaders = new Headers()
        myHeaders.append('Accept', 'application/json')
        myHeaders.append('Content-Type', 'application/json')

        let newSubmission = {
            ...form,
            taxId: tax.id,
            year: tax.year
        }

        fetch(`http://10.0.2.2:3000/tax/${tax.id}/form`, {
            method: "POST",
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify(newSubmission)
        })
            .then(res => res.json())
            .then(data => {
                dispatch(insertSubmissions(data))
                setForm({})
                setPhotoUrl(null)
                toast.show({
                    placement: "bottom",
                    duration: 400,
                    render: ({
                        id
                    }) => {
                        return <ToastAlert status={"success"} variant={"left-accent"} title={"Submission added"} description={"The submission was added successfully"} />;
                    }
                })
                navigation.goBack()
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        if (Object.values(errors).length > 0) {
            validateForm()
        }
    }, [form])

    useEffect(() => {
        getForm()
    }, [])

    return (
        <VStack justifyContent={"space-between"} h={"100%"} >
            <VStack alignItems={"center"} justifyContent={loading ? "center" : "flex-start"} >
                <Header tittle={"Add submissions"} />
                {
                    loading
                        ?
                        <CustomSpinner color={"#99f1bd"} size={"lg"} />
                        :
                        <>
                            {
                                formData.map((item, i) => {
                                    if (item.id !== "picture") {
                                        return (
                                            <CustomInput
                                                key={i}
                                                holder={item.label}
                                                value={form[item.id]}
                                                onChange={(text) => setForm({ ...form, [item.id]: text })}
                                                variant={"underlined"}
                                                type={item.type}
                                                maxLength={item.maxLength}
                                                keyboardType={item.id === "age" ? "numeric" : "default"}
                                            />
                                        )
                                    } else {
                                        return (
                                            <Box key={i} alignItems={"center"} w={"100%"}>
                                                {
                                                    photoUrl !== null
                                                        ?
                                                        <Image
                                                            mt={4}
                                                            source={{
                                                                uri: photoUrl
                                                            }}
                                                            alt="image"
                                                            size="2xl"
                                                        />
                                                        :
                                                        <Pressable onPress={() => takePhoto()} >
                                                            <Image resizeMode={"center"} source={require('../../../assets/camera.png')} alt="camera" />
                                                        </Pressable>
                                                }
                                                <HStack mt={10} w={"85%"} justifyContent={"space-between"}>
                                                    <Box w={"45%"}>
                                                        <CustomButtom text={"Take photo"} size={"sm"} callBack={() => takePhoto()} />
                                                    </Box>
                                                    <Box w={"45%"}>
                                                        <CustomButtom text={"Select from galery"} size={"sm"} callBack={() => openGalery()} />
                                                    </Box>
                                                </HStack>
                                            </Box>
                                        )

                                    }
                                })
                            }
                        </>

                }
            </VStack>
            <Box mb={2} w={"85%"} alignSelf={"center"}>
                <CustomButtom text={"Submit"} size={"sm"} callBack={() => handleSubmit()} disabled={disabled} />
            </Box>
        </VStack>
    )
}

export default Submissions