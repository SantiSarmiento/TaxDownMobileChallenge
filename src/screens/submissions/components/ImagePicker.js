import { Box, HStack, Image, Pressable } from "native-base";
import React from "react";
import { CustomButtom } from "../../../components/button/Button";

const ImagePicker = ({ photoUrl, takePhoto, openGalery }) => {
    return (
        <Box alignItems={"center"} w={"100%"}>
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
                    <Pressable onPress={takePhoto} >
                        <Image resizeMode={"center"} source={require('../../../../assets/camera.png')} alt="camera" />
                    </Pressable>
            }
            <HStack mt={10} w={"85%"} justifyContent={"space-between"}>
                <Box w={"45%"}>
                    <CustomButtom text={"Take photo"} size={"sm"} callBack={takePhoto} />
                </Box>
                <Box w={"45%"}>
                    <CustomButtom text={"Select from galery"} size={"sm"} callBack={openGalery} />
                </Box>
            </HStack>
        </Box>
    )
}

export default ImagePicker