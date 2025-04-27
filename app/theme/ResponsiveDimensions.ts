import { PixelRatio } from "react-native"
import { windowsHeight, windowsWidth } from "../utils/constante"

// Reference device's width emulator (Pixel_4_XL_API_33_1440x3040)
const REFERENCE_WIDTH = 411.42857142857144
const REFERENCE_HEIGHT = 844.5714285714286

/**
 * Calculate the diagonal size of the screen using the Pythagorean theorem.
 * @param width - The width of the screen.
 * @param height - The height of the screen.
 * @returns {number} The diagonal size of the screen.
 */
const calculateDiagonal = (width: number, height: number): number => {
  return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
}

/**
 * Calculate the scaling factor based on the diagonal of the current device's screen
 * and the reference device's diagonal.
 * @param deviceWidth - The width of the current device.
 * @param deviceHeight - The height of the current device.
 * @param referenceWidth - The width of the reference device (Pixel 4 XL API 33).
 * @param referenceHeight - The height of the reference device.
 * @returns {number} The scaling factor based on diagonals.
 */
const calculateAverageScaleFactor = (
  deviceWidth: number,
  deviceHeight: number,
  referenceWidth: number,
  referenceHeight: number,
): number => {
  const deviceDiagonal = calculateDiagonal(deviceWidth, deviceHeight)
  const referenceDiagonal = calculateDiagonal(referenceWidth, referenceHeight)
  const scaleFactor = deviceDiagonal / referenceDiagonal
  return scaleFactor
}

/**
 * Calculate the scaling factor based on the current device's width and the reference width.
 * @param deviceWidth - The width of the current device.
 * @param deviceHeight - The hieght of the current device.
 * @returns {number} The scaling factor.
 */
const calculateScaleFactor = (deviceWidth: number, deviceHeight: number): number => {
  const scaleFactor = calculateAverageScaleFactor(deviceWidth, deviceHeight, REFERENCE_WIDTH, REFERENCE_HEIGHT)
  return scaleFactor
}

/**
 * Adjust the size based on pixel density and round to the nearest pixel.
 * @param size - The scaled size before rounding.
 * @returns {number} The size rounded to the nearest pixel for the current device's density.
 */
const adjustForPixelDensity = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size)
}

/**
 * Calculate a responsive size for a given desired size.
 * Scales the size based on the current device's width in relation to a reference width.
 * @param desiredSize - The size you want to scale responsively (e.g., font size, padding).
 * @returns {number} The scaled and adjusted size for the current device.
 */
export const responsiveSize = (desiredSize: number): number => {
  const scaleFactor = calculateScaleFactor(windowsWidth, windowsHeight)
  const scaledSize = desiredSize * scaleFactor
  return adjustForPixelDensity(scaledSize)
}
