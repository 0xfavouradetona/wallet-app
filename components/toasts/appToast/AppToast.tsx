import React from "react";
import { observer } from "mobx-react-lite";
import { Avatar, Colors, Text, Toast, View } from "react-native-ui-lib";
import { useInstance } from "react-ioc";
import { RootStore } from "../../../store/RootStore";
import { TOASTER_TYPE } from "../../../store/app/AppStore";
import { Shadow } from "react-native-shadow-2";
import { Dimensions } from "react-native";

export enum TOAST_POSITION {
  UNDER_TAB_BAR = "UNDER_TAB_BAR",
  BOTTOM = "BOTTOM",
  TOP = 'TOP'
}

export const AppToast = observer(() => {
  const view = useInstance(RootStore)
  return <Toast
    zIndex={2147483647}
    position={TOAST_POSITION.TOP === view.appStore.toast.position ? "top" : "bottom"}
    visible={view.appStore.toast.display}
    backgroundColor={Colors.transparent}
  >
    <View style={{ marginBottom: view.appStore.toast.position === TOAST_POSITION.UNDER_TAB_BAR ? 65 : 10 }}>
      <View marginH-16 flex center
      >
        <Shadow distance={8} radius={15} startColor={Colors.rgba(Colors.grey10, 0.1)}
          containerViewStyle={{ backgroundColor: Colors.white }}>
          <View row centerV flex padding-12 width={Dimensions.get("window").width - 32}>

            <Text marginL-8 robotoR> {view.appStore.toast.message} </Text>
          </View>
        </Shadow>
      </View>
    </View>
  </Toast>
})