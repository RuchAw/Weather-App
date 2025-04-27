import {Pressable, StyleProp, SwitchProps, TextStyle, View, ViewStyle} from "react-native";
import {observer} from "mobx-react-lite";
import {BaseIcon, BaseText, IconTypes, TextFieldProps} from "../../baseComponents";
import {iconSize} from "../../../theme/iconSize";
import {spacing} from "../../../theme";
import {componentSize} from "../../../theme/componentsSize";

export interface RadioButtonColoredWithIconProps extends Pick<TextFieldProps, "labelTx" | "labelTxOptions" | "containerStyle"> {
    /**
     * An optional style for text that override the actual label style
     */
    style?: StyleProp<TextStyle>
    /**
     * Label to provide to the radio button
     */
    label?: string
    /**
     * Color for the  radio button [text, border, backgroundColor]
     */
    color?: string
    /**
     * The value of the field. If true the component will be turned on.
     */
    value?: boolean
    /**
     * Invoked with the new value when the value changes.
     */
    onValueChange?: SwitchProps["onValueChange"]
    /**
     * Icon to be in the right of the component
     */
    rightIcon?: IconTypes
    /**
     * Disable the radio button
     */
    disabled?: boolean
}

const RadioButtonColoredWithIcon = observer(function RadioButtonColoredWithIcon(props: RadioButtonColoredWithIconProps) {

    const {
        label,
        color,
        labelTx,
        labelTxOptions,
        containerStyle: containerStyleOverride,
        style: textStyleOverride,
        value,
        onValueChange,
        rightIcon,
        disabled
    } = props

    const handlePress = () => {
        onValueChange?.(!value)
    }

    const containerStyle = {
        borderColor: color,
        backgroundColor: value ? color : "transparent",
    }

    const textStyle = {
        color: value ? "white" : color,
    }

    return (
        <Pressable onPress={handlePress} disabled={disabled} style={[$container, containerStyleOverride, containerStyle]}>
            <View style={$row}>
                <BaseText
                    preset="smallBoldText"
                    style={[$label, textStyle, textStyleOverride]}
                    tx={labelTx}
                    txOptions={labelTxOptions}
                    text={label}
                />
                <BaseIcon
                    icon={rightIcon as IconTypes}
                    color={value ? "white" : color}
                    size={iconSize.lg}
                    containerStyle={{marginLeft: spacing.xxs}}
                />
            </View>
        </Pressable>
    )

})

const $container: ViewStyle = {
    borderWidth: 2,
    borderRadius: spacing.ds,
    height: componentSize.sxxl,
    justifyContent: "center",
    // minWidth: componentSize.xwl,
    paddingHorizontal: spacing.ds,
    alignItems: "center"
}

const $row: ViewStyle = {
    flexDirection: "row",
    alignItems: "center"
}

const $label: TextStyle = {
    textAlign: "center",
}
export default RadioButtonColoredWithIcon
