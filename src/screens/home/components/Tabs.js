import React, { useState, useEffect } from "react";
import { SceneMap, TabView } from "react-native-tab-view";
import { Box, Pressable, StatusBar, Text, useToast } from "native-base";
import { Animated, Dimensions, Share } from "react-native";
import RenderTaxes from "./RenderTaxes";
import ToastAlert from "../../../components/toast/CustomToast";

const RenderTabs = ({ taxes }) => {


    const [activeTaxes, setActiveTaxes] = useState([])
    const [inactiveTaxes, setInactiveTaxes] = useState([])
    const toast = useToast()

    useEffect(() => {
        setActiveTaxes(taxes.filter(tax => tax.active))
        setInactiveTaxes(taxes.filter(tax => !tax.active))
    }, [taxes])


    const [index, setIndex] = useState(0)
    const routes = [{
        key: 'first',
        title: 'Active '
    }, {
        key: 'second',
        title: 'Inactive '
    }
    ]

    const Route = () => {
        return <RenderTaxes arrData={index === 0 ? activeTaxes : inactiveTaxes} />
    }

    const initialLayout = {
        width: Dimensions.get('window').width
    };

    const renderScene = SceneMap({
        first: Route,
        second: Route
    });

    const onShare = async () => {
        try {
            await Share.share({
                message:
                    'Tax Down App | Look how cool is this app !',
            });
        } catch (error) {
            toast.show({
                placement: "bottom",
                duration: 400,
                render: ({
                    id
                }) => {
                    return <ToastAlert status={"error"} variant={"left-accent"} title={"Something went wrong"} description={"We could not share the application"} />;
                }
            })
        }
    };

    const renderTabBar = props => {
        return (
            <Box flexDirection="row">
                {props.navigationState.routes.map((route, i) => {
                    const color = index === i ? '#0fd48e' : '#1f2937'
                    const borderColor = index === i ? '#0fd48e' : 'coolGray.200'
                    return (
                        <Pressable key={i} onPress={() => { setIndex(i) }} borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
                            <Box >
                                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                            </Box>
                        </Pressable>
                    )
                })}
            </Box >
        )
    };

    return (
        <>
            <TabView navigationState={{ index, routes }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout}
                style={{
                    marginTop: StatusBar.currentHeight,
                    width: "100%"
                }} />
            <Pressable mb={4} onPress={() => onShare()}>
                <Text color="#0fd48e" fontSize={"lg"}>Share my app</Text>
            </Pressable>
        </>
    )
}

export default RenderTabs