import React, { useCallback, useEffect, useRef, useState } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import BackgroundTimer from 'react-native-background-timer'
import { BaseText, TextProps } from "../../baseComponents"
import { useFocusEffect } from "@react-navigation/native"

const padZero = (num: number) => (num < 10 ? `0${num}` : num)

export const formatClock = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  return `${padZero(hrs)}:${padZero(mins)}:${padZero(secs)}`
};

interface BackGroundTimerProps extends Pick<TextProps, "preset"> {
  /**
   * Optional start time in seconds
   */
  startTime?: number
  /**
   * to apply style to the container
   */
  style?: StyleProp<ViewStyle>
  /**
   * textStyle
   */
  textStyle?: StyleProp<TextStyle>
}

const BackGroundTimer = (props: BackGroundTimerProps) => {

  const {
    startTime,
    style
  } = props

  useEffect(() => {
    setSeconds(startTime ?? 0) // Reset the timer when refreshKey or startTime changes
  }, [startTime])

  const [seconds, setSeconds] = useState(startTime ?? 0)

  useFocusEffect(
    useCallback(() => {
      // Start the timer
      BackgroundTimer.runBackgroundTimer(() => {
        setSeconds((prev) => {
          if (prev >= 86399) {
            return 0
          }
          return prev + 1
        })
      }, 1000)

      return () => {
        // Clear the timer
        BackgroundTimer.stopBackgroundTimer()
      }
    }, []),
  )

  return (
    <View style={[$container, style]}>
      <BaseText preset={props.preset} style={[$timerText, props.textStyle]}>{formatClock(seconds)}</BaseText>
    </View>
  );
};

const $container: ViewStyle = {
  // Your styles here
};

const $timerText: TextStyle = {
  // Your styles here
};

export default BackGroundTimer
