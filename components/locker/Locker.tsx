import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { Screen } from "../screen/screen"
import { Colors, LoaderScreen, Text, TouchableOpacity, View } from "react-native-ui-lib"
import { provider, useInstance } from "react-ioc"
import { LockerViewModel } from "./LockerViewModel"
import Ripple from "react-native-material-ripple"
import { t } from "../../i18n"
import { LOCKER_MODE } from "../../store/app/AppStore"
import * as Animatable from "react-native-animatable"
import { LockerDot } from "./LockerDot";
import { toLowerCase } from "../../utils/general";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

// export interface LockerProps {
//   mode: "set|check";
//   pin?: number;
// }

const L = observer(function (props) {

  const view = useInstance(LockerViewModel)

  useEffect(() => {
    view.init()
  }, [])

  return <Screen testID={'lockerScreen'} backgroundColor={Colors.white} statusBarBg={Colors.white}>
    <Animatable.View animation={"fadeIn"} style={{ height: "100%" }}>
      {view.initialized &&
        <View flex-1>
          {
            !props.nogoBack &&
            <TouchableOpacity testID={'backBtn'} row padding-16 paddingT-25 onPress={props.goBack}>
              <SimpleLineIcons name={"arrow-left"} size={18} />
            </TouchableOpacity>
          }
          <View flex bottom center />
          {!view.message &&
            <View flex-1 center>
              <View row flex bottom>
                {view.mode === LOCKER_MODE.CHECK &&
                  <Text robotoM text16 black>{
                    t("lockerScreen.pinFormLoginAction", {
                      p: view.isChangingPin ? `${toLowerCase(t("common.current"))} ` : ""
                    })
                  }</Text>
                }
                {view.mode === LOCKER_MODE.SET && view.step === 0 &&
                  <Text robotoM text16 black>{
                    t("lockerScreen.pinFormRegisterAction", {
                      p: view.isChangingPin ? `${toLowerCase(t("common.new"))} ` : ""
                    })
                  }</Text>
                }
                {view.mode === LOCKER_MODE.SET && view.step === 1 &&
                  <Text robotoM text16 black>{
                    t("lockerScreen.pinFormConfirmationAction", {
                      p: view.isChangingPin ? `${toLowerCase(t("common.new"))} ` : ""
                    })
                  }</Text>
                }
              </View>
              <View row flex paddingT-16>
                {view.mode === LOCKER_MODE.CHECK && view.isChangingPin && view.step === 0 &&
                  <Text robotoR marginH-80 center
                    textGrey>{t("lockerScreen.pinFormChangeActionDescription")}</Text>}
                {/* {view.mode === LOCKER_MODE.SET && view.step === 0 &&
                  <Text robotoR marginH-80 center
                    textGrey>{t("lockerScreen.pinFormRegisterActionDescription")}</Text>} */}
                {/* {view.mode === LOCKER_MODE.SET && view.step === 1 &&
                  <Text robotoR marginH-80 center
                    textGrey>{t("lockerScreen.pinFormConfirmationActionDescription")}</Text>} */}
              </View>
            </View>
          }
          {!!view.message &&
            <View flex-1 center paddingB-10>
              <View row flex center>
                <Text robotoM text16 black>{view.message}</Text>
              </View>
            </View>
          }
          <View row flex center>
            <LockerDot
              bgColor={view.pin.length > 0 ? Colors.primary : Colors.grey} />
            <LockerDot
              bgColor={view.pin.length > 1 ? Colors.primary : Colors.grey} />
            <LockerDot
              bgColor={view.pin.length > 2 ? Colors.primary : Colors.grey} />
            <LockerDot
              bgColor={view.pin.length > 3 ? Colors.primary : Colors.grey} />
          </View>
          <View flex-4 marginB-20 bottom>
            {
              [1, 2, 3].map(col =>
                <View row center height={70} key={`col${col}`}>
                  {
                    [1, 2, 3].map(row =>
                      <View key={`row${row}`} margin-5 center row>
                        <Ripple
                          testID={`lockerBtn-${(col - 1) * 3 + row}`}
                          disabled={view.disabled} rippleColor={"rgb(0, 0, 102)"}
                          onPress={() => view.handleClick(`${(col - 1) * 3 + row}`)}>
                          <View padding-10 width={80} center
                            style={{ borderRadius: 40 }}>
                            <Text robotoR text30 black>
                              {`${(col - 1) * 3 + row}`}
                            </Text>
                          </View>
                        </Ripple>
                      </View>
                    )
                  }
                </View>
              )
            }
            <View row center height={70}>
              <View margin-5 center row>
                <Ripple
                  testID={'lockerBtn-finger'}
                  rippleColor={"rgb(0, 0, 102)"} onPress={view.checkBio}>
                  <View padding-10 flex width={80} center style={{ borderRadius: 40 }}>
                    
                  </View>
                </Ripple>
              </View>
              <View margin-5 center row>
                <Ripple testID={'lockerBtn-0'} onPress={() => view.handleClick("0")} rippleColor={"rgb(0, 0, 102)"}>
                  <View padding-10 flex width={80} center style={{ borderRadius: 40 }}>
                    <Text robotoR text30>
                      0
                    </Text>
                  </View>
                </Ripple>
              </View>
              <View margin-5 center row>
                <Ripple testID={'lockerBtn-delete'} rippleColor={"rgb(0, 0, 102)"} onPress={view.removeDigit}>
                  <View padding-10 flex width={80} center style={{ borderRadius: 40 }}>
                    <Ionicons name={"ios-backspace-outline"} size={22} color={Colors.black} />
                  </View>
                </Ripple>
              </View>
            </View>
          </View>
        </View>}
      {!view.initialized && <LoaderScreen />}
    </Animatable.View>
  </Screen>
})

export const Locker = provider()(L)
Locker.register(LockerViewModel)
