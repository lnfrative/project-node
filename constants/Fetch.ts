import axios from 'axios'
import Endpoint from './endpoint'
import RiotSummoner from '../interfaces/RiotSummoner'

export default class Fetch extends Endpoint {
  public async summonerByName(): Promise<RiotSummoner> {
    const { data } = await axios(this.generateSummonerByName())
    return data
  }

  public async summonerByPuuid(): Promise<RiotSummoner> {
    const { data } = await axios(this.generateSummonerByPuuid())
    return data
  }
}
