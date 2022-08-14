import { PrismaClient } from '@prisma/client'

export default class Controller {
  protected prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient()
  }
}
