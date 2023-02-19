import React from "react"
import { Box, Button, Input } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'

export const CustomInput = ({ holder, value, onChange, variant, type, rigthIcon, leftIcon, iconCallBack, maxLength, keyboardType }) => {
    return (
        <Input keyboardType={keyboardType ? keyboardType : "default"} maxLength={maxLength} mt={2} w={"90%"} placeholder={holder} value={value} onChangeText={(text) => onChange(text)} variant={variant} type={type} focusOutlineColor={"#0fd48e"}
            InputRightElement={
                rigthIcon && <Icon onPress={iconCallBack} name={rigthIcon} size={25} color="#0fd48e" />
            }
            InputLeftElement={
                leftIcon && <Box ml={2}><Icon onPress={iconCallBack} name={leftIcon} size={25} color="#0fd48e" /></Box>
            }
        />
    )
}