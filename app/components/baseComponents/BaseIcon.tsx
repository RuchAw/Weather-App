import { ComponentType } from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"

export type IconTypes = keyof typeof iconRegistry

interface IconProps extends TouchableOpacityProps {
  /**
   * The name of the icon
   */
  icon: IconTypes

  /**
   * An optional tint color for the icon
   */
  color?: string

  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number

  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: TouchableOpacityProps["onPress"]
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Icon.md)
 */
export function BaseIcon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps | any> = WrapperProps?.onPress
    ? TouchableOpacity
    : View

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image
        style={[
          $imageStyle,
          !!color && { tintColor: color },
          !!size && { width: size, height: size },
          $imageStyleOverride,
        ]}
        source={iconRegistry[icon]}
      />
    </Wrapper>
  )
}

export const iconRegistry = {
  back: require("../../../assets/icons/back.png"),
  bell: require("../../../assets/icons/bell.png"),
  caretLeft: require("../../../assets/icons/caretLeft.png"),
  caretRight: require("../../../assets/icons/caretRight.png"),
  check: require("../../../assets/icons/check.png"),
  clap: require("../../../assets/icons/clap.png"),
  community: require("../../../assets/icons/community.png"),
  components: require("../../../assets/icons/components.png"),
  debug: require("../../../assets/icons/debug.png"),
  github: require("../../../assets/icons/github.png"),
  heart: require("../../../assets/icons/heart.png"),
  hidden: require("../../../assets/icons/hidden.png"),
  ladybug: require("../../../assets/icons/ladybug.png"),
  lock: require("../../../assets/icons/lock.png"),
  menu: require("../../../assets/icons/menu.png"),
  more: require("../../../assets/icons/more.png"),
  pin: require("../../../assets/icons/pin.png"),
  podcast: require("../../../assets/icons/podcast.png"),
  settings: require("../../../assets/icons/settings.png"),
  slack: require("../../../assets/icons/slack.png"),
  view: require("../../../assets/icons/view.png"),
  x: require("../../../assets/icons/x.png"),
  phone: require("../../../assets/icons/phone.png"),
  lockKeyhole: require("../../../assets/icons/lock-keyhole.png"),
  bug: require("../../../assets/icons/bug.png"),
  depot: require("../../../assets/icons/depot.png"),
  arrow_down: require("../../../assets/icons/arrow_down.png"),
  vehicle: require("../../../assets/icons/bicycle.png"),
  cuve: require("../../../assets/icons/cuve.png"),
  cuve_level: require("../../../assets/icons/cuve_level.png"),
  signal: require("../../../assets/icons/signal.png"),
  signal_lost: require("../../../assets/icons/signal_lost.png"),
  hourglass: require("../../../assets/icons/hourglass.png"),
  message_check: require("../../../assets/icons/message_check.png"),
  swap: require("../../../assets/icons/swap.png"),
  power_off: require("../../../assets/icons/power_off.png"),
  gear: require("../../../assets/icons/gear.png"),
  logout: require("../../../assets/icons/logout.png"),
  forward: require("../../../assets/icons/forward.png"),
  eye: require("../../../assets/icons/eye.png"),
  remove: require("../../../assets/icons/remove.png"),
  close: require("../../../assets/icons/close.png"),
  search: require("../../../assets/icons/search_icon.png"),
  trash_bin: require("../../../assets/icons/trash_bin.png"),
  edit_pen: require("../../../assets/icons/edit_pen.png"),
  cancel: require("../../../assets/icons/cancel.png"),
  arrow_right: require("../../../assets/icons/arrow_right.png"),
  up: require("../../../assets/icons/up.png"),
  down: require("../../../assets/icons/down.png"),
}

const $imageStyle: ImageStyle = {
  resizeMode: "contain",
}
