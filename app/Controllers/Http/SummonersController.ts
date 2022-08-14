import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Controller from 'App/Controllers/Http/Controller'
import axios from 'axios'
import Region from '../../../constants/region'
import Endpoint from '../../../constants/endpoint'
import Env from '@ioc:Adonis/Core/Env'

export default class SummonersController extends Controller {
  public async index(ctx: HttpContextContract) {
    let data: any[] = []
    const qs = ctx.request.qs()
    const name = decodeURI(qs.name)

    await this.prisma.$connect()

    if (name) {
      const storedSummoners = await this.prisma.summoner.findMany({
        where: { name: { contains: string.encodeSymbols(name), mode: 'insensitive' } },
      })

      const regionsWithoutSummoners = this.getRegionsWithoutSummoner(storedSummoners)
      const fetchedSummoners = await this.fetchSummonersByName(name, regionsWithoutSummoners)

      // TODO: This await delays the response time, it can probably be removed.
      await this.saveSummoners(fetchedSummoners)

      data = data.concat(storedSummoners).concat(fetchedSummoners)
    }
    await this.prisma.$disconnect()
    return { content: data }
  }

  private async saveSummoners(summoners: Summoner[]) {
    await Promise.all(
      summoners.map(async (summoner) => {
        await this.prisma.summoner.upsert({
          where: { puuid: summoner.puuid },
          update: {
            name: summoner.name,
            summonerLevel: summoner.summonerLevel,
            revisionDate: summoner.revisionDate,
            region: summoner.region,
            summonerId: summoner.summonerId,
            accountId: summoner.accountId,
          },
          create: summoner,
        })
      })
    )
  }

  private getRegionsWithoutSummoner(summoners: Summoner[]) {
    const regions = Region.all
    summoners.forEach((summoner) => regions.splice(regions.indexOf(summoner.region, 1)))
    return regions
  }

  private async fetchSummonersByName(summonerName: string, regions: string[]) {
    const endpoint = new Endpoint()
    endpoint.setSummonerName(summonerName)
    const summoners = await Promise.all(
      regions.map(async (region) => {
        let content
        try {
          const {
            data: { id, accountId, puuid, name, profileIconId, revisionDate, summonerLevel },
          } = await axios({
            url: endpoint.setRegion(region).generateSummonerByName(),
            headers: {
              ['X-Riot-Token']: Env.get('RIOT_API_KEY'),
            },
          })

          content = {
            id: string.generateRandom(15),
            region,
            summonerId: id,
            accountId,
            puuid,
            name,
            profileIconId,
            revisionDate,
            summonerLevel,
          }
        } catch (e) {
          // TODO: Handle errors.
        }

        return content
      })
    )
    return summoners.filter((s) => !!s)
  }
}
