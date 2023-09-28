import { Token, TokenGroup } from "@supernova-studio/pulsar-next"
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from "change-case"
import { StringCase } from "../enums/StringCase"

/** Helps with transformation of strings */
export class NamingHelper {
  static codeSafeVariableNameForToken(token: Token, format: StringCase, parent: TokenGroup | null, prefix: string | null): string {
    // Create array with all path segments and token name at the end
    let fragments: Array<string> = []
    if (parent) {
      fragments = [...parent.path]
      if (!parent.isRoot) {
        fragments.push(parent.name)
      }
    }
    fragments.push(token.name)

    if (prefix && prefix.length > 0) {
      fragments.unshift(prefix)
    }

    return NamingHelper.codeSafeVariableName(fragments, format)
  }
  /**
   * Transforms name into specific case from provided path fragments. Will also smartly split fragments into subfragments -
   * if they contain spaces, case changes from one letter to another and so on.
   *
   * Also fixes additional problems, like the fact that variable name can't start with numbers - variable will be prefixed with "_" in that case
   */
  static codeSafeVariableName(fragments: Array<string>, format: StringCase): string {
    let sentence = fragments.join(" ")

    // Only allow letters, digits, underscore and hyphen
    sentence = sentence.replaceAll(/[^a-zA-Z0-9_-]/g, "_")

    // If variable starts with anything but letter, add "_" in front of it
    if (sentence.match(/^[^a-zA-Z]/)) {
      sentence = "_" + sentence
    }

    switch (format) {
      case StringCase.camelCase:
        sentence = camelCase(sentence)
        break
      case StringCase.capitalCase:
        sentence = capitalCase(sentence)
        break
      case StringCase.constantCase:
        sentence = constantCase(sentence)
        break
      case StringCase.dotCase:
        sentence = dotCase(sentence)
        break
      case StringCase.headerCase:
        sentence = headerCase(sentence)
        break
      case StringCase.noCase:
        sentence = noCase(sentence)
        break
      case StringCase.paramCase:
        sentence = paramCase(sentence)
        break
      case StringCase.pascalCase:
        sentence = pascalCase(sentence)
        break
      case StringCase.pathCase:
        sentence = pathCase(sentence)
        break
      case StringCase.sentenceCase:
        sentence = sentenceCase(sentence)
        break
      case StringCase.snakeCase:
        sentence = snakeCase(sentence)
        break
      default:
        break
    }

    return sentence
  }
}
