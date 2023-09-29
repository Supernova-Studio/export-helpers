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
  TextCase,
  TextDecoration,
  Token,
  TokenType,
  TypographyToken,
  Unit,
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
import { sureOptionalReference } from "../libs/tokens"

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
    /** Use subroutines to convert specific token types to different css representations. Many tokens are of the same type */
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
    const data = {
      width: this.dimensionTokenValueToCSS(border.width, allTokens, options),
      style: this.borderStyleToCSS(border.style),
      color: this.colorTokenValueToCSS(border.color, allTokens, options),
      position: this.borderPositionToCSS(border.position),
    }
    return `${data.width} ${data.style} ${data.color} ${data.position}`
  }

  static gradientsTokenValueToCSS(gradients: Array<GradientTokenValue>, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return "WIP"
  }

  static dimensionTokenValueToCSS(dimension: AnyDimensionTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return `${ColorHelper.roundToDecimals(dimension.measure, options.decimals)}${this.unitToCSS(dimension.unit)}`
  }

  static shadowsTokenValueToCSS(shadows: Array<ShadowTokenValue>, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return "WIP"
  }

  static stringTokenValueToCSS(value: AnyStringTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    const reference = sureOptionalReference(value.referencedTokenId, allTokens)
    if (reference) {
      return options.tokenToVariableRef(reference)
    }
    return `"${value.text}"`
  }

  static optionTokenValueToCSS(option: AnyOptionTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    const reference = sureOptionalReference(option.referencedTokenId, allTokens)
    if (reference) {
      return options.tokenToVariableRef(reference)
    }
    return `"${option.value}"`
  }

  static blurTokenValueToCSS(blur: BlurTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    return `blur(${this.dimensionTokenValueToCSS(blur.radius, allTokens, options)}))`
  }

  static typographyTokenValueToCSS(typography: TypographyTokenValue, allTokens: Map<string, Token>, options: TokenToCSSOptions): string {
    // Reference full typography token if set
    const reference = sureOptionalReference(typography.referencedTokenId, allTokens)
    if (reference) {
      return options.tokenToVariableRef(reference)
    }

    // Resolve partial references
    const fontFamilyReference = sureOptionalReference(typography.fontFamily.referencedTokenId, allTokens)
    const fontWeightReference = sureOptionalReference(typography.fontWeight.referencedTokenId, allTokens)
    const decorationReference = sureOptionalReference(typography.textDecoration.referencedTokenId, allTokens)
    const caseReference = sureOptionalReference(typography.textCase.referencedTokenId, allTokens)

    const data = {
      fontFamily: fontFamilyReference ? options.tokenToVariableRef(fontFamilyReference) : typography.fontFamily.text,
      fontWeight: fontWeightReference ? options.tokenToVariableRef(fontWeightReference) : typography.fontWeight.text,
      textDecoration: decorationReference
        ? options.tokenToVariableRef(decorationReference)
        : typography.textDecoration.value === TextDecoration.original
        ? this.textDecorationToCSS(typography.textDecoration.value as TextDecoration)
        : undefined,
      textCase: caseReference
        ? options.tokenToVariableRef(caseReference)
        : typography.textCase.value === TextCase.original
        ? this.textCaseToCSS(typography.textCase.value as TextCase)
        : undefined,
      caps: typography.textCase.value === TextCase.smallCaps,
      fontSize: this.dimensionTokenValueToCSS(typography.fontSize, allTokens, options),
      lineHeight: this.dimensionTokenValueToCSS(typography.lineHeight, allTokens, options),
    }

    // small-caps bold 24px/1 "Inter"
    // Formal CSS definition: font-style, font-variant, font-weight, font-stretch, font-size, line-height, and font-family.
    return `${data.caps ? "small-caps " : ""}${data.fontWeight} ${data.fontSize}/${data.lineHeight} ${data.fontFamily}`
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
      default:
        return "solid"
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
      default:
        return "outside"
    }
  }

  private static unitToCSS(unit: Unit): string {
    switch (unit) {
      case Unit.percent:
        return "%"
      case Unit.pixels:
        return "px"
      case Unit.rem:
        return "rem"
      case Unit.raw:
        return ""
      case Unit.ms:
        return "ms"
      default:
        return "px"
    }
  }

  private static textCaseToCSS(textCase: TextCase): string {
    switch (textCase) {
      case TextCase.original:
        return "none"
      case TextCase.upper:
        return "uppercase"
      case TextCase.lower:
        return "lowercase"
      case TextCase.camel:
      case TextCase.smallCaps:
        return "capitalize"
    }
  }

  private static textDecorationToCSS(textDecoration: TextDecoration): string {
    switch (textDecoration) {
      case TextDecoration.original:
        return "none"
      case TextDecoration.underline:
        return "underline"
      case TextDecoration.strikethrough:
        return "line-through"
    }
  }
}
