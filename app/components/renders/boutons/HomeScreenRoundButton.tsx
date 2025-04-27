import {Pressable, PressableProps, StyleProp, TextStyle, View, ViewStyle} from "react-native";
import {BaseIcon, BaseText, IconTypes} from "../../baseComponents";
import {translate, TxKeyPath} from "../../../translations";
import {FC} from "react";
import {colors, spacing} from "../../../theme";
import {iconSize} from "../../../theme/iconSize";
import {fontSize} from "../../../theme/fontSize";

interface HomeScreenRoundButtonProps extends Pick<PressableProps, "onPress"> {
    containerStyle?: StyleProp<ViewStyle>
    tintColor?: string,
    icon: IconTypes,
    title?: string,
    titleTx?: TxKeyPath
}

const HomeScreenRoundButton: FC<HomeScreenRoundButtonProps> = (props) => {

    const {
        containerStyle,
        title,
        titleTx,
        tintColor = colors.weatherAppPalette.primaryIconColor,
        icon,
        onPress
    } = props

    const titleColor: TextStyle = {
        color: tintColor
    }

    const titleToUppercase = title?.toUpperCase()
    const titleTranslation = translate(titleTx as TxKeyPath)
    const titleTranslationToUppercase = titleTranslation?.toUpperCase()

    const titleToShow = title ? titleToUppercase : titleTranslationToUppercase

    return (
        <Pressable style={[$container, containerStyle]} onPress={onPress}>
            <View style={$iconContainer}>
                <BaseIcon icon={icon} size={iconSize.sxxxl} color={tintColor}/>
            </View>
            <View style={$marginBottom}/>
            <View style={$buttonTitleContainer}>
                <BaseText
                    preset="mediumText"
                    style={[$buttonTitleText, titleColor]}
                    text={titleToShow}
                />
            </View>
        </Pressable>
    )
}

const $container: ViewStyle = {
    alignItems: "center"
}

const $iconContainer: ViewStyle = {
    width: spacing.homeIconContainer,
    height: spacing.homeIconContainer,
    borderRadius: spacing.homeIconContainer / 2,
    backgroundColor: colors.weatherAppPalette.secondaryFoundersarmColor,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4
}

const $buttonTitleContainer: ViewStyle = {
    width: spacing.homeButtonTitleContainer,
    height: spacing.sxxl,
    borderRadius: spacing.ds,
    backgroundColor: colors.weatherAppPalette.secondaryFoundersarmColor,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4
}

const $buttonTitleText: TextStyle = {
    color: colors.weatherAppPalette.primaryTitlesColor,
    fontSize: fontSize.xs
}

const $marginBottom: ViewStyle = {
    marginBottom: spacing.xsm
}

export default HomeScreenRoundButton