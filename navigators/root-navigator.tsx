
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { getWalletStore } from "../App";
import {
    ApprovalWalletConnectDialog
} from "../components/dialogs/approvalWalletConnectDialog/ApprovalWalletConnectDialog";
import { AuthScreen } from "../screens/auth/AuthScreen";
import { AuthInfoScreen } from "../screens/info/AuthInfoScreen";
import { RecoveryPhrasePage } from "../screens/settings/menuPages/RecoveryPhrasePage";
import { MainNavigator } from "./main-navigator";



export type RootParamList = {
    mainStack: undefined
    walletsList: { animate: boolean },
    walletTransactions: { wallet: string, symbol: string, tokenAddress?: string, animate?: boolean },
    walletTransaction: undefined,
    selectValue: undefined,
    sendTransaction: undefined,
    selectAddress: undefined,
    confirmTransaction: undefined,
    QRScanner: undefined,
    recoveryPhrase: undefined,
    selectNetwork: undefined,
    termsOfServicePage,
    privacyPolicyPage,
    walletConnectSessions,
}

const Stack = createStackNavigator<RootParamList>()

const RootStack = () => {


    console.log("check-wallet", !!getWalletStore().wallets[0])
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="mainStack" component={MainNavigator} />


            <Stack.Screen name="recoveryPhrase" component={RecoveryPhrasePage} />

            <Stack.Screen name="auth" component={AuthScreen} options={{ headerShown: false }} />
            <Stack.Screen name="info" component={AuthInfoScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}



export const RootNavigator = React.forwardRef<NavigationContainerRef<any>,
    Partial<React.ComponentProps<typeof NavigationContainer>>>((props, ref) => {
        return (
            <NavigationContainer {...props} ref={ref}>
                <RootStack />

                <ApprovalWalletConnectDialog />

            </NavigationContainer>
        )
    })

RootNavigator.displayName = "RootNavigator"