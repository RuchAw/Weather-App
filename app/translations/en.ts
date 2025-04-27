import LoginScreenEn from "./LoginScreen/en"
import {Translations} from "./fr";
import HomeScreenEn from "./HomeScreen/en";

const en: Translations = {
  common: {
    ok: "OK!",
    cancel: "CANCEL",
    back: "Back",
    select: "Select an item",
    yes: "YES",
    no: "NO",
    or: "OR",
    validate: "VALIDATE",
    continue: "CONTINUE",
    retry: "RETRY",
    elapsedSeconds: "{{seconds}} second{{secondsSuffix}}",
    elapsedMinutes: "{{minutes}} minute{{minutesSuffix}} ",
    cancelNavigation: "CANCEL NAVIGATION",
    arrived: "I ARRIVED",
    location: "\n{{makerAddress}}\n{{addressComplement}}\n\n",
    close: "CLOSE",
    then: "Then",
    recenter: "Re-center",
    error: "Error",
    disconnection: "Disconnect",
    configuration: "Configuration",
    downloadNewVersion: "Download the new version",
    showChangeLog: "Show the changelog",
    disconnect: "Disconnect",
    versionNoLongerAccessible: "This version is no longer accessible",
    pleaseUpdateTheApp: "please update the app",
    makeSureYouAreOnAnActiveNetwork: "Make sure you are on an active network",
    locationServicesAreDisabled: "Location services are not enabled.\nPlease enable them to use the map.",
    important: "IMPORTANT",
    warning: "Warning",
    second: "second",
    seconds: "seconds",
    minute: "minute",
    minutes: "minutes",
    and: "and",
    km: "km",
    version: "Version"
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle: "An error has occurred. Please contact the administrator.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  loginScreen: LoginScreenEn,
  homeScreen: HomeScreenEn
}

export default en
