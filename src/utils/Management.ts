// tslint:disable: no-console
import axios, { AxiosRequestConfig } from 'axios'

export default class Management {
  private userId: any;
  private api?: string;
  constructor(
    userId: string,
  ) {
    this.userId = userId
    this.api = process.env.VUE_APP_AUTH_AUDIENCE
  }

  get body() {
    return {
      client_id: process.env.VUE_APP_MANAGEMENT_ID,
      client_secret: process.env.VUE_APP_MANAGEMENT_SECRET,
      audience: process.env.VUE_APP_AUTH_AUDIENCE,
      grant_type: 'client_credentials'
    }
  }

  get options(): AxiosRequestConfig {
    return {
      method: 'post',
      url: 'https://dev-hxgm-uap.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      data: JSON.stringify(this.body)
    }
  }

  public async token() {
    try {
      const { data } = await axios(this.options)
      const response = await axios.get(`${this.api}users/${this.userId.sub}`, {
        headers: { Authorization: `Bearer ${data.access_token}` }
      })
      return response.data.token
    } catch (error) {
      console.error(error)
    }
  }
}
