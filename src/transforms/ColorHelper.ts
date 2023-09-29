import { ColorTokenValue } from "@supernova-studio/pulsar-next"
import { ColorFormat } from "../enums/ColorFormat"

/** Helps with transformation of strings */
export class ColorHelper {
  /**
   * Formats Supernova color token value to a string based on the selected format. For fractional formats, the number of decimals can be specified.
   */
  static formattedColor(color: ColorTokenValue, format: ColorFormat, decimals: number = 3): string {
    switch (format) {
      case ColorFormat.hex6:
      case ColorFormat.hex8:
      case ColorFormat.hashHex6:
      case ColorFormat.hashHex8:
      case ColorFormat.smartHex:
      case ColorFormat.smartHashHex:
        return this.colorToHex(format, this.normalizedIntColor(color), color.opacity.measure)
      case ColorFormat.rgb:
      case ColorFormat.rgba:
      case ColorFormat.smartRgba:
        return this.colorToRgb(format, this.normalizedIntColor(color), color.opacity.measure, decimals)
      case ColorFormat.hsl:
      case ColorFormat.hsla:
      case ColorFormat.smartHsla:
        return this.colorToHsl(format, this.normalizedFractionalColor(color), color.opacity.measure, decimals)
      case ColorFormat.smartUIColor:
        return this.colorToUIColor(this.normalizedIntColor(color), color.opacity.measure, decimals)
    }
  }

  // Convert color to rgb
  static colorToRgb(format: ColorFormat, color: { r: number; g: number; b: number }, alpha: number, decimals: number): string {
    let resultingRgb: string
    if (format === ColorFormat.rgba || (format === ColorFormat.smartRgba && alpha < 1)) {
      resultingRgb = `rgba(${color.r}, ${color.g}, ${color.b}, ${this.roundToDecimals(alpha, decimals)})`
    } else {
      resultingRgb = `rgb(${color.r}, ${color.g}, ${color.b})`
    }

    return resultingRgb
  }

  // Convert color to hex
  static colorToHex(format: ColorFormat, color: { r: number; g: number; b: number }, alpha: number): string {
    // Always need hex6
    let resultingHex = `${this.pHex(color.r)}${this.pHex(color.g)}${this.pHex(color.b)}`
    if (
      format === ColorFormat.hex8 ||
      format === ColorFormat.hashHex8 ||
      (format === ColorFormat.smartHex && alpha < 1) ||
      (format === ColorFormat.smartHashHex && alpha < 1)
    ) {
      // Add alpha for 8-format
      resultingHex += `${this.pHex(Math.round(alpha * 255))}`
    }
    if (format === ColorFormat.hashHex6 || format === ColorFormat.hashHex8 || format === ColorFormat.smartHashHex) {
      // Add hash for hash-format
      resultingHex = `#${resultingHex}`
    }

    return resultingHex
  }

  // Convert color to HSL
  static colorToHsl(format: ColorFormat, color: { r: number; g: number; b: number }, alpha: number, decimals: number): string {
    // Calculate HSL values
    const max = Math.max(color.r, color.g, color.b),
      min = Math.min(color.r, color.g, color.b)
    let h: number,
      s: number,
      l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const delta = max - min
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
      if (max === color.r) {
        h = (color.g - color.b) / delta + (color.g < color.b ? 6 : 0)
      } else if (max === color.g) {
        h = (color.b - color.r) / delta + 2
      } else if (max === color.b) {
        h = (color.r - color.g) / delta + 4
      }
      h /= 6
    }

    let resultingHsl: string
    if (format === ColorFormat.hsla || (format === ColorFormat.smartHsla && alpha < 1)) {
      resultingHsl = `hsla(${Math.round(h * 360)}%, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${this.roundToDecimals(
        alpha,
        decimals
      )})`
    } else {
      resultingHsl = `hsl(${Math.round(h * 360)}%, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
    }

    return resultingHsl
  }

  // Convert color to UIColor using base constructor
  static colorToUIColor(color: { r: number; g: number; b: number }, alpha: number, decimals: number = 3): string {
    let resultingUIColor = `UIColor(rgb: 0x${this.pHex(color.r)}${this.pHex(color.g)}${this.pHex(color.b)})`
    if (alpha < 1) {
      resultingUIColor += `.withAlphaComponent(${alpha})`
    }

    return resultingUIColor
  }

  // Convert color to normalized 0-255 format
  private static normalizedIntColor(color: ColorTokenValue): { r: number; g: number; b: number } {
    return {
      r: Math.round(color.color.r),
      g: Math.round(color.color.g),
      b: Math.round(color.color.b),
    }
  }

  // Convert color to normalized 0-1 format
  private static normalizedFractionalColor(color: ColorTokenValue, decimals: number = 3): { r: number; g: number; b: number } {
    return {
      r: this.roundToDecimals(color.color.r / 255, decimals),
      g: ColorHelper.roundToDecimals(color.color.g / 255, decimals),
      b: ColorHelper.roundToDecimals(color.color.b / 255, decimals),
    }
  }

  // Round half away from zero to a specific number of decimals
  private static roundToDecimals(value: number, decimals: number): number {
    const multiplier = Math.pow(10, decimals)
    const rounded = Math.round(value * multiplier) / multiplier

    // Convert to string and parse back to number to remove unnecessary trailing zeroes
    return parseFloat(rounded.toFixed(decimals))
  }

  // Return hex value with leading zero if hex is single digit
  private static pHex(value: number): string {
    return value.toString(16).padStart(2, "0")
  }
}
