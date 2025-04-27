/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import type {
  ApiConfig,
} from "./api.types"
import { getTimeZone } from "react-native-localize"

import { fetch } from "@react-native-community/netinfo"
import {
  ACCES_CODES,
  code_http_block_app,
  code_http_login_redirect, code_http_unauthorised,
} from "../../utils/ErrorCodeStatus"
import { resetRoot } from "../../navigators/navigationUtilities"
import { remove, save } from "../../utils/storage"
import { windowsHeight, windowsWidth } from "../../utils/constante"
import { APP_NAME, APP_VERSION } from "../routeConstants"
import { translate } from "../../translations"


/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 30 * 1000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {

    const controller = new AbortController()


    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "App-Version": APP_VERSION,
        "App-Name": APP_NAME,
        "App-Timezone": getTimeZone(),
        "Env-App": ENV,
        "Mobile-Height": windowsHeight,
        "Mobile-Width": windowsWidth,
      },
    })

    this.apisauce.axiosInstance.interceptors.request.use(
      async (configuration) => {
        const netInfoState = await fetch()
        // Check network state
        if (netInfoState.isConnected) {
          console.log(
            configuration.baseURL,
            configuration.url,
            configuration.headers,
            configuration.data,
            "axionConfig request",
          )
        } else {
          const isConnectedPrompt = translate("common.makeSureYouAreOnAnActiveNetwork")
          toast.show(isConnectedPrompt, {
            type: "danger",
            duration: 5000,
            placement: "top",
            animationType: "zoom-in",
          })
          controller.abort()
        }
        return configuration
      },
      (error) => {
        console.error(error)
        showErrorToast(error)
        return Promise.reject(error)
      })

    this.apisauce.axiosInstance.interceptors.response.use(
      (response) => {
        try {
          return response
        } catch (error) {
          console.error(error)
          return response
        }
      },
      (error) => {
        console.error(
          error.response?.data?.erreur ??
          error.response?.data ??
          error.response ??
          error,
        )
        try {
          if (ACCES_CODES.includes(error.response.status)) {
            switch (error.response.status) {
              // eslint-disable-next-line camelcase
              case code_http_unauthorised: {
                logout()
                const sessionExpired = "Session expirée"

                toast.show(sessionExpired, {
                  type: "warning",
                  duration: 5000,
                  placement: "top",
                  animationType: "zoom-in",
                })

                resetRoot({ index: 0, routes: [{ name: 'Login' }] })
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                return new Promise(() => {});
              }
              default:
                break
            }
          }
          return Promise.reject(error)
        } catch (catchError) {
          console.error("catch Error", catchError)
          return Promise.reject(error)
        }

      },
    )
  }

}

const ENV = process.env.NODE_ENV ?? "production"

const showErrorToast = (error) => {
  ENV === "production"
    ? toast.show(
      error.response.data?.erreur ??
      "Erreur " +
      error.response.status +
      " veuillez contacter le support HOP",
      {
        type: "erreur",
      },
    )
    : toast.show(
      error.response.data?.erreur ??
      "Erreur " +
      error.response?.status +
      " Message : " +
      error.response?.erreur ??
      error.response?.warning ??
      error.response?._response,
      {
        type: "erreur",
        duration: 99999,
      },
    )
}

const logout = async ()=>{
  try {
    await remove('token')
  } catch (error) {
    console.log('Failed to logout', error)
  }
}

export const logError = (e: unknown) => {
  if (e instanceof Error) {
    console.tron.error?.(`Bad data: ${e.message}\n`, e.stack)
    console.log("error", `Bad data: ${e.message}\n`);
  } else {
    console.log("error", "An unknown error occurred");
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
