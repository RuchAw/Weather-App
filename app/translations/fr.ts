import LoginScreenFr from "./LoginScreen/fr"
import HomeScreenFr from "./HomeScreen/fr";

const fr = {
  common: {
    ok: "OK!",
    cancel: "ANNULER",
    back: "Retour",
    select: "Sélectionnez un élément",
    yes: "OUI",
    no: "NON",
    or: "OU",
    validate: "VALIDER",
    continue: "CONTINUER",
    retry: "RÉESSAYER",
    elapsedSeconds: "{{seconds}} seconde{{secondsSuffix}}",
    elapsedMinutes: "{{minutes}} minute{{minutesSuffix}} ",
    cancelNavigation: "ANNULER LE GUIDAGE",
    arrived: "JE SUIS ARRIVÉ",
    location: "\n{{makerAddress}}\n{{addressComplement}}\n\n",
    close: "FERMER",
    then: "Après",
    recenter: "Recentrer",
    error: "Erreur",
    disconnection: "Déconnexion",
    configuration: "Configuration",
    downloadNewVersion: "Télécharger la nouvelle version",
    showChangeLog: "Afficher le changelog",
    disconnect: "Se déconnecter",
    versionNoLongerAccessible: "Cette version n'est plus accessible",
    pleaseUpdateTheApp: "veuillez mettre à jour l'application",
    makeSureYouAreOnAnActiveNetwork :"Assurez-vous que vous êtes sur un réseau actif",
    locationServicesAreDisabled: "Les services de localisation ne sont pas activés.\nVeuillez les activer pour accéder à la carte.",
    important: "IMPORTANT",
    warning: "Attention",
    second: "seconde",
    seconds: "secondes",
    minute: "minute",
    minutes: "minutes",
    and: "et",
    km: "km",
    version: "Version"
  },
  errorScreen: {
    title: "Quelque chose s'est mal passé!",
    friendlySubtitle:
      "Une erreur s'est produite. Prière de contacter l'administrateur.",
    reset: "RÉINITIALISER L'APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "Tellement vide... tellement triste",
      content:
        "Aucune donnée trouvée pour le moment. Essayez de cliquer sur le bouton pour actualiser ou recharger l'application.",
      button: "Essayons encore une fois",
    },
  },
  loginScreen: LoginScreenFr,
  homeScreen: HomeScreenFr
}

export default fr
export type Translations = typeof fr
