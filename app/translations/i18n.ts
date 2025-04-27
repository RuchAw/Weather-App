import * as Localization from "expo-localization"
import i18n from "i18n-js"
import { I18nManager } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
// import RNRestart from 'react-native-restart';

// Translations
import fr, { Translations } from "./fr";
import en from "./en";
import ar from "./ar";
import { makeEventNotifier } from "../utils/useEventListener";

i18n.fallbacks = true;
i18n.translations = { fr, ar, en, "en-US": en };

export const languageChanged = makeEventNotifier<void>("LanguageChanged");

// Function to set the locale and update RTL
const setI18nConfig = (locale: string) => {
  i18n.locale = locale;
  const isRTL = ["ar"].includes(locale.split("-")[0]); // Specify RTL languages explicitly
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);
};

// Export a helper to check RTL status
export const isRTL = I18nManager.isRTL;

// Load and set the saved language or default to device locale
export const initLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem("appLanguage");
    const locale = savedLanguage || "en";
    setI18nConfig(locale);
  } catch (error) {
    console.error("Failed to load language", error);
  }
};

// Save the selected language and apply changes
export const changeLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem("appLanguage", language);
    setI18nConfig(language);
    languageChanged.notify();

    // Optional: force reload for immediate effect (requires app reload)
    if (I18nManager.isRTL !== ["ar"].includes(language)) {
      I18nManager.forceRTL(!I18nManager.isRTL);
      // Reload app here if necessary
      // RNRestart.restart()
    }
  } catch (error) {
    console.error("Failed to change language", error);
  }
};

/**
 * Builds up valid keypaths for translations.
 */
export type TxKeyPath = RecursiveKeyOf<Translations>

// RecursiveKeyOf implementation
type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >
}[keyof TObj & (string | number)]

type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
    ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
    : Text
