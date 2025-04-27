import { useCallback, useEffect } from "react"
import EventEmitter from "./EventEmitter"
import { useFocusEffect } from "@react-navigation/native"

function useEventListener<T extends (...params: any) => void>(event: string, listener: T, deps: ReadonlyArray<any>, persist = false) {
  useFocusEffect(
    useCallback(() => {
      EventEmitter.addListener(event, listener)
      return () => {
        EventEmitter.removeListener(event, listener)
      }
    }, deps),
  )

  if (persist) {
    useEffect(() => {
      EventEmitter.addListener(event, listener)
      return () => {
        EventEmitter.removeListener(event, listener)
      }
    }, deps)
  }
}

export function makeEventNotifier<P>(name: string) {
  return {
    name,
    notify: (param: P) => {
      EventEmitter.notify(name, param)
    },
    useEventListener: (listener: (param: P) => void, deps: ReadonlyArray<any>, persist = false) =>
      useEventListener(name, listener, deps, persist),
  }
}