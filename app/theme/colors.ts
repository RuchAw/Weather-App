// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#000000B2",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#FF0000E5",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

// Main palette
const mainPalette = {
  primaryTextCouleur: "black",
  primaryTextInputCouleur: "#47525E",
  primaryBtnBgCouleur: "#A3CD13",
  primaryIconColor: "#161918",
  primaryTitlesColor: "#161918",
  primaryFoundersarmColor: "#161918",
  secondaryFoundersarmColor: "#A3CD13",
  primaryDisabledBtnBgCouleur: "#99CC1680",
  primaryBtnTextCouleur: "#fff",
  secondaryBgCouleur: "#748699",
  secondaryTextCouleur: "white",
  secondaryBtnBgCouleur: "#999",
  secondaryBtnBgCouleurPressed: "#6b6b6b",
  secondaryBtnTextCouleur: "white",
  primaryTextButtons: "#47525E",
  primatyTextInputBgCouleur: "#f7f7f7",
  primaryBgCouleur: "#A3CD13",
  magnetCardBgCouleur: "#f5f2ea35",
  primaryLabelTextCouleur: "#161918",
  placeHolderTextCouleur: "#0000004D",
  disabledButtonBgCouleur: "#00000066",
  iconPrimaryCouleur: "#00000066",
  baseBugCouleur: "#FF0000B2",
  primaryBorderCouleur: "#00000033",
  secondaryRadioButtonColor: "#FF0000",
  loginButtonBgColor: "#c1a573",
  loginBackGroundColor: "#effbff",
  cardBgColor: "#62c1e5",
  secondaryTextCardColor: "#e6f6fb",
  loginDisabledButton: "#748699",
  levelContainerBgColor: "#D9D9D9",
  inactiveBgColor: "#00000033",
  warningBgColor: "#FFD704",
  disabledTextInputColor: "#C4C4C433",
  infoToastColor: "#47AEB8",
  searchBarBorderColor: "#C4C4C4",
  primaryBtnBgColorPressed: "#99CC1680",
  deleteButtonBgColor: "#F03C3C",
  deleteButtonBgColorPressed: "#942e2e",
  incorrectEntryBgColor: "#942e2e"
}

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: mainPalette.primaryTextCouleur,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral100,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,

  /**
   * Main project colors
   */
  weatherAppPalette: mainPalette
}
