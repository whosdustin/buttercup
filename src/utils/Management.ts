// tslint:disable: member-access no-console
import axios, { AxiosRequestConfig } from 'axios'

export default class Management {
  static async token() {
    try {
      const body = {
        client_id: process.env.VUE_APP_MANAGEMENT_ID,
        client_secret: process.env.VUE_APP_MANAGEMENT_SECRET,
        audience: process.env.VUE_APP_AUTH_AUDIENCE,
        grant_type: 'client_credentials'
      }

      const options: AxiosRequestConfig = {
        method: 'post',
        url: 'https://dev-hxgm-uap.auth0.com/oauth/token',
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(body)
      }

      const { data } = await axios(options)
      return data
    } catch (error) {
      console.error(error)
    }
  }
}
