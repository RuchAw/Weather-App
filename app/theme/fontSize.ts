import { TextStyle } from "react-native";
import { responsiveSize } from "./ResponsiveDimensions"

export function getBaseTextSize(): number {
    return responsiveSize(14)
}

export function getBaseTextLineHeight(): number {
    return responsiveSize(24)
}

/**
 * wl: 40,
 * xxl: 36,
 * mxxl: 34,
 * hxl: 32
 * xl: 24
 * lg: 20
 * md: 18
 * df:17
 * sm: 16
 * csm:15
 * xs: 14
 * xxs: 12
 */
export const baseTextPresetSize = {
    wl: {
        fontSize: getBaseTextSize() + 26,
        lineHeight: getBaseTextLineHeight() + 27,
    },
    xxl: {
        fontSize: getBaseTextSize() + 22,
        lineHeight: getBaseTextLineHeight() + 23,
    } satisfies TextStyle,
    mxxl: {
        fontSize: getBaseTextSize() + 20,
        lineHeight: getBaseTextLineHeight() + 21,
    }, hxl: {
        fontSize: getBaseTextSize() + 18,
        lineHeight: getBaseTextLineHeight() + 17,
    },
    xl: {
        fontSize: getBaseTextSize() + 10,
        lineHeight: getBaseTextLineHeight() + 13,
    } satisfies TextStyle,
    lg: {
        fontSize: getBaseTextSize() + 6,
        lineHeight: getBaseTextLineHeight() + 11,
    } satisfies TextStyle,
    md: {
        fontSize: getBaseTextSize() + 4,
        lineHeight: getBaseTextLineHeight() + 5,
    } satisfies TextStyle,
    df: {
        fontSize: getBaseTextSize() + 3,
        lineHeight: getBaseTextLineHeight() + 4,
    } satisfies TextStyle,
    sm: {
        fontSize: getBaseTextSize() + 2,
        lineHeight: getBaseTextLineHeight() + 3,
    } satisfies TextStyle,
    csm: {
        fontSize: getBaseTextSize() + 1,
        lineHeight: getBaseTextLineHeight() + 2,
    } satisfies TextStyle,
    xs: { fontSize: getBaseTextSize(), lineHeight: getBaseTextLineHeight() } satisfies TextStyle,
    xxs: {
        fontSize: getBaseTextSize() - 2,
        lineHeight: getBaseTextLineHeight() - 3,
    } satisfies TextStyle,
} as const

/**
 * wl: 40
 * xxl: 36,
 * mxl: 30,
 * sxl: 26,
 * xl: 24
 * lg: 20
 * md: 18
 * df: 17
 * sm: 16
 * mxs: 15
 * xs: 14
 * xxs: 12
 */
export const fontSize = {
    wl: getBaseTextSize() + 26,
    xxl: getBaseTextSize() + 22,
    mxl: getBaseTextSize() + 18,
    sxl: getBaseTextSize() + 12,
    xl: getBaseTextSize() + 10,
    lg: getBaseTextSize() + 6,
    md: getBaseTextSize() + 4,
    df: getBaseTextSize() + 3,
    sm: getBaseTextSize() + 2,
    mxs: getBaseTextSize() + 1,
    xs: getBaseTextSize(),
    xxs: getBaseTextSize() - 2
}


export type Size = keyof typeof fontSize
