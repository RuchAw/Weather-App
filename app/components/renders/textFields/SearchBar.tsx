import {ActivityIndicator, StyleProp, TextStyle, View, ViewStyle} from "react-native";
import {observer} from "mobx-react-lite";
import {colors, spacing} from "../../../theme";
import {BaseIcon, BaseTextField, TextFieldProps} from "../../baseComponents";
import {fontSize} from "../../../theme/fontSize";
import {iconSize} from "../../../theme/iconSize";
import {TxKeyPath} from "../../../translations";

export interface SearchBarProps extends Omit<TextFieldProps, "RightAccessory">{
    loading?: boolean
}

const SearchBar = observer(function SearchBar(props: SearchBarProps) {

    const {
        placeholderTx= "homeScreen.search",
        inputWrapperStyle,
        loading,
        style,
        ...remainingProps
    } = props

    const renderSearchIcon = ()=>{
        if (loading) return <ActivityIndicator color={colors.weatherAppPalette.primaryBtnBgColorPressed} size="small" />

        return (
            <BaseIcon
                icon="search"
                size={iconSize.md}
                color="grey"
                containerStyle={$searchIconContainer}
            />
        )
    }

    return (
        <BaseTextField
            inputWrapperStyle={[$wrapper, inputWrapperStyle]}
            style={[$textStyle, style]}
            RightAccessory={renderSearchIcon}
            placeholderTx={placeholderTx}
            placeholderTextColor="grey"
            {...remainingProps}
        />
    )

})

const $wrapper: ViewStyle = {
    borderWidth: 0.8,
    borderColor: colors.weatherAppPalette.searchBarBorderColor,
    borderRadius: spacing.xxs,
    height: spacing.sxl,
    paddingHorizontal: spacing.ds,
    alignItems: "center",
    backgroundColor: "white"
}

const $textStyle: TextStyle = {
    fontSize: fontSize.xs,
    lineHeight: fontSize.xs,
    marginVertical: undefined,
    height: undefined,
    marginHorizontal: undefined,
    color: colors.textDim
}

const $searchIconContainer: ViewStyle = {
    marginRight: spacing.ds
}

export default SearchBar
