export type loginParameters = {
  config: {
    agence_cle: string
  },
  device: {
    mac_address: string,
    latitude?: number,
    longitude?: number
  }
}

export interface LoginResponseInterface {
  token: string,
  firstName: string,
  lastName: string,
  userRole: string,
}

export interface LoginResponseErrorInterface {
  message: string
}

export interface PreLoginInterface {
  current_step?: string,
  essais_restants?: number,
  exploitation: {
    numero_sos: string
  }
}

export interface UnlockResponseInterface {
  identifiant: string,
  essais_restants: number
}

export const authSteps = {
  stepLogin: "1",
  stepForgottenPassword: "2",
  stepPasswordLostCodeSms: "3",
  stepNewPassword: "4",
  blockScreen: "-1"
}

export interface CheckAccessResponse {
  access: boolean,
  code: number
}

export interface CheckAccessError {
  access?: boolean,
  code?: number,
  lienApk?: string,
  lienChangeLog?: string,
  erreur: string
}
