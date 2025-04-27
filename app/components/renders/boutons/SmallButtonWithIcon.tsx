import {StyleProp, ViewStyle} from "react-native";
import {observer} from "mobx-react-lite";
import InteractionButton, {InteractionButtonProps} from "../boutons/InteractionButton";
import {colors, spacing} from "../../../theme";
import {fontSize} from "../../../theme/fontSize";
import {iconSize} from "../../../theme/iconSize";

export interface SmallButtonWithIconProps extends InteractionButtonProps {
    containerStyle?: StyleProp<ViewStyle>
    backgroundColor?: string
    textColor?: string
    buttonPressedColor?: string
}

const SmallButtonWithIcon = observer(function SmallButtonWithIcon(props: SmallButtonWithIconProps) {

    const {
        containerStyle: containerStyleOverride,
        backgroundColor = colors.weatherAppPalette.secondaryFoundersarmColor,
        textColor = colors.weatherAppPalette.primaryFoundersarmColor,
        buttonPressedColor = colors.weatherAppPalette.secondaryFoundersarmColor + "22"
    } = props

    return (
        <InteractionButton
            containerStyle={[$button, containerStyleOverride]}
            style={[$button, { backgroundColor: backgroundColor }]}
            textStyle={{ color: textColor, fontSize: fontSize.xs}}
            pressedStyle={{ backgroundColor: buttonPressedColor }}
            buttonIconSize={iconSize.xsm}
            {...props}
        />
    )

})

const $button: ViewStyle = {
    minHeight: spacing.sxl,
    borderRadius: spacing.xxs
}

export default SmallButtonWithIcon