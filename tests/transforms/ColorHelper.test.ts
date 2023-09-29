import { ColorToken, ColorTokenValue, OpacityToken, Token, Unit } from "@supernova-studio/pulsar-next"
import { ColorFormat, ColorHelper, NamingHelper, StringCase } from "../../src/exports"

const testDecimals = 3
const testColor: ColorTokenValue = {
  color: {
    r: 135,
    g: 100,
    b: 200,
    referencedTokenId: null,
  },
  opacity: {
    measure: 0.5,
    referencedTokenId: null,
    unit: Unit.raw,
  },
  referencedTokenId: null,
}
const testOptions = {
  allowReferences: true,
  colorFormat: ColorFormat.smartRgba,
  decimals: testDecimals,
  tokenToVariableRef: (colorToken) => {
    return `var(--${colorToken.name})`
  },
}

const tokens = new Map<string, Token>()
tokens.set("colorRef", {
  value: testColor,
  name: "colorRef",
} as ColorToken)
tokens.set("opacityRef", {
  value: testColor.opacity,
  name: "opacityRef",
} as OpacityToken)

test("formattedColor_hex6", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.hex6, testDecimals)).toBe("8764c8")
})

test("formattedColor_hex8", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.hex8, testDecimals)).toBe("8764c880")
})

test("formattedColor_hashHex6", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.hashHex6, testDecimals)).toBe("#8764c8")
})

test("formattedColor_hashHex8", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.hashHex8, testDecimals)).toBe("#8764c880")
})

test("formattedColor_smartHex", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.smartHex, testDecimals)).toBe("8764c880")
})

test("formattedColor_smartHashHex", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.smartHashHex, testDecimals)).toBe("#8764c880")
})

test("formattedColor_rgb", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.rgb, testDecimals)).toBe("rgb(135, 100, 200)")
})

test("formattedColor_rgba", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.rgba, testDecimals)).toBe("rgba(135, 100, 200, 0.5)")
})

test("formattedColor_smartRgba", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.smartRgba, testDecimals)).toBe("rgba(135, 100, 200, 0.5)")
})

test("formattedColor_smartRgba", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.smartRgba, testDecimals)).toBe("rgba(135, 100, 200, 0.5)")
})

test("formattedColor_hsl", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.hsl, testDecimals)).toBe("hsl(261%, 48%, 59%)")
})

test("formattedColor_hsla", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.hsla, testDecimals)).toBe("hsla(261%, 48%, 59%, 0.5)")
})

test("formattedColor_smartHsla", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.smartHsla, testDecimals)).toBe("hsla(261%, 48%, 59%, 0.5)")
})

test("formattedColor_smartUIColor", () => {
  expect(ColorHelper.formattedColor(testColor, ColorFormat.smartUIColor, testDecimals)).toBe(
    "UIColor(rgb: 0x8764c8).withAlphaComponent(0.5)"
  )
})

test("formattedColorOrVariableName_raw", () => {
  const color: ColorTokenValue = {
    color: {
      r: 135,
      g: 100,
      b: 200,
      referencedTokenId: null,
    },
    opacity: {
      measure: 0.5,
      referencedTokenId: null,
      unit: Unit.raw,
    },
    referencedTokenId: null,
  }

  expect(ColorHelper.formattedColorOrVariableName(color, tokens, testOptions)).toBe("rgba(135, 100, 200, 0.5)")
})

test("formattedColorOrVariableName_fullReference", () => {
  const color: ColorTokenValue = {
    color: {
      r: 135,
      g: 100,
      b: 200,
      referencedTokenId: null,
    },
    opacity: {
      measure: 0.5,
      referencedTokenId: null,
      unit: Unit.raw,
    },
    referencedTokenId: "colorRef",
  }

  expect(ColorHelper.formattedColorOrVariableName(color, tokens, testOptions)).toBe("var(--colorRef)")
})

test("formattedColorOrVariableName_partialColorReference", () => {
  const color: ColorTokenValue = {
    ...testColor,
    color: {
      ...testColor.color,
      referencedTokenId: "colorRef",
    },
  }

  expect(ColorHelper.formattedColorOrVariableName(color, tokens, testOptions)).toBe("rgba(var(--colorRef), 0.5)")
})

test("formattedColorOrVariableName_partialOpacityReference", () => {
  const color: ColorTokenValue = {
    ...testColor,
    opacity: {
      ...testColor.opacity,
      referencedTokenId: "opacityRef",
    },
  }

  expect(ColorHelper.formattedColorOrVariableName(color, tokens, testOptions)).toBe("rgba(135, 100, 200, var(--opacityRef))")
})

test("formattedColorOrVariableName_partialBothReferences", () => {
  const color: ColorTokenValue = {
    ...testColor,
    color: {
      ...testColor.color,
      referencedTokenId: "colorRef",
    },
    opacity: {
      ...testColor.opacity,
      referencedTokenId: "opacityRef",
    },
  }

  expect(ColorHelper.formattedColorOrVariableName(color, tokens, testOptions)).toBe("rgba(var(--colorRef), var(--opacityRef))")
})
