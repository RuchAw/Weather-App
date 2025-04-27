import { GlobalToast } from "react-native-toast-notifications/lib/typescript/hook/provider"

declare global {
  let toast: typeof GlobalToast
}

export {}
