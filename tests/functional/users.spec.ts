import { test } from '@japa/runner'

test.group('Users', () => {

  test('create user', async ({ client }) => {
    const response = await client.post('/users').json({
      name: 'Bhayron',
      email: 'bhayronklivilan2@gmail.com',
      password: 'secret123'
    })
    response.assertStatus(201)
  })

  test('login sucess users', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'bhayronklivilan2@gmail.com',
      password: 'secret123'
    })
    response.assertStatus(200)
  })

  test('login error users', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'bhayronklivilan2@gmail.com',
      password: 'secret122'
    })
    response.assertStatus(400)
    response.assertBodyContains({
      "errors": [
        {
          "message": "E_INVALID_AUTH_PASSWORD: Password mis-match"
        }
      ]
    })
  })

  test('list users', async ({ client }) => {
    const response = await client.get('/users')
    response.assertStatus(200)
  })

  test('update user', async ({ client }) => {
    const response = await client.put('/users/1').json({
      name: 'Bhayron Klivilan'
    })
    response.assertStatus(200)
  })

  test('register profile user', async ({ client }) => {
    const response = await client.post('/profile').json({
      userId: '1',
      fullName: 'Bhayron Klivilan Cavalcante Barros',
      avatarUrl: 'https://meusite.com.br'
    })
    response.assertStatus(201)
  })

  test('delete user', async ({ client }) => {
    const response = await client.delete('/users/1')
    response.assertStatus(200)
  })
})
