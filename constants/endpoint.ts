import { AxiosRequestConfig } from 'axios'
import Region from './region'
import Env from '@ioc:Adonis/Core/Env'

export default class Endpoint {
  private SUMMONER_BY_NAME =
    'https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summonerName}'
  private SUMMONER_BY_PUUID =
    'https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}'
  private MATCHES_BY_PUUID =
    'https://{regionGroup}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start={start}&count={count}'
  private MATCH_BY_ID = 'https://{regionGroup}.api.riotgames.com/lol/match/v5/matches/{matchId}'
  protected _region: string
  protected _summonerName: string
  protected _puuid: string
  protected _regionGroup: string
  protected _matchId: string
  protected _start: string = '0'
  protected _count: string = '20'

  protected generateSummonerByName(): AxiosRequestConfig {
    const url = encodeURI(
      this.SUMMONER_BY_NAME.replace('{region}', this._region).replace(
        '{summonerName}',
        this._summonerName
      )
    )

    return {
      url,
      headers: {
        ['X-Riot-Token']: Env.get('RIOT_API_KEY'),
      },
    }
  }

  protected generateSummonerByPuuid(): AxiosRequestConfig {
    const url = encodeURI(
      this.SUMMONER_BY_PUUID.replace('{region}', this._region).replace('{puuid}', this._puuid)
    )

    return {
      url,
      headers: {
        ['X-Riot-Token']: Env.get('RIOT_API_KEY'),
      },
    }
  }

  protected generateMatchById(): AxiosRequestConfig {
    const url = encodeURI(
      this.MATCH_BY_ID.replace('{regionGroup}', this._regionGroup).replace(
        '{matchId}',
        this._matchId
      )
    )

    return {
      url,
      headers: {
        ['X-Riot-Token']: Env.get('RIOT_API_KEY'),
      },
    }
  }

  protected generateMatchesByPuuid(): AxiosRequestConfig {
    const url = encodeURI(
      this.MATCHES_BY_PUUID.replace('{regionGroup}', this._regionGroup)
        .replace('{puuid}', this._puuid)
        .replace('{count}', this._count)
        .replace('{start}', this._start)
    )

    return {
      url,
      headers: {
        ['X-Riot-Token']: Env.get('RIOT_API_KEY'),
      },
    }
  }

  public setMatchId(matchId: string): this {
    this._matchId = matchId
    return this
  }

  public setCount(count: string): this {
    this._count = count
    return this
  }

  public setStart(start: string): this {
    this._start = start
    return this
  }

  public setPuuid(puuid: string): this {
    this._puuid = puuid
    return this
  }

  public setSummonerName(summonerName: string): this {
    this._summonerName = summonerName
    return this
  }

  public setRegion(region: string): this {
    this._region = region
    this._regionGroup = Region.continents[region]
    return this
  }
}
