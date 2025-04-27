import {StyleProp, TextStyle, ViewStyle} from "react-native";
import {observer} from "mobx-react-lite";
import {BaseButton, BaseIcon, ButtonProps, IconTypes} from "../../baseComponents";
import {colors, spacing} from "../../../theme";
import {iconSize} from "../../../theme/iconSize";

export interface InteractionButtonProps extends ButtonProps {
    containerStyle?: StyleProp<ViewStyle>
    buttonIcon?: IconTypes
    buttonIconSize?: number
    buttonIconColor?: string
    backgroundColor?: string
    pressedColor?: string
    textColor?: string
    iconPosition?: "left" | "right"
}

const InteractionButton = observer(function InteractionButton(props: InteractionButtonProps) {

    const {
        containerStyle: containerStyleOverride,
        buttonIcon = "settings",
        buttonIconSize = iconSize.md,
        buttonIconColor = colors.weatherAppPalette.primaryFoundersarmColor,
        backgroundColor = colors.weatherAppPalette.secondaryFoundersarmColor,
        pressedColor = colors.weatherAppPalette.secondaryFoundersarmColor + "33",
        textColor = colors.weatherAppPalette.primaryFoundersarmColor,
        iconPosition = "left"
    } = props

    const $buttonBackgroundColor: ViewStyle = {
        backgroundColor: backgroundColor
    }

    const $pressedStyle: ViewStyle = {
        backgroundColor: pressedColor
    }

    const $textStyle: TextStyle = {
        color: textColor
    }

    const Accessory = () => {

        const dynamicMargin: ViewStyle = {
            marginRight: iconPosition === "left" ? spacing.xs : undefined,
            marginLeft: iconPosition === "left" ? undefined : spacing.xs,
        }
        return (
            <BaseIcon
                icon={buttonIcon as IconTypes}
                color={buttonIconColor}
                size={buttonIconSize}
                containerStyle={dynamicMargin}
            />
        )
    }

    return (
        <BaseButton
            style={[$buttonContainer, $buttonBackgroundColor, containerStyleOverride]}
            pressedStyle={[$pressedStyle, props.pressedStyle]}
            textStyle={[$textStyle, props.textStyle]}
            LeftAccessory={iconPosition === "left" ? Accessory : undefined}
            RightAccessory={iconPosition === "right" ? Accessory : undefined}
            {...props}
        />
    )

})

const $buttonContainer: ViewStyle = {
    borderRadius: spacing.xs,
    height: spacing.sxxl,
}

export default InteractionButton
