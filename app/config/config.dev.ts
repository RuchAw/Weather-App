import { Platform } from "react-native"

/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */

const API_DEV_URL = Platform.OS === "ios" ? "http://localhost:80" : process.env.REACT_APP_API_URL

// console.log("process.env.REACT_APP_API_URL", process.env.REACT_APP_API_URL)

if (!process.env.REACT_APP_API_URL) {
  console.log("process.env.REACT_APP_API_URL", process.env.REACT_APP_API_URL)
  console.warn("API_URL not defined in .env, current URL : " + API_DEV_URL)
}

export default {
  API_URL: process.env.REACT_APP_API_URL ?? API_DEV_URL,
}
