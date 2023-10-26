import { Token, TokenGroup } from '@supernovaio/sdk-exporters'
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
  snakeCase
} from 'change-case'
import { StringCase } from '../enums/StringCase'

/** A utility class to help with transformation of different strings to code-safe names */
export class NamingHelper {
  static codeSafeVariableNameForToken(
    token: Pick<Token, 'name'>,
    format: StringCase,
    parent: Pick<TokenGroup, 'path' | 'isRoot' | 'name'> | null,
    prefix: string | null
  ): string {
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
  static codeSafeVariableName(fragments: Array<string> | string, format: StringCase): string {
    let sentence = typeof fragments === 'string' ? fragments : fragments.join(' ')

    // Only allow letters, digits, underscore and hyphen
    sentence = sentence.replaceAll(/[^a-zA-Z0-9_-]/g, '_')

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

    // If variable starts with anything but letter, add "_" in front of it
    if (sentence.match(/^[^a-zA-Z]/)) {
      sentence = '_' + sentence
    }

    return sentence
  }

  /** Convert any string to CSS variable reference */
  static nameAsCSSVarReference(name: string): string {
    return `var(--${name})`
  }

  /** Conver any string to CSS variable declaration */
  static nameAsCSSVarDeclaration(name: string): string {
    return `--${name}`
  }
}
