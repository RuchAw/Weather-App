import { TextStyle, ViewStyle } from "react-native"
import { FC } from "react"
import { colors, spacing } from "../../../theme"
import { fontSize } from "../../../theme/fontSize"
import { BaseToggle, BaseToggleProps } from "../../baseComponents"

interface CustomCheckBoxProps extends Omit<BaseToggleProps, "variant"> {
}

export const CustomCheckBox: FC<CustomCheckBoxProps> = (props:CustomCheckBoxProps)=> {

  return(
    <BaseToggle
      labelStyle={$labelStyle}
      inputDetailStyle={$inputDetailStyle}
      inputOuterStyle={$inputOuterStyle}
      inputInnerStyle={$inputInnerStyle}
      {...props}
    />
  )
}

const $labelStyle: TextStyle = {
  marginStart: spacing.ds,
  fontSize: fontSize.sm,
  color: colors.weatherAppPalette.primaryTitlesColor
}

const $inputDetailStyle: ViewStyle = {
  backgroundColor: colors.weatherAppPalette.primaryFoundersarmColor,
  borderRadius: 2.4
}

const $inputOuterStyle: ViewStyle = {
  borderColor: colors.weatherAppPalette.primaryBorderCouleur,
  backgroundColor: colors.weatherAppPalette.primatyTextInputBgCouleur
}

const $inputInnerStyle: ViewStyle = {
  backgroundColor: colors.weatherAppPalette.primaryBgCouleur
}
