import React from "react";
import { ActivityIndicator } from "react-native";
import { Colors, LoaderScreen, Text, View } from "react-native-ui-lib";
import { t } from "../../i18n";

export const Splash = ({ showLoader = false, text = "" }) => {
    return <View center flex>
        <View flex bottom>
            <View center>
                <ActivityIndicator size={"large"} color="blue" />

            </View>
            {showLoader && !text &&
                <LoaderScreen backgroundColor={Colors.white} messageStyle={{ color: Colors.textGrey }} />}

        </View>
        <View flex bottom paddingB-16>
            {showLoader && text &&
                <Text marginT-200 center textGrey numberOfLines={2}>{t("loadingText")}</Text>}
        </View>
    </View>

}
