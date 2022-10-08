import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { Colors, View } from "react-native-ui-lib";
import { provider, useInstance } from "react-ioc";
import { WalletsScreenModel } from "./WalletsScreenModel";

import { Screen } from "../../components";
import Carousel from 'react-native-snap-carousel';
import { Dimensions, InteractionManager } from "react-native";
import { WalletTittle } from "./wallet/WalletTittle";
import {
    SelfAddressQrCodeDialogViewModel
} from "../../components/dialogs/selfAddressQrCodeDialog/SelfAddressQrCodeDialogViewModel";
import { SelfAddressQrCodeDialog } from "../../components/dialogs/selfAddressQrCodeDialog/SelfAddressQrCodeDialog";
import { BlurWrapper } from "../../components/blurWrapper/BlurWrapper"
import { useNavigation } from "@react-navigation/native";
import { getWalletStore } from "../../App";

const renderTittle = ({ item }) => <WalletTittle {...item} />

const Wallets = observer<{ route: any }>(function ({ route }) {

    const view = useInstance(WalletsScreenModel)
    const nav = useNavigation<any>()
    const selfAddressQrCodeDialogViewModel = useInstance(SelfAddressQrCodeDialogViewModel)

    const carouselTittleRef = useRef<Carousel<any>>()
    const carouselBodyRef = useRef<Carousel<any>>()

    useEffect(() => {
        InteractionManager.runAfterInteractions(async () => {
            view.init(route.params?.force)
        })
        nav.addListener('focus', async () => {
            if (!carouselBodyRef.current) return
            if (carouselBodyRef?.current.currentIndex !== getWalletStore().selectedWalletIndex) {
                carouselTittleRef?.current?.snapToItem(getWalletStore().selectedWalletIndex)
            }
        })
    }, [])

    useEffect(() => {
        if (route.params?.index) {
            carouselTittleRef?.current?.snapToItem(+route.params.index)
        }
    }, [route])

    return <BlurWrapper
        before={<Screen
            testID={'wallets-screen'}
            backgroundColor={Colors.bg} statusBarBg={Colors.bg}
            preset="scroll"
            refreshing={view.refreshing}
            onRefresh={view.onRefresh}
            style={!view.allInitialized ? { height: "100%" } : {}}
        >
            <>
                {view.allInitialized && <>

                    <View paddingB-10>
                        <View testID={'titleWalletBlock'}>
                            <Carousel
                                vertical={false}
                                useScrollView={true}
                                useExperimentalSnap={true}
                                shouldOptimizeUpdates
                                inactiveSlideScale={1}
                                layout={"default"}
                                ref={carouselTittleRef}
                                data={view.walletAddresses}
                                sliderWidth={Dimensions.get('window').width}
                                itemWidth={Dimensions.get('window').width}
                                renderItem={renderTittle}
                                onSnapToItem={index => {
                                    view.activeIndex = index
                                    // @ts-ignore
                                    getWalletStore().setSelectedWalletIndex(index)
                                    // carouselBodyRef.current.snapToItem(index)
                                }}
                            />
                        </View>

                    </View>
                </>}

            </>
        </Screen>}
        after={<View>
            <SelfAddressQrCodeDialog />
        </View>}
        isBlurActive={
            selfAddressQrCodeDialogViewModel.display}
    />
})

export const WalletsScreen = provider()(Wallets)