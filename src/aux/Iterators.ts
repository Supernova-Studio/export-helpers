import { TokenType } from '@supernovaio/sdk-exporters'

/** Contains useful static data that can be iterated over */
export class Iterators {
  /** All Supernova available token types */
  static allTokenTypes(): Array<TokenType> {
    return [
      TokenType.color,
      TokenType.typography,
      TokenType.dimension,
      TokenType.size,
      TokenType.space,
      TokenType.opacity,
      TokenType.fontSize,
      TokenType.lineHeight,
      TokenType.letterSpacing,
      TokenType.paragraphSpacing,
      TokenType.borderWidth,
      TokenType.radius,
      TokenType.duration,
      TokenType.zIndex,
      TokenType.shadow,
      TokenType.border,
      TokenType.gradient,
      TokenType.string,
      TokenType.productCopy,
      TokenType.fontFamily,
      TokenType.fontWeight,
      TokenType.textCase,
      TokenType.textDecoration,
      TokenType.visibility,
      TokenType.blur
    ]
  }

  /** All Supernova available dimension token types */
  static allDimensionTokenTypes(): Array<TokenType> {
    return [
      TokenType.dimension,
      TokenType.size,
      TokenType.space,
      TokenType.opacity,
      TokenType.fontSize,
      TokenType.lineHeight,
      TokenType.letterSpacing,
      TokenType.paragraphSpacing,
      TokenType.borderWidth,
      TokenType.radius,
      TokenType.duration,
      TokenType.zIndex
    ]
  }

  /** All Supernova available string token types */
  static allStringTokenTypes(): Array<TokenType> {
    return [TokenType.string, TokenType.productCopy, TokenType.fontFamily, TokenType.fontWeight]
  }

  /** All Supernova available option token types */
  static allOptionTokenTypes(): Array<TokenType> {
    return [TokenType.textCase, TokenType.textDecoration, TokenType.visibility]
  }
}
