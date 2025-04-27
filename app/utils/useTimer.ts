import { useState, useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import BackgroundTimer from "react-native-background-timer"

/**
 * Custom Hook returning the timer
 *
 * @returns elapsedSeconds
 */
const useTimer = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setElapsedSeconds(0)

      BackgroundTimer.runBackgroundTimer(() => {
        setElapsedSeconds((previousState) => previousState + 1)
      }, 1000)

      // Cleanup function to clear the interval
      return () => {
        BackgroundTimer.stopBackgroundTimer()
      }
    }, []),
  )

  return elapsedSeconds;
};

export default useTimer
