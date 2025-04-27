import { useState, useEffect, Dispatch, SetStateAction } from "react"
import { secureLoad, secureRemove, secureSave } from "../storage"

interface useStoredCredentialsProps {
  setUserName: (userName: string) => void,
  setAuthPassword: (password: string) => void
}

type useStoredCredentialsReturnType = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  (userName: string, password: string) => Promise<void>,
]

// Hook to manage loading and saving credentials securely
export const useStoredCredentials = (props: useStoredCredentialsProps): useStoredCredentialsReturnType => {

  const { setUserName, setAuthPassword } = props
  const [rememberMe, setRememberMe] = useState(false)

  const loadCredentials = async () => {
    const storedUserName = await secureLoad("authUsername")
    const storedPassword = await secureLoad("authPassword")
    if (storedUserName && storedPassword) {
      setUserName(storedUserName as string)
      setAuthPassword(storedPassword as string)
      setRememberMe(true)
    }
  }

  useEffect(() => {
    loadCredentials()
  }, [])

  const saveCredentials = async (userName: string, password: string) => {
    if (rememberMe) {
      await secureSave("authUsername", userName)
      await secureSave("authPassword", password)
    } else {
      await secureRemove("authUsername")
      await secureRemove("authPassword")
    }
  }

  return [rememberMe, setRememberMe, saveCredentials]
}
