import { NamingHelper } from '../../src/transforms/NamingHelper'
import { StringCase } from '../../src/enums/StringCase'

test('codeSafeVariableName_autosplit_1', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.capitalCase)).toBe('Test Variable')
})

test('codeSafeVariableName_autosplit_2', () => {
  const string = 'test_variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.capitalCase)).toBe('Test Variable')
})

test('codeSafeVariableName_autosplit_3', () => {
  const string = 'testVariable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.capitalCase)).toBe('Test Variable')
})

test('codeSafeVariableName_startsWithNumber', () => {
  const string = '2testVariable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.capitalCase)).toBe('_2test Variable')
})

test('codeSafeVariableName_containsGarbage', () => {
  const string = 'test##Variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.capitalCase)).toBe('Test Variable')
})

test('codeSafeVariableName_camelCase', () => {
  const string = 'Test Variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.camelCase)).toBe('testVariable')
})

test('codeSafeVariableName_capitalCase', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.capitalCase)).toBe('Test Variable')
})

test('codeSafeVariableName_constantCase', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.constantCase)).toBe('TEST_VARIABLE')
})

test('codeSafeVariableName_dotCase', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.dotCase)).toBe('test.variable')
})

test('codeSafeVariableName_headerCase', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.headerCase)).toBe('Test-Variable')
})

test('codeSafeVariableName_noCase', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.noCase)).toBe('test variable')
})

test('codeSafeVariableName_paramCase', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.paramCase)).toBe('test-variable')
})

test('codeSafeVariableName_pascalCase', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.pascalCase)).toBe('TestVariable')
})

test('codeSafeVariableName_pathCase', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.pathCase)).toBe('test/variable')
})

test('codeSafeVariableName_sentenceCase', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.sentenceCase)).toBe('Test variable')
})

test('codeSafeVariableName_snakeCase', () => {
  const string = 'test variable'
  expect(NamingHelper.codeSafeVariableName(string, StringCase.snakeCase)).toBe('test_variable')
})

test('codeSafeVariableNameForToken_case_1', () => {
  const string = 'test variable'
  const token = {
    name: '1000'
  }
  const tokenGroup = {
    name: 'Red',
    path: ['Brand', 'Primary'],
    isRoot: false
  }
  expect(NamingHelper.codeSafeVariableNameForToken(token, StringCase.snakeCase, tokenGroup, 'colors')).toBe(
    'colors_brand_primary_red_1000'
  )
})

test('codeSafeVariableNameForToken_case_2', () => {
  const string = 'test variable'
  const token = {
    name: 'red1000'
  }
  const tokenGroup = {
    name: 'Red',
    path: ['Brand'],
    isRoot: false
  }
  expect(NamingHelper.codeSafeVariableNameForToken(token, StringCase.pathCase, tokenGroup, null)).toBe(
    'brand/red/red1000'
  )
})
