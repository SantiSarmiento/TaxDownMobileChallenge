import { Alert, HStack, Text, VStack } from "native-base";

const ToastAlert = ({
    status,
    variant,
    title,
    description
}) => <Alert maxWidth="97%" alignSelf="center" flexDirection="row" status={status ? status : "info"} variant={variant}>
        <VStack space={1} flexShrink={1} w="100%">
            <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
                <HStack space={2} flexShrink={1} alignItems="center">
                    <Alert.Icon />
                    <Text fontSize="md" fontWeight="medium" flexShrink={1} color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
                        {title}
                    </Text>
                </HStack>
            </HStack>
            {
                description !== "" &&
                <Text px="6" color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
                    {description}
                </Text>
            }
        </VStack>
    </Alert>;

export default ToastAlert