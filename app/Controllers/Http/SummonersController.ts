import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SummonersController {
  public async index(ctx: HttpContextContract) {
    const { name } = ctx.request.qs()

    return { summoner: name }
  }
}
