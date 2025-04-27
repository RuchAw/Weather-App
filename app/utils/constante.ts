import { Dimensions, Platform } from "react-native";

export const isIOS = Platform.OS === "ios"

export const windowsHeight = Dimensions.get("window").height * (isIOS ? 0.96 : 1)

export const windowsWidth = Dimensions.get('window').width