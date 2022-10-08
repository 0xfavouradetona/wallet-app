/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React, { useEffect, useState } from "react"

import { Colors, View } from "react-native-ui-lib"
import { createStackNavigator } from "@react-navigation/stack"
import { BrowserScreen } from "../screens/browser/BrowserScreen"
import { WalletsScreen } from "../screens/wallets/WalletsScreen";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { localStorage } from "../utils/localStorage";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Fontisto from "react-native-vector-icons/Fontisto"


const Stack = createStackNavigator()


export type PrimaryParamList = {
    wallet: undefined
    demo: undefined
    settings: undefined
}

const Tab = createMaterialBottomTabNavigator()

export function MainNavigator<PrimaryParamList>() {
    // const [seedStored, setSeedStored] = useState(true)

    useEffect(() => {
        localStorage.load("hm-wallet-recovery-read").then(res => {
            // setSeedStored(res || false)
        })
    })


    return (
        <Tab.Navigator
            labeled={false}
            activeColor={Colors.primary}
            inactiveColor={Colors.textGrey}
            barStyle={{ backgroundColor: Colors.white, paddingBottom: 5 }}
            screenOptions={({ route }) => ({
                tabBarLabelStyle: { marginTop: 10 },
                tabBarTestID: `tab-${route.name}`,
                headerShown: false,
                tabBarIcon: (options) => {
                    switch (route.name) {
                        case "browser":
                            return <View padding-5 paddingL-20 marginB-5 br50 width={60}
                                height={30}
                            // backgroundColor={options.focused ? Colors.rgba(Colors.primary, 0.1) : Colors.white}
                            >
                                <FontAwesome5 name={"globe-americas"} size={20}
                                    style={{ color: options.focused ? Colors.primary : Colors.textGrey }} /></View>

                        default:
                            return <View padding-5 paddingL-20 marginB-5 br50
                                // backgroundColor={options.focused ? Colors.rgba(Colors.primary, 0.1) : Colors.white}
                                width={60} height={30}>
                                <Fontisto name={"wallet"} size={20}
                                    style={{ color: options.focused ? Colors.primary : Colors.textGrey }} />
                            </View>
                    }
                },
            })}>
            <Tab.Screen name="wallet" component={WalletStack} />
            <Tab.Screen name="browser" component={BrowserScreen} />

        </Tab.Navigator>
    )
}

export function WalletStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="wallet-main" component={WalletsScreen} />
        </Stack.Navigator>

    )
}




/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["wallet"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)