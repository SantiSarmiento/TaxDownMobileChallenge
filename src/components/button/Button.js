import React from "react"
import { Button } from 'native-base'

export const CustomButtom = ({ text, size, callBack, disabled, variant }) => {
    return (
        <Button w={"100%"} size={size} onPress={callBack} isDisabled={disabled} variant={variant ? variant : "solid"}>
            {text}
        </Button>
    )
}