import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { api: 'is running' }
})
Route.get('/users', 'UsersController.index')
Route.post('/users', 'UsersController.store')
Route.put('/users/:id', 'UsersController.update')
Route.delete('/users/:id', 'UsersController.destroy')
Route.post('/profile', 'UsersController.profileRegister')

Route.post('/login', 'UsersController.login')
