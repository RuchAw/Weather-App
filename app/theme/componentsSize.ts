import { responsiveSize } from "./ResponsiveDimensions"

export function getBaseComponentsSize(): number {
    return responsiveSize(20)
}

/**
 * xxxs: 6,
 * xxs: 8,
 * xs: 12,
 * sm: 18,
 * md: 20,
 * df: 24,
 * lg: 28,
 * xl: 36,
 * sxxl: 40,
 * axxl:42
 * mxxl: 44,
 * xxl: 52,
 * dxxl:60
 * xxxl: 68
 * stxl: 72
 * txl: 76
 * swl: 78
 * wl: 80
 * mwl: 84
 * dwl: 88
 * lwl: 100
 * sxwl: 114
 * xwl: 135
 * imagePlaceHolder: 200
 * bottomLogo: 211
 */
export const componentSize = {
    xxxs: getBaseComponentsSize() - 14,
    xxs: getBaseComponentsSize() - 12,
    xs: getBaseComponentsSize() - 8,
    sm: getBaseComponentsSize() - 2,
    md: getBaseComponentsSize(),
    df: getBaseComponentsSize() + 4,
    lg: getBaseComponentsSize() + 8,
    xl: getBaseComponentsSize() + 16,
    sxxl: getBaseComponentsSize() + 20,
    axxl: getBaseComponentsSize() + 22,
    mxxl: getBaseComponentsSize() + 24,
    xxl: getBaseComponentsSize() + 32,
    dxxl: getBaseComponentsSize() + 40,
    xxxl: getBaseComponentsSize() + 48,
    stxl: getBaseComponentsSize() + 52,
    txl: getBaseComponentsSize() + 56,
    swl: getBaseComponentsSize() + 58,
    wl: getBaseComponentsSize() + 60,
    mwl: getBaseComponentsSize() + 64,
    dwl: getBaseComponentsSize() + 68,
    lwl: getBaseComponentsSize() + 80,
    sxwl: getBaseComponentsSize() + 94,
    xwl: getBaseComponentsSize() + 115,
    imagePlaceHolder: getBaseComponentsSize() + 180,
    bottomLogo: getBaseComponentsSize() + 191
} as const

export type ComponentSize = keyof typeof componentSize
