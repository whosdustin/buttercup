import Vue from 'vue'
import _Vue from 'vue'
import createAuth0Client from '@auth0/auth0-spa-js'
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client'

const DEFAULT_REDIRECT_CALLBACK = (option: any) =>
  window.history.replaceState({}, document.title, window.location.pathname)

let instance: any

export const getInstance = () => instance

export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) {
    return instance
  }

  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        auth0Client: {} as Auth0Client,
        popupOpen: false,
        error: null
      }
    },
    methods: {
      async loginWithPopup(o: PopupLoginOptions) {
        this.popupOpen = true

        try {
          await this.auth0Client.loginWithPopup(o)
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = await this.auth0Client.isAuthenticated();
          this.error = null;
        } catch (e) {
          /* tslint:disable-next-line */
          console.error('loginWithPopup:', e)
          this.error = e
        } finally {
          this.popupOpen = false
        }
      },
      async handleRedirectCallback() {
        this.loading = true
        try {
          await this.auth0Client.handleRedirectCallback()
          this.user = await this.auth0Client.getUser()
          this.isAuthenticated = true
          this.error = null
        } catch (e) {
          this.error = e
        } finally {
          this.loading = false
        }
      },
      /** Authenticates the user using the redirect method */
      loginWithRedirect(o: RedirectLoginOptions) {
        return this.auth0Client.loginWithRedirect(o)
      },
      /** Returns all the claims present in the ID token */
      getIdTokenClaims(o: getIdTokenClaimsOptions) {
        return this.auth0Client.getIdTokenClaims(o)
      },
      /** Returns the access token. If the token is invalid or missing, a new one is retrieved */
      getTokenSilently(o: GetTokenSilentlyOptions) {
        return this.auth0Client.getTokenSilently(o)
      },
      /** Gets the access token using a popup window */
      getTokenWithPopup(o: GetTokenWithPopupOptions) {
        return this.auth0Client.getTokenWithPopup(o)
      },
      /** Logs the user out and removes their session on the authorization server */
      logout(o: LogoutOptions) {
        return this.auth0Client.logout(o)
      }
    },
    async created() {
      // Create a new instance of the SDK client using members of the given options object
      this.auth0Client = await createAuth0Client({
        domain: options.domain,
        client_id: options.clientId,
        redirect_uri: redirectUri,
        audience: options.audience,
        connection: 'slack-meredith',
      });

      try {
        // If the user is returning to the app after authentication..
        if (
          window.location.search.includes('code=') &&
          window.location.search.includes('state=')
        ) {
          // handle the redirect and retrieve tokens
          const { appState } = await this.auth0Client.handleRedirectCallback();

          // Notify subscribers that the redirect callback has happened, passing the appState
          // (useful for retrieving any pre-authentication state)
          onRedirectCallback(appState);
        }
      } catch (e) {
        this.error = e;
      } finally {
        // Initialize our internal authentication state
        this.isAuthenticated = await this.auth0Client.isAuthenticated();
        this.user = await this.auth0Client.getUser();
        this.loading = false;
      }
    }
  })

  return instance
}

// Create a simple Vue plugin to expose the wrapper object throughout the application
/* tslint:disable */
export const Auth0Plugin = {
  install(Vue: typeof _Vue, options: any) {
    Vue.prototype.$auth = useAuth0(options)
  }
}
