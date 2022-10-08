import React from "react";
import { observer } from "mobx-react-lite";
import { Avatar, Button, Card, Colors, Text, Toast, View } from "react-native-ui-lib";
import { useInstance } from "react-ioc";
import { WalletsScreenModel } from "../../../screens/wallets/WalletsScreenModel";
import { t } from "../../../i18n";
import { TOAST_POSITION } from "../appToast/AppToast";
import { CircularProgress } from "../../progress/CircularProgress";
import { useNavigation } from "@react-navigation/native";

export const CreateWalletToast = observer(() => {
    const view = useInstance(WalletsScreenModel)
    const nav = useNavigation()
    return <Toast
        // zIndex={ 2147483647 }
        position={"bottom"}
        visible={view.walletDialogs.pendingDialog.display}
        backgroundColor={Colors.transparent}
    >
        <View
            style={{ marginBottom: view.walletDialogs.pendingDialog.position === TOAST_POSITION.UNDER_TAB_BAR ? 65 : 10 }}>
            <Card padding-15 marginH-16>
                <View row centerV>
                    {!view.walletDialogs.pendingDialog.walletCreated ?
                        <CircularProgress indeterminate strokeWidth={2} radius={18}>

                        </CircularProgress> :
                        <Avatar backgroundColor={Colors.rgba(Colors.success, 0.07)} size={32}>
                        </Avatar>}
                    <Text marginL-8 robotoR> {!view.walletDialogs.pendingDialog.walletCreated ?
                        t("walletScreen.menuDialog.createWallet.createWalletMessage") :
                        t("walletScreen.menuDialog.createWallet.createWalletMessageDone")
                    } </Text>
                    <View flex right>
                        {view.walletDialogs.pendingDialog.walletCreated && <Button link label={t("common.view")}
                            onPress={() => nav.navigate("walletsList", { animate: true })} />}
                    </View>
                </View>
            </Card>
        </View>
    </Toast>
})