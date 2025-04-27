import {logError} from "../api"
import {GeneralApiProblem} from "../api/apiProblem"
import {
    LoginResponseErrorInterface,
    LoginResponseInterface,
} from "./login.types"
import {FAKE_LOGIN_DATA} from "../../utils/loginHelpers/loginConsts";


// Authenticate function to login the user
export const Authenticate = async (identifier: string, password: string): Promise<LoginResponseInterface | LoginResponseErrorInterface | GeneralApiProblem | null> => {
    try {
        console.log(identifier, password)
        const response = FAKE_LOGIN_DATA

        // In case of wrong password
        if (response.data && "message" in response.data) {
            return response.data as LoginResponseErrorInterface
        }

        // If the response is ok
        if (response.data && "token" in response.data) {
            return response.data as LoginResponseInterface
        }

        return null
    } catch (e) {
        if (__DEV__) {
            logError(e)
        }
        return null
    }
}

