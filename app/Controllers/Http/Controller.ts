import { PrismaClient } from '@prisma/client'
import Fetch from '../../../constants/Fetch'

export default class Controller {
  protected prisma: PrismaClient
  protected fetch: Fetch
  constructor() {
    this.fetch = new Fetch()
    this.prisma = new PrismaClient()
  }
}
