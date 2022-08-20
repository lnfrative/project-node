import axios from 'axios'
import Endpoint from './endpoint'
import RiotSummoner from '../interfaces/RiotSummoner'
import RiotMatch from '../interfaces/RiotMatch'

export default class Fetch extends Endpoint {
  public async summonerByName(): Promise<RiotSummoner> {
    const { data } = await axios(this.generateSummonerByName())
    return data
  }

  public async summonerByPuuid(): Promise<RiotSummoner> {
    const { data } = await axios(this.generateSummonerByPuuid())
    return data
  }

  public async matchById(): Promise<RiotMatch> {
    const { data } = await axios(this.generateMatchById())
    return data
  }

  public async matchesByPuuid(): Promise<string[]> {
    const { data } = await axios(this.generateMatchesByPuuid())
    return data
  }
}
