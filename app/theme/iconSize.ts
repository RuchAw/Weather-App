import { responsiveSize } from "./ResponsiveDimensions"

export function getBaseIconSize(): number {
    return responsiveSize(20)
}

/**
 * xxxs: 6,
 * xxs: 8,
 * xs: 12,
 * xsm: 16,
 * sm: 18,
 * md: 20,
 * df: 24,
 * lg: 28,
 * mxl: 32,
 * xl: 36,
 * mxxl: 40,
 * xxl: 42,
 * sxxxl: 65
 * xxxl: 68
 * wl: 80
 * mwl: 90
 * sxwl: 110
 * xwl: 120
 */
export const iconSize = {
    xxxs: getBaseIconSize() - 14,
    xxs: getBaseIconSize() - 12,
    xs: getBaseIconSize() - 8,
    xsm: getBaseIconSize() - 4,
    sm: getBaseIconSize() - 2,
    md: getBaseIconSize(),
    df: getBaseIconSize() + 4,
    lg: getBaseIconSize() + 8,
    mxl: getBaseIconSize() + 12,
    xl: getBaseIconSize() + 16,
    mxxl: getBaseIconSize() + 20,
    xxl: getBaseIconSize() + 32,
    sxxxl: getBaseIconSize() + 45,
    xxxl: getBaseIconSize() + 48,
    wl: getBaseIconSize() + 60,
    mwl: getBaseIconSize() + 70,
    sxwl: getBaseIconSize() + 90,
    xwl: getBaseIconSize() + 100
} as const

export type ComponentSize = keyof typeof iconSize
