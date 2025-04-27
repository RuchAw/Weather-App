import React, { useState } from "react"
import { View, ViewStyle } from "react-native"
import { BaseIcon, BaseText, BaseToggleProps } from "../../baseComponents"
import { colors } from "../../../theme"

interface CheckListItemProps
  extends Pick<BaseToggleProps, "value" | "label" | "labelTx" | "labelTxOptions"> {
  /**
   * Style of the container to adjust marging for example
   */
  containerStyle?: ViewStyle
  /**
   * Size of the icons
   */
  size?: number
  /**
   * A boolean to determine if this invalid status means its blocking (changes the color of invalid state from orange to red)
   */
  isblocking?: boolean
  /**
   * A function to handle state change
   */
  onChange?(isValid: boolean, isInvalid: boolean, isBlocking?: boolean): void
}

const CheckListItem = (props: CheckListItemProps) => {
  const {
    label,
    labelTx,
    labelTxOptions,
    size = 42,
    containerStyle: containerStyleOverride,
    isblocking,
    onChange,
  } = props

  const [isValid, setValid] = useState(false)
  const [isInvalid, setInvalid] = useState(false)

  const handleValidPress = () => {
    setValid(!isValid)
    setInvalid(false)
    // Call the callback to update the parent component's state
    onChange?.(!isValid, false, isblocking)
  }

  const handleInvalidPress = () => {
    setInvalid(!isInvalid)
    setValid(false)
    // Call the callback to update the parent component's state
    onChange?.(false, !isInvalid, isblocking)
  }

  return (
    <View style={[$container, containerStyleOverride]}>
      <View style={$labelContainer}>
        <BaseText text={label} tx={labelTx} txOptions={labelTxOptions} />
      </View>
      <View style={$checkBoxContainer}>
        <BaseIcon
          icon="circle_check"
          color={
            isValid ? colors.weatherAppPalette.primaryBtnBgCouleur : colors.weatherAppPalette.inactiveBgColor
          }
          size={size}
          activeOpacity={1}
          onPress={handleValidPress}
        />
        <BaseIcon
          icon="circle_x"
          color={
            isInvalid
              ? isblocking
                ? colors.weatherAppPalette.secondaryRadioButtonColor
                : colors.weatherAppPalette.warningBgColor
              : colors.weatherAppPalette.inactiveBgColor
          }
          size={size}
          activeOpacity={1}
          onPress={handleInvalidPress}
        />
      </View>
    </View>
  )
}

export default CheckListItem

const $container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $labelContainer: ViewStyle = {
  flex: 3,
}

const $checkBoxContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between",
}
