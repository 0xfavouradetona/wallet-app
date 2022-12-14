import React from "react";
import { Button, Colors, View } from "react-native-ui-lib";
import { t } from "../../../i18n";
import { useInstance } from "react-ioc";
import {
    SelfAddressQrCodeDialogViewModel
} from "../../../components/dialogs/selfAddressQrCodeDialog/SelfAddressQrCodeDialogViewModel";
import { WalletsScreenModel } from "../WalletsScreenModel";
import { RootNavigation } from "../../../navigators";
import { RippleWrapper } from "../../../components/ripple/RippleWrapper";
import { events } from "../../../utils/events";
import { MARKETING_EVENTS } from "../../../config/events";

export interface IWalletTransactionControlsProps {
    tokenAddress?: string
}

export const WalletTransactionControls = (props: IWalletTransactionControlsProps) => {
    const view = useInstance(WalletsScreenModel)
    const selfAddressQrCodeDialogViewModel = useInstance(SelfAddressQrCodeDialogViewModel)

    return <View>
        <View row center flex>
            <RippleWrapper testID={`sendTransaction-${props.tokenAddress || 'eth'}`}
                style={{ flex: 0.5, marginRight: 8 }}
                onClick={() => {
                    RootNavigation.navigate("sendTransaction", {
                        screen: "selectAddress",
                        params: {
                            walletAddress: view.currentWallet.address,
                            tokenAddress: props.tokenAddress
                        }
                    })
                }}>
                <Button paddingT-7 paddingB-7 outlineColor={Colors.white} color={Colors.white} borderRadius={14}
                    labelStyle={{ fontFamily: "Roboto-Medium", paddingLeft: 10, fontSize: 15 }}
                    primary outline label={t("common.send")}
                >

                </Button>
            </RippleWrapper>
            <RippleWrapper style={{ flex: 0.5, marginLeft: 8 }}
                onClick={async () => {
                    events.send(MARKETING_EVENTS.RECEIVE_TRANSACTION)
                    selfAddressQrCodeDialogViewModel.wallet = view.currentWallet
                    selfAddressQrCodeDialogViewModel.display = true
                }}>
                <Button paddingT-7 paddingB-7 outlineColor={Colors.white} color={Colors.white} borderRadius={14}
                    labelStyle={{ fontFamily: "Roboto-Medium", paddingLeft: 10, fontSize: 15 }}
                    primary outline
                    label={t("common.receive")}
                >

                </Button>
            </RippleWrapper>
        </View></View>
}