import {TextStyle, ViewStyle} from "react-native";
import {observer} from "mobx-react-lite";
import {BaseIcon, BaseTextField, IconTypes, TextFieldProps} from "../../baseComponents";
import {colors, spacing} from "../../../theme";
import {iconSize} from "../../../theme/iconSize";

export interface ImportantTextFieldProps extends TextFieldProps {
    important?: boolean
    icon?: IconTypes
}

const ImportantTextField = observer(function ImportantTextField(props: ImportantTextFieldProps) {

    const {
        label,
        important= false,
        icon,
        multiline,
        onChangeText,
        placeholder,
        value,
        keyboardType,
        inputWrapperStyle
    } = props

    const shownLabel = important ? `${label} *` : label

    const RightAccessory = ()=> {
        if (!icon) return
        return (
            <BaseIcon
                icon={icon as IconTypes}
                color={colors.weatherAppPalette.primaryFoundersarmColor}
                size={iconSize.lg}
                containerStyle={$iconContainerStyle}
            />
        )
    }

    return (
        <BaseTextField
            inputWrapperStyle={[$inputWrapperStyle, multiline && $multilineStyle, inputWrapperStyle]}
            LabelTextProps={
                {
                    style: $labelTextStyle,
                    size: "lg"
                }
            }
            label={shownLabel}
            RightAccessory={RightAccessory}
            multiline={multiline}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.weatherAppPalette.placeHolderTextCouleur}
            keyboardType={keyboardType}
            value={value}
        />
    )

})

const $inputWrapperStyle: ViewStyle = {
    borderRadius: spacing.xxs,
    alignItems: "center"
}

const $labelTextStyle: TextStyle = {
    fontWeight: "bold",
    color: colors.weatherAppPalette.primaryFoundersarmColor
}

const $iconContainerStyle: ViewStyle = {
    marginRight: spacing.xs
}

const $multilineStyle: ViewStyle = {
    minHeight: spacing.xl * 2,
}

export default ImportantTextField
