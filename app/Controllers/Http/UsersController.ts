import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.query().preload('profile')
    return response.ok(users)
  }
  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create(data)
    return response.created({ user })
  }
  public async update({ request, params }: HttpContextContract) {
    const data = request.only(['name'])
    const user = await User.find(params.id)
    user?.merge({
      name: data.name
    })
    return user
  }
  public async destroy({ response, params }: HttpContextContract) {
    const user = await User.find(params.id)
    user?.delete()
    return response.status(200)
  }
  public async profileRegister({ request, response }: HttpContextContract) {
    const data = request.only(['userId', 'fullName', 'avatarUrl'])
    const profile = await Profile.create(data)
    return response.created({ profile })
  }
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    const user = await User.query().where('email', email).first()
    if (user) {
      const token = await auth.use('api').attempt(email, password)
      return response.status(200).json({ token: token.token, user: user.serialize() })
    } else {
      return response.unauthorized({ message: 'Credenciais inválidas' })
    }

  }
}
