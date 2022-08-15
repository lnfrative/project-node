export default class Endpoint {
  private SUMMONER_BY_NAME =
    'https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summonerName}'
  private SUMMONER_BY_PUUID =
    'https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}'
  protected _region: string
  protected _summonerName: string
  protected _puuid: string

  public generateSummonerByName(): string {
    return encodeURI(
      this.SUMMONER_BY_NAME.replace('{region}', this._region).replace(
        '{summonerName}',
        this._summonerName
      )
    )
  }

  public generateSummonerByPuuid(): string {
    return encodeURI(
      this.SUMMONER_BY_PUUID.replace('{region}', this._region).replace(
        '{puuid}',
        this._puuid,
      )
    )
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
