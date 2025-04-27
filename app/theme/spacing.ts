/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
import { responsiveSize } from "./ResponsiveDimensions"

function getSpaceSize(): number {
  return responsiveSize(16)
}

/**
 * xxxs: 2,
 * xxs: 4,
 * xs: 8,
 * ds: 10,
 * xsm: 12,
 * sm: 14,
 * md: 16,
 * df: 20,
 * lg: 24,
 * xlg: 26,
 * sxl: 28,
 * xl: 32,
 * gxl: 38
 * sxxl: 40,
 * mxxl: 42
 * xxl: 48
 * mxxxl: 56
 * xxxl: 64
 * wl: 72
 */
export const spacing = {
  xxxs: getSpaceSize() - 14,
  xxs: getSpaceSize() - 12,
  xs: getSpaceSize() - 8,
  sm: getSpaceSize() - 2,
  ds: getSpaceSize() - 6,
  xsm: getSpaceSize() - 4,
  md: getSpaceSize(),
  df: getSpaceSize() + 4,
  lg: getSpaceSize() + 8,
  xlg: getSpaceSize() + 10,
  sxl: getSpaceSize() + 12,
  xl: getSpaceSize() + 16,
  gxl: getSpaceSize() + +22,
  sxxl: getSpaceSize() + 24,
  mxxl: getSpaceSize() + 26,
  xxl: getSpaceSize() + 32,
  mxxxl: getSpaceSize() + 40,
  xxxl: getSpaceSize() + 48,
  wl: getSpaceSize() + 56,
  homeIconContainer: getSpaceSize() + 84,
  homeButtonTitleContainer: getSpaceSize() + 104
} as const

export type Spacing = keyof typeof spacing
