import { PrismaClient } from '@prisma/client'
import Endpoint from '../../../constants/endpoint'

export default class Controller {
  protected prisma: PrismaClient
  protected endpoint: Endpoint
  constructor() {
    this.endpoint = new Endpoint()
    this.prisma = new PrismaClient()
  }
}
