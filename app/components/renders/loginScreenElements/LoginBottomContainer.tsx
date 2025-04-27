import { FC, memo } from "react"
import {Linking, TextStyle, View, ViewStyle} from "react-native"
import {BaseText} from "../../baseComponents";
import {colors} from "../../../theme";

interface LoginBottomContainerProps {
  agencyNumber: string | null
}

export const LoginBottomContainer: FC<LoginBottomContainerProps>  = memo(function LoginBottomContainer(props){

  const navigateToWebsite = ()=> {
    const url = 'https://foundersarm.com/';
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  }

  return(
    <View style={$bottomContainer}>
      <BaseText text={"www.foundersarm.com"} style={$textColor} preset="bold" onPress={navigateToWebsite}/>
    </View>
  )
})

const $bottomContainer: ViewStyle = {
  position: "absolute",
  flexDirection: "row",
  bottom: 24,
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center"
}

const $textColor: TextStyle = {
  color: colors.weatherAppPalette.secondaryFoundersarmColor
}