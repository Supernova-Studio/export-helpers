import {
  BlurToken,
  BlurType,
  BorderPosition,
  BorderStyle,
  BorderToken,
  BorderTokenValue,
  ColorToken,
  ColorTokenValue,
  DimensionToken,
  DimensionTokenValue,
  GradientStopValue,
  GradientToken,
  GradientTokenValue,
  GradientType,
  OpacityToken,
  ShadowToken,
  ShadowType,
  StringToken,
  StringTokenValue,
  TextCase,
  TextDecoration,
  Token,
  TypographyToken,
  Unit
} from '@supernovaio/sdk-exporters'
import {
  AnyOptionToken,
  AnyOptionTokenValue,
  BlurTokenValue,
  FontSizeTokenValue,
  LineHeightTokenValue,
  ShadowTokenValue,
  TextCaseTokenValue,
  TypographyTokenValue
} from '@supernovaio/sdk-exporters'
import { ColorFormat } from '../../src/enums/ColorFormat'
import { CSSHelper } from '../../src/transforms/CSSHelper'

/** Base formattable color - no refs */
const testColor: ColorTokenValue = {
  color: {
    r: 135,
    g: 100,
    b: 200,
    referencedTokenId: null
  },
  opacity: {
    measure: 0.5,
    referencedTokenId: null,
    unit: Unit.raw
  },
  referencedTokenId: null
}

/** Base formattable border */
const testBorder: BorderTokenValue = {
  color: {
    color: {
      r: 135,
      g: 100,
      b: 200,
      referencedTokenId: null
    },
    opacity: {
      measure: 0.5,
      referencedTokenId: null,
      unit: Unit.raw
    },
    referencedTokenId: null
  },
  width: {
    measure: 1,
    unit: Unit.pixels,
    referencedTokenId: null
  },
  style: BorderStyle.solid,
  position: BorderPosition.outside,
  referencedTokenId: null
}

const testDimension: DimensionTokenValue = {
  measure: 1,
  unit: Unit.pixels,
  referencedTokenId: null
}

const testString: StringTokenValue = {
  text: 'test',
  referencedTokenId: null
}

const testBlur: BlurTokenValue = {
  radius: testDimension,
  referencedTokenId: null,
  type: BlurType.background
}

const testOption: AnyOptionTokenValue = {
  value: TextCase.lower,
  referencedTokenId: null,
  options: [TextCase.lower, TextCase.upper]
}

const testGradient: GradientTokenValue = {
  type: GradientType.linear,
  aspectRatio: 0,
  from: {
    x: 0,
    y: 0
  },
  to: {
    x: 1,
    y: 1
  },
  stops: [
    {
      position: 0,
      color: testColor
    },
    {
      position: 1,
      color: testColor
    }
  ],
  referencedTokenId: null
}

const testTypography: TypographyTokenValue = {
  fontFamily: {
    text: 'Arial',
    referencedTokenId: null
  },
  fontWeight: {
    text: '400',
    referencedTokenId: null
  },
  fontSize: {
    measure: 16,
    unit: Unit.pixels,
    referencedTokenId: null
  },
  textDecoration: {
    value: TextDecoration.original,
    referencedTokenId: null
  },
  textCase: {
    value: TextCase.lower,
    referencedTokenId: null
  },
  letterSpacing: {
    measure: 1,
    unit: Unit.pixels,
    referencedTokenId: null
  },
  lineHeight: {
    measure: 1,
    unit: Unit.rem,
    referencedTokenId: null
  } as LineHeightTokenValue,
  paragraphIndent: {
    measure: 1,
    unit: Unit.pixels,
    referencedTokenId: null
  },
  paragraphSpacing: {
    measure: 1,
    unit: Unit.pixels,
    referencedTokenId: null
  },
  referencedTokenId: null
}

const testShadow: ShadowTokenValue = {
  color: testColor,
  x: 3,
  y: 4,
  radius: 5,
  spread: 6,
  opacity: testColor.opacity,
  type: ShadowType.drop,
  referencedTokenId: null
}

/** Base formatting options */
const testOptions = {
  allowReferences: true,
  colorFormat: ColorFormat.smartHashHex,
  decimals: 3,
  tokenToVariableRef: (colorToken) => {
    return `var(--${colorToken.name})`
  }
}

const tokens = new Map<string, Token>()
tokens.set('colorRef', {
  value: testColor,
  name: 'colorRef'
} as ColorToken)
tokens.set('opacityRef', {
  value: testColor.opacity,
  name: 'opacityRef'
} as OpacityToken)
tokens.set('borderRef', {
  value: testBorder,
  name: 'borderRef'
} as BorderToken)
tokens.set('dimensionRef', {
  value: testDimension,
  name: 'dimensionRef'
} as DimensionToken)
tokens.set('gradientRef', {
  value: [testGradient],
  name: 'gradientRef'
} as GradientToken)
tokens.set('stringRef', {
  value: testString,
  name: 'stringRef'
} as StringToken)
tokens.set('optionRef', {
  value: testOption,
  name: 'optionRef'
} as AnyOptionToken)
tokens.set('blurRef', {
  value: testBlur,
  name: 'blurRef'
} as BlurToken)
tokens.set('shadowRef', {
  value: [testShadow],
  name: 'shadowRef'
} as ShadowToken)
tokens.set('typographyRef', {
  value: testTypography,
  name: 'typographyRef'
} as TypographyToken)

test('toCSS_colorToken_1', () => {
  let color = {
    ...testColor
  }
  expect(CSSHelper.colorTokenValueToCSS(color, tokens, testOptions)).toBe('#8764c880')
})

test('toCSS_colorToken_2', () => {
  let color = {
    ...testColor,
    referencedTokenId: 'colorRef'
  }
  expect(CSSHelper.colorTokenValueToCSS(color, tokens, testOptions)).toBe('var(--colorRef)')
})

test('toCSS_colorToken_3', () => {
  let color = {
    ...testColor,
    color: {
      ...testColor.color,
      referencedTokenId: 'colorRef'
    }
  }
  expect(
    CSSHelper.colorTokenValueToCSS(color, tokens, {
      ...testOptions,
      colorFormat: ColorFormat.smartRgba
    })
  ).toBe('rgba(var(--colorRef), 0.5)')
})

test('toCSS_colorToken_4', () => {
  let color = {
    ...testColor,
    opacity: {
      ...testColor.opacity,
      referencedTokenId: 'opacityRef'
    }
  }
  expect(
    CSSHelper.colorTokenValueToCSS(color, tokens, {
      ...testOptions,
      colorFormat: ColorFormat.smartRgba
    })
  ).toBe('rgba(135, 100, 200, var(--opacityRef))')
})

test('toCSS_colorToken_disabledReference', () => {
  let color = {
    ...testColor,
    referencedTokenId: 'colorRef'
  }
  expect(
    CSSHelper.colorTokenValueToCSS(color, tokens, {
      ...testOptions,
      allowReferences: false
    })
  ).toBe('#8764c880')
})

test('toCSS_colorToken_border_1', () => {
  let border = {
    ...testBorder
  }
  expect(CSSHelper.borderTokenValueToCSS(border, tokens, testOptions)).toBe('1px solid #8764c880')
})

test('toCSS_colorToken_border_2', () => {
  let border = {
    ...testBorder,
    referencedTokenId: 'borderRef'
  }
  expect(CSSHelper.borderTokenValueToCSS(border, tokens, testOptions)).toBe('var(--borderRef)')
})

test('toCSS_colorToken_border_3', () => {
  let border = {
    ...testBorder,
    color: { ...testBorder.color, referencedTokenId: 'colorRef' },
    width: { ...testBorder.width, referencedTokenId: 'dimensionRef' }
  }
  expect(CSSHelper.borderTokenValueToCSS(border, tokens, testOptions)).toBe('var(--dimensionRef) solid var(--colorRef)')
})

test('toCSS_gradientToken_1', () => {
  let gradient = {
    ...testGradient
  }
  expect(CSSHelper.gradientTokenValueToCSS([gradient], tokens, testOptions)).toBe(
    'linear-gradient(0deg, #8764c880 0%, #8764c880 100%)'
  )
})

test('toCSS_gradientToken_2', () => {
  let gradient = {
    ...testGradient,
    referencedTokenId: 'gradientRef'
  }
  expect(CSSHelper.gradientTokenValueToCSS([gradient], tokens, testOptions)).toBe('var(--gradientRef)')
})

test('toCSS_gradientToken_3', () => {
  let gradient = {
    ...testGradient,
    referencedTokenId: 'gradientRef'
  }
  expect(CSSHelper.gradientTokenValueToCSS([gradient, { ...testGradient }], tokens, testOptions)).toBe(
    'var(--gradientRef), linear-gradient(0deg, #8764c880 0%, #8764c880 100%)'
  )
})

test('toCSS_gradientToken_4', () => {
  let gradient = {
    ...testGradient,
    stops: [
      {
        position: 0,
        color: {
          ...testColor,
          referencedTokenId: 'colorRef'
        }
      },
      {
        position: 1,
        color: testColor
      }
    ]
  }
  expect(CSSHelper.gradientTokenValueToCSS([gradient], tokens, testOptions)).toBe(
    'linear-gradient(0deg, var(--colorRef) 0%, #8764c880 100%)'
  )
})

test('toCSS_dimensionToken_1', () => {
  let dimension = {
    ...testDimension
  }
  expect(CSSHelper.dimensionTokenValueToCSS(dimension, tokens, testOptions)).toBe('1px')
})

test('toCSS_dimensionToken_2', () => {
  let dimension = {
    ...testDimension,
    referencedTokenId: 'dimensionRef'
  }
  expect(CSSHelper.dimensionTokenValueToCSS(dimension, tokens, testOptions)).toBe('var(--dimensionRef)')
})

test('toCSS_stringToken_1', () => {
  let string = {
    ...testString
  }
  expect(CSSHelper.stringTokenValueToCSS(string, tokens, testOptions)).toBe('"test"')
})

test('toCSS_stringToken_2', () => {
  let string = {
    ...testString,
    referencedTokenId: 'stringRef'
  }
  expect(CSSHelper.stringTokenValueToCSS(string, tokens, testOptions)).toBe('var(--stringRef)')
})

test('toCSS_optionToken_1', () => {
  let option = {
    ...testOption
  }
  expect(CSSHelper.optionTokenValueToCSS(option, tokens, testOptions)).toBe('"Lower"')
})

test('toCSS_optionToken_2', () => {
  let option = {
    ...testOption,
    referencedTokenId: 'optionRef'
  }
  expect(CSSHelper.optionTokenValueToCSS(option, tokens, testOptions)).toBe('var(--optionRef)')
})

test('toCSS_blurToken_1', () => {
  let blur = {
    ...testBlur
  }
  expect(CSSHelper.blurTokenValueToCSS(blur, tokens, testOptions)).toBe('blur(1px)')
})

test('toCSS_blurToken_2', () => {
  let blur = {
    ...testBlur,
    referencedTokenId: 'blurRef'
  }
  expect(CSSHelper.blurTokenValueToCSS(blur, tokens, testOptions)).toBe('var(--blurRef)')
})

test('toCSS_shadowToken_1', () => {
  let shadow = {
    ...testShadow
  }
  expect(CSSHelper.shadowTokenValueToCSS([shadow], tokens, testOptions)).toBe('3px 4px 5px 6px #8764c880')
})

test('toCSS_shadowToken_2', () => {
  let shadow = {
    ...testShadow,
    referencedTokenId: 'shadowRef'
  }
  expect(CSSHelper.shadowTokenValueToCSS([shadow], tokens, testOptions)).toBe('var(--shadowRef)')
})

test('toCSS_shadowToken_3', () => {
  let shadow = {
    ...testShadow,
    color: { ...testShadow.color, referencedTokenId: 'colorRef' }
  }
  expect(CSSHelper.shadowTokenValueToCSS([shadow], tokens, testOptions)).toBe('3px 4px 5px 6px var(--colorRef)')
})

test('toCSS_shadowToken_4', () => {
  let shadow = {
    ...testShadow,
    color: { ...testShadow.color, referencedTokenId: 'colorRef' }
  }
  expect(CSSHelper.shadowTokenValueToCSS([testShadow, shadow], tokens, testOptions)).toBe(
    '3px 4px 5px 6px #8764c880, 3px 4px 5px 6px var(--colorRef)'
  )
})

test('toCSS_typographyToken_1', () => {
  let typography = {
    ...testTypography
  }
  expect(CSSHelper.typographyTokenValueToCSS(typography, tokens, testOptions)).toBe('"400" 16px/1rem "Arial"')
})

test('toCSS_typographyToken_2', () => {
  let typography = {
    ...testTypography,
    referencedTokenId: 'typographyRef'
  }
  expect(CSSHelper.typographyTokenValueToCSS(typography, tokens, testOptions)).toBe('var(--typographyRef)')
})

test('toCSS_typographyToken_3', () => {
  let typography = {
    ...testTypography,
    lineHeight: { ...testTypography.lineHeight, referencedTokenId: 'dimensionRef' } as LineHeightTokenValue
  }
  expect(CSSHelper.typographyTokenValueToCSS(typography, tokens, testOptions)).toBe(
    '"400" 16px/var(--dimensionRef) "Arial"'
  )
})

test('toCSS_typographyToken_4', () => {
  let typography = {
    ...testTypography,
    fontSize: { ...testTypography.fontSize, referencedTokenId: 'dimensionRef' } as FontSizeTokenValue,
    lineHeight: { ...testTypography.lineHeight, referencedTokenId: 'dimensionRef' } as LineHeightTokenValue
  }
  expect(CSSHelper.typographyTokenValueToCSS(typography, tokens, testOptions)).toBe(
    '"400" var(--dimensionRef)/var(--dimensionRef) "Arial"'
  )
})

test('toCSS_typographyToken_5', () => {
  let typography = {
    ...testTypography,
    fontSize: { ...testTypography.fontSize, referencedTokenId: 'dimensionRef' } as FontSizeTokenValue,
    lineHeight: { ...testTypography.lineHeight, referencedTokenId: 'dimensionRef' } as LineHeightTokenValue,
    textCase: { ...testTypography.textCase, value: TextCase.smallCaps } as TextCaseTokenValue
  }
  expect(CSSHelper.typographyTokenValueToCSS(typography, tokens, testOptions)).toBe(
    'small-caps "400" var(--dimensionRef)/var(--dimensionRef) "Arial"'
  )
})
