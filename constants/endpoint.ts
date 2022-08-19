import { AxiosRequestConfig } from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class Endpoint {
  private SUMMONER_BY_NAME =
    'https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summonerName}'
  private SUMMONER_BY_PUUID =
    'https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}'
  protected _region: string
  protected _summonerName: string
  protected _puuid: string

  public generateSummonerByName(): AxiosRequestConfig {
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

  public generateSummonerByPuuid(): AxiosRequestConfig {
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
    return this
  }
}
