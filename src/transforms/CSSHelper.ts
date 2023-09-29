import {
  AnyDimensionToken,
  AnyStringToken,
  BlurToken,
  BorderPosition,
  BorderStyle,
  BorderToken,
  ColorToken,
  GradientToken,
  ShadowToken,
  Token,
  TokenType,
  TypographyToken,
  UnreachableCaseError,
} from "@supernova-studio/pulsar-next"
import {
  AnyDimensionTokenValue,
  AnyOptionToken,
  AnyOptionTokenValue,
  AnyStringTokenValue,
  BlurTokenValue,
  BorderTokenValue,
  ColorTokenValue,
  GradientTokenValue,
  ShadowTokenValue,
  TypographyTokenValue,
} from "@supernova-studio/pulsar-next/build/sdk-typescript/src/model/tokens/SDKTokenValue"
import { ColorFormat, ColorHelper } from "../exports"

export type TokenToCSSOptions = {
  /** Whether to allow references to other tokens */
  allowReferences: boolean
  /** Number of decimals to round any number to */
  decimals: number
  /** Color format */
  colorFormat: ColorFormat
  /** Function to convert token to variable reference. Only used when allowReferences is true and reference is detected */
  tokenToVariableRef: (token: Token) => string
}

/** Helps with transformation of tokens to CSS values */
export class CSSHelper {
  static tokenToCSS(token: Token, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    switch (token.tokenType) {
      case TokenType.color:
        return this.colorTokenValueToCSS((token as ColorToken).value, allTokens, options)
      case TokenType.border:
        return this.borderTokenValueToCSS((token as BorderToken).value, allTokens, options)
      case TokenType.gradient:
        return this.gradientsTokenValueToCSS((token as GradientToken).value, allTokens, options)
      case TokenType.dimension:
      case TokenType.size:
      case TokenType.space:
      case TokenType.opacity:
      case TokenType.fontSize:
      case TokenType.lineHeight:
      case TokenType.letterSpacing:
      case TokenType.paragraphSpacing:
      case TokenType.borderWidth:
      case TokenType.radius:
      case TokenType.duration:
      case TokenType.zIndex:
        return this.dimensionTokenValueToCSS((token as AnyDimensionToken).value, allTokens, options)
      case TokenType.shadow:
        return this.shadowsTokenValueToCSS((token as ShadowToken).value, allTokens, options)
      case TokenType.fontWeight:
      case TokenType.fontFamily:
      case TokenType.productCopy:
      case TokenType.string:
        return this.stringTokenValueToCSS((token as AnyStringToken).value, allTokens, options)
      case TokenType.textCase:
      case TokenType.textDecoration:
      case TokenType.visibility:
        return this.optionTokenValueToCSS((token as AnyOptionToken).value, allTokens, options)
      case TokenType.blur:
        return this.blurTokenValueToCSS((token as BlurToken).value, allTokens, options)
      case TokenType.typography:
        return this.typographyTokenValueToCSS((token as TypographyToken).value, allTokens, options)
      default:
        throw new UnreachableCaseError(token.tokenType, "Unsupported token type for transformation to CSS:")
    }
  }

  static colorTokenValueToCSS(color: ColorTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return ColorHelper.formattedColorOrVariableName(color, allTokens, options.colorFormat, options.decimals, options.tokenToVariableRef)
  }

  static borderTokenValueToCSS(border: BorderTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return `${this.dimensionTokenValueToCSS(border.width, allTokens, options)} ${this.borderStyleToCSS(
      border.style
    )} ${this.colorTokenValueToCSS(border.color, allTokens, options)} ${this.borderPositionToCSS(border.position)})}`
  }

  static gradientsTokenValueToCSS(gradients: Array<GradientTokenValue>, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return "WIP"
  }

  static dimensionTokenValueToCSS(dimension: AnyDimensionTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return "WIP"
  }

  static shadowsTokenValueToCSS(shadows: Array<ShadowTokenValue>, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return "WIP"
  }

  static stringTokenValueToCSS(string: AnyStringTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return "WIP"
  }

  static optionTokenValueToCSS(option: AnyOptionTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return "WIP"
  }

  static blurTokenValueToCSS(blur: BlurTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return "WIP"
  }

  static typographyTokenValueToCSS(typography: TypographyTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return "WIP"
  }

  private static borderStyleToCSS(borderStyle: BorderStyle): string {
    switch (borderStyle) {
      case BorderStyle.dashed:
        return "dashed"
      case BorderStyle.dotted:
        return "dotted"
      case BorderStyle.solid:
        return "solid"
      case BorderStyle.groove:
        return "groove"
    }
  }

  private static borderPositionToCSS(borderPosition: BorderPosition): string {
    switch (borderPosition) {
      case BorderPosition.center:
        return "center"
      case BorderPosition.inside:
        return "inside"
      case BorderPosition.outside:
        return "outside"
    }
  }
}
