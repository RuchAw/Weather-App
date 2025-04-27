// import { Platform } from "react-native"

import {
  Ubuntu_300Light as ubuntuLight,
  Ubuntu_400Regular as ubuntuRegular,
  Ubuntu_500Medium as ubuntuMedium,
  Ubuntu_700Bold as ubuntuBold,
  Ubuntu_400Regular_Italic as ubuntuRegularItalic,
  Ubuntu_300Light_Italic as ubuntuLightItalic
} from "@expo-google-fonts/ubuntu"

export const customFontsToLoad = {
  ubuntuLight,
  ubuntuBold,
  ubuntuRegular,
  ubuntuMedium,
  ubuntuRegularItalic,
  ubuntuLightItalic
}

const fonts = {
  ubuntu: {
    // Cross-platform Google font.
    light: "ubuntuLight",
    normal: "ubuntuRegular",
    medium: "ubuntuMedium",
    italic: "ubuntuRegularItalic",
    bold: "ubuntuBold",
    lightItalic: 'ubuntuLightItalic'
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.ubuntu,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  // secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  // code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
