import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { string } from '@ioc:Adonis/Core/Helpers'
import Controller from 'App/Controllers/Http/Controller'
import axios from 'axios'
import Region from '../../../constants/region'
import Env from '@ioc:Adonis/Core/Env'

export default class SummonersController extends Controller {
  public async index(ctx: HttpContextContract) {
    let data: any[] = []
    const qs = ctx.request.qs()
    const name = decodeURI(qs.name)

    await this.prisma.$connect()

    if (name) {
      const storedSummoners = await this.prisma.summoner.findMany({
        where: { name: { contains: name, mode: 'insensitive' } },
      })

      const regionsWithoutSummoners = this.getRegionsWithoutSummoner(storedSummoners)
      const fetchedSummoners = await this.fetchSummonersByName(name, regionsWithoutSummoners)

      await this.saveSummoners(fetchedSummoners)

      data = data.concat(storedSummoners).concat(fetchedSummoners)
    }
    await this.prisma.$disconnect()
    return { content: data }
  }

  public async show(ctx: HttpContextContract) {
    let content

    const qs = ctx.request.qs()
    const { id } = ctx.params
    const include = {
      matches: qs.matches === 'true',
      playeds: qs.playeds === 'true',
      playedChampions: qs.playedChampions === 'true',
    }

    const summoner = await this.prisma.summoner.findUnique({
      where: { id },
      include: {
        matches: include.matches,
        playeds: include.playeds && {
          include: {
            champions: include.playedChampions,
          },
        },
      },
    })

    if (summoner) {
      const { summonerLevel, profileIconId } = await this.fetchSummonerByPuuid(
        summoner.puuid,
        summoner.region
      )

      await this.prisma.summoner.update({
        where: { id },
        data: {
          summonerLevel,
          profileIconId,
        },
      })

      content = {
        ...summoner,
        profileIconId,
        summonerLevel,
      }
    }

    return { content }
  }

  private saveSummoners(summoners: Summoner[]) {
    return Promise.all(
      summoners.map(async (summoner) => {
        await this.prisma.summoner.upsert({
          where: { puuid: summoner.puuid },
          update: {
            name: summoner.name,
            summonerLevel: summoner.summonerLevel,
            region: summoner.region,
            playerId: summoner.playerId,
            accountId: summoner.accountId,
          },
          create: summoner,
        })
      })
    )
  }

  private getRegionsWithoutSummoner(summoners: Summoner[]) {
    const regionsWithSummoners = summoners.map((summoner) => summoner.region)
    return Region.all.filter((region) => !regionsWithSummoners.includes(region))
  }

  private async fetchSummonerByPuuid(puuid: string, region: string) {
    const { data } = await axios({
      url: this.endpoint.setPuuid(puuid).setRegion(region).generateSummonerByPuuid(),
      headers: {
        ['X-Riot-Token']: Env.get('RIOT_API_KEY'),
      },
    })

    return data
  }

  private async fetchSummonersByName(summonerName: string, regions: string[]) {
    this.endpoint.setSummonerName(summonerName)
    const summoners = await Promise.all(
      regions.map(async (region) => {
        let content
        try {
          const {
            data: { id, accountId, puuid, name, profileIconId, summonerLevel },
          } = await axios({
            url: this.endpoint.setRegion(region).generateSummonerByName(),
            headers: {
              ['X-Riot-Token']: Env.get('RIOT_API_KEY'),
            },
          })

          content = {
            id: string.generateRandom(15),
            region,
            playerId: id,
            accountId,
            puuid,
            name,
            profileIconId,
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
