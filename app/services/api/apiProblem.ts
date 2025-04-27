import { ApiResponse } from "apisauce"

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { message: "timeout"; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { message: "cannot-connect"; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { message: "server" }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { message: "unauthorized" }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { message: "forbidden" }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { message: "not-found" }
  /**
   * All other 4xx series errors.
   */
  | { message: "rejected" }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { message: "unknown"; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { message: "bad-data" }
  /**
   * Bad attempt to connect, using bad credentials
   */
  | { message: "bad-credentials" }

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | null {
  switch (response.problem) {
    case "CONNECTION_ERROR":
      return { message: "cannot-connect", temporary: true }
    case "NETWORK_ERROR":
      return { message: "cannot-connect", temporary: true }
    case "TIMEOUT_ERROR":
      return { message: "timeout", temporary: true }
    case "SERVER_ERROR":
      return { message: "server" }
    case "UNKNOWN_ERROR":
      return { message: "unknown", temporary: true }
    case "CLIENT_ERROR":
      switch (response.status) {
        case 401:
          return { message: "unauthorized" }
        case 403:
          return { message: "forbidden" }
        case 404:
          return { message: "not-found" }
        case 406:
          return { message: response.data.erreur }
        default:
          return { message: "rejected" }
      }
    case "CANCEL_ERROR":
      return null
  }

  return null
}
