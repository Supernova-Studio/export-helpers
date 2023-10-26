import { NetworkHelper } from '../../src/network/NetworkHelper'
import { Supernova } from '@supernovaio/sdk'

// Package JSON file URL of this repository
const testFileUrl = 'https://raw.githubusercontent.com/Supernova-Studio/export-helpers/main/package.json'

test('downloadTextFile', async () => {
  const sdk = new Supernova('', {})
  const data = await NetworkHelper.fetchAsText(sdk as any, testFileUrl)
  expect(data).toBeDefined()
})

test('downloadBinaryData', async () => {
  const sdk = new Supernova('', {})
  const data = await NetworkHelper.fetchAsData(sdk as any, testFileUrl)
  expect(data).toBeDefined()
})

test('downloadJSONData', async () => {
  const sdk = new Supernova('', {})
  const data = await NetworkHelper.fetchAsJSON(sdk as any, testFileUrl)
  expect(data).toBeDefined()
})
