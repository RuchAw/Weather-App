import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Keychain from "react-native-keychain"

import { MMKV } from "react-native-mmkv"
export const storage = new MMKV()

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key)
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<unknown | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key)
    return JSON.parse(almostThere as string)
  } catch {
    return null
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear()
  } catch {}
}

/**
 * Loads a string from Keychain storage.
 *
 * @param key The key to fetch.
 */
export async function secureLoadString(key: string): Promise<string | null> {
  try {
    const credentials = await Keychain.getGenericPassword({ service: key })
    return credentials ? credentials.password : null
  } catch {
    return null
  }
}

/**
 * Saves a string to Keychain storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function secureSaveString(key: string, value: string): Promise<boolean> {
  try {
    await Keychain.setGenericPassword(key, value, { service: key })
    return true
  } catch {
    return false
  }
}

/**
 * Loads something from Keychain storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function secureLoad(key: string): Promise<unknown | null> {
  try {
    const credentials = await Keychain.getGenericPassword({ service: key })
    return credentials ? JSON.parse(credentials.password) : null
  } catch {
    return null
  }
}

/**
 * Saves an object to Keychain storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function secureSave(key: string, value: unknown): Promise<boolean> {
  try {
    await Keychain.setGenericPassword(key, JSON.stringify(value), { service: key })
    return true
  } catch {
    return false
  }
}

/**
 * Removes something from Keychain storage.
 *
 * @param key The key to kill.
 */
export async function secureRemove(key: string): Promise<void> {
  try {
    await Keychain.resetGenericPassword({ service: key })
  } catch {}
}
