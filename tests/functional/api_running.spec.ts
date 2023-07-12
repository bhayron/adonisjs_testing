import { test } from '@japa/runner'

test('display api is running', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  response.assertBodyContains({ api: 'is running' })
})
