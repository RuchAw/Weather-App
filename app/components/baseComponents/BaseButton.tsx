import { ComponentType } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native"
import { colors, spacing, typography } from "../../theme"
import { BaseText, TextProps } from "./BaseText"
import { fontSize } from "../../theme/fontSize"
import { componentSize } from "../../theme/componentsSize"

type Presets = keyof typeof $viewPresets

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
}

export interface ButtonProps extends PressableProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TextProps["tx"]
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TextProps["txOptions"]
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * Disabled backgroundColor optional (default grey)
   */
  disabledBgColor?: string
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Button.md)
 */
export function BaseButton(props: ButtonProps) {
  const {
    tx,
    text,
    txOptions,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    children,
    RightAccessory,
    LeftAccessory,
    disabledBgColor = colors.weatherAppPalette.disabledButtonBgCouleur,
    ...rest
  } = props

  const preset: Presets = $viewPresets[props.preset as string] ? props.preset as Presets : "default"
  function $viewStyle({ pressed }) {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      props.disabled && { opacity : 0.8, backgroundColor: disabledBgColor },
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
    ]
  }
  function $textStyle({ pressed }) {
    return [
      $textPresets[preset],
      $textStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
    ]
  }

  return (
    <Pressable style={$viewStyle} accessibilityRole="button" {...rest}>
      {(state) => (
        <>
          {!!LeftAccessory && <LeftAccessory style={$leftAccessoryStyle} pressableState={state} />}

          <BaseText tx={tx} text={text} txOptions={txOptions} style={$textStyle(state)}>
            {children}
          </BaseText>

          {!!RightAccessory && (
            <RightAccessory style={$rightAccessoryStyle} pressableState={state} />
          )}
        </>
      )}
    </Pressable>
  )
}

const $baseViewStyle: ViewStyle = {
  minHeight: componentSize.mxxl,
  borderRadius: spacing.ds,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  // paddingVertical: spacing.sm,
  paddingHorizontal: spacing.ds,
  overflow: "hidden",
}

const $baseTextStyle: TextStyle = {
  fontSize: fontSize.sm,
  lineHeight: spacing.df,
  fontFamily: typography.primary.medium,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
}

const $rightAccessoryStyle: ViewStyle = { marginStart: spacing.xs, zIndex: 1 }
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.xs, zIndex: 1 }

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colors.palette.neutral400,
      backgroundColor: colors.palette.neutral100,
    },
  ] as StyleProp<ViewStyle>,

  filled: [$baseViewStyle, { backgroundColor: colors.palette.neutral300 }] as StyleProp<ViewStyle>,

  reversed: [
    $baseViewStyle,
    { backgroundColor: colors.palette.neutral800 },
  ] as StyleProp<ViewStyle>,

  primary: [
    $baseViewStyle,
    {
      backgroundColor: colors.weatherAppPalette.primaryBtnBgCouleur,
    },
  ] as StyleProp<ViewStyle>,

  secondary: [
    $baseViewStyle,
    {
      backgroundColor: colors.weatherAppPalette.secondaryBtnBgCouleur,
    },
  ] as StyleProp<ViewStyle>,
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: $baseTextStyle,
  filled: $baseTextStyle,
  reversed: [$baseTextStyle, { color: colors.palette.neutral100 }],
  primary: [
    $baseTextStyle,
    {
      fontSize: fontSize.sm,
      fontFamily: typography.primary.bold,
      color: "white",
    },
  ],
  secondary: [
    $baseTextStyle,
    {
      fontSize: fontSize.xs,
      fontFamily: typography.primary.bold,
      color: "white",
    },
  ],
}

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { backgroundColor: colors.palette.neutral200 },
  filled: { backgroundColor: colors.palette.neutral400 },
  reversed: { backgroundColor: colors.palette.neutral700 },
  primary: { backgroundColor: colors.weatherAppPalette.primaryBtnBgColorPressed },
  secondary: { backgroundColor: colors.weatherAppPalette.secondaryBtnBgCouleurPressed },
}

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: { opacity: 0.9 },
  filled: { opacity: 0.9 },
  reversed: { opacity: 0.9 },
  primary: { opacity: 0.9 },
  secondary: { opacity: 0.9 },
}
