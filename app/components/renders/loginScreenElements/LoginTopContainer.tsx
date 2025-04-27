import { FC, memo } from "react"
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native"
import { windowsWidth } from "../../../utils/constante"

const weatherAppLogo = require("../../../../assets/images/weather_app_logo.png")

interface LoginTopContainerProps {
  containerStyle?: StyleProp<ViewStyle>
}

export const LoginTopContainer: FC<LoginTopContainerProps> = memo(function LoginTopContainer(props) {

  const { containerStyle } = props

  return (
    <View style={[$containerStyle, containerStyle]}>
      <Image style={$topLogo} source={weatherAppLogo} />
    </View>
  )
})

const $topLogo: ImageStyle = {
  resizeMode: "center",
  width: windowsWidth * 0.3,
  height: windowsWidth * 0.3
}

const $containerStyle: ViewStyle = {
  justifyContent: "center",
  alignItems: "center"
}