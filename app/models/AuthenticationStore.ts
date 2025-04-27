import { Instance, SnapshotOut, flow, types } from "mobx-state-tree"
import { resetRoot } from "../navigators/navigationUtilities"
import { translate } from "../translations"
import { load, remove, save } from "../utils/storage"
import { api } from "../services/api"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    authToken: types.maybeNull(types.string),
    userName: types.maybeNull(types.string),
    authPassword: types.maybeNull(types.string),
    forgotPasswordMailOrNumber: types.maybe(types.string),
    forgotPasswordChaineEditable: true,
    attemptsLeft: types.maybeNull(types.number),
    forgotPasswordAttemptsLeft: types.maybeNull(types.number),
    supervisorCode: types.maybeNull(types.string),
    agencyNumber: types.maybeNull(types.string),
    isAdmin: types.maybeNull(types.string),
    agentFirstName: types.maybeNull(types.string),
    agentLastName: types.maybeNull(types.string),
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
    get userNameValidationError() {
      if (!store.userName) return translate("loginScreen.cantBeBlank")
      if (store.userName && store.userName.length < 6) return translate("loginScreen.leastCharacters")
      if (/@/.test(store.userName as string)) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.userName as string))
          return translate("loginScreen.validMail")
      }
      return ""
    },
    get authPasswordValidationError() {
      if (!store.authPassword) return translate("loginScreen.cantBeBlank")
      return ""
    },
  }))
  .actions((store) => ({
    setAuthToken(value: string | null) {
      store.authToken = value
    },
    setUserName(username: string) {
      store.userName = username.replace(/ /, "")
    },
    setAuthPassword(password: string) {
      store.authPassword = password
    },
    logout: flow(function* logout() {
      try {
        // Supprimer le token du stockage de l'appareil
        // ... yield can be used in async/await style
        yield remove('token')
        store.authToken = null
        store.userName = ""
        resetRoot({ index: 0, routes: [{ name: 'Login' }] })
      } catch (error) {
        console.log('Failed to logout', error)
      }
    }),
    storeAuthToken: flow(function* storeAuthToken(value: string) {
      try {
        // Set le token dans AuthenticationStore
        store.authToken = value
        // Sauvegarder le token dans le stockage de l'appareil
        yield save('token', value);
      } catch (error) {
        console.error("Failed to save token", error)
      }
    }),
    distributeAuthToken: flow(function* distributeAuthToken() {
      try {
        let token = ''
        // Vérifiez s'il existe déjà un token stocké dans AuthenticationStore, sinon récupérez les données du stockage de l'appareil.
        if (!store.authToken) {
          // Load le token depuis le stockage de l'appareil
          token = yield load('token');
        } else {
          // Obtenir le token du store
          token = store.authToken
        }
        // Set le token dans le header pour les requêtes qui nécessitent une authentification
        api.apisauce.setHeader("Authorization", `Bearer ${token}`);
      } catch (error) {
        console.error("Failed load token", error)
      }
    }),
    setForgotPasswordMailOrNumber(value: string | null) {
      if (!value) return
      store.forgotPasswordMailOrNumber = value.replace(/ /, "")
    },
    toggleForgotPasswordChaineEditable(value: boolean) {
      store.forgotPasswordChaineEditable = value
    },
    setAttemptsLeft(value: number) {
      store.attemptsLeft = value
    },
    setForgotPasswordLoginAttemptsLeft(value: number) {
      store.forgotPasswordAttemptsLeft = value
    },
    setAgencyNumber(value: string) {
      store.agencyNumber = value
    },
    setSupervisorCode(value: string) {
      store.supervisorCode = value
    },
    setUserRole(value: string) {
      store.isAdmin = value
    },
    setAgentFullName(firstName: string | null, lastName: string | null){
      store.agentFirstName = firstName
      store.agentLastName = lastName
    },
    // setUserPosition(coordinates: { latitude: string; longitude: string } | undefined){
    //   store.userPosition = coordinates ? { latitude: parseFloat(coordinates?.latitude), longitude: parseFloat(coordinates?.longitude) } : null;
    // }
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> { }
