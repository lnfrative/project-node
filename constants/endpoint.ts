export default class Endpoint {
  private SUMMONER_BY_NAME =
    'https://{region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/{summonerName}'
  protected _region: string
  protected _summonerName: string

  public generateSummonerByName(): string {
    return encodeURI(
      this.SUMMONER_BY_NAME.replace('{region}', this._region).replace(
        '{summonerName}',
        this._summonerName
      )
    )
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
