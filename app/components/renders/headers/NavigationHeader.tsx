import {useNavigation} from "@react-navigation/native"
import React, {ReactElement} from "react"
import {Pressable, ViewStyle} from "react-native"
import {BaseHeader, BaseIcon, BaseText, HeaderProps} from "../../baseComponents"
import {TxKeyPath} from "../../../translations"
import {iconSize} from "../../../theme/iconSize"
import {colors, spacing} from "../../../theme"
import {componentSize} from "../../../theme/componentsSize"

export interface NavigationHeaderProps extends HeaderProps {
    /**
     * Texte du titre recherché via i18n. le texte à afficher avec la fleche du retour
     */
    backSlug?: TxKeyPath
    /**
     * Le component Right à afficher sur le côté droit du Header
     */
    RightActionComponent?: ReactElement
}

const NavigationHeader = (props: NavigationHeaderProps) => {
    const navigation = useNavigation()
    const HeaderLeft = () => {
        return (
            <Pressable onPress={() => navigation.goBack()} style={$goBackText}>
                <BaseIcon
                    icon="back"
                    color={colors.weatherAppPalette.primaryIconColor}
                    size={iconSize.df}
                    containerStyle={{marginRight: spacing.xs}}
                />
                <BaseText
                    preset="headerBackText"
                    style={{color: colors.weatherAppPalette.primaryIconColor}}
                    tx={props.backSlug}
                />
            </Pressable>
        )
    }

    return (
        <BaseHeader
            containerStyle={{backgroundColor: colors.weatherAppPalette.primaryBgCouleur}}
            style={$headerStyle}
            LeftActionComponent={props.backSlug && HeaderLeft()}
            RightActionComponent={props.RightActionComponent}
        />
    )
}

export default NavigationHeader

const $headerStyle: ViewStyle = {
    marginHorizontal: spacing.df,
    height: componentSize.mxxl,
}

const $goBackText: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
}
