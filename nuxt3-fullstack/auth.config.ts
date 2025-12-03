import GoogleProvider from '@auth/core/providers/google'
import Auth0Provider from '@auth/core/providers/auth0'

export default ({
  providers: [
    GoogleProvider({
      clientId: 'GOOGLE_CLIENT_ID',
      clientSecret: 'GOOGLE_CLIENT_SECRET'
    }),
    Auth0Provider({
      clientId: 'AUTH0_CLIENT_ID',
      clientSecret: 'AUTH0_CLIENT_SECRET',
      issuer: 'https://YOUR_AUTH0_DOMAIN'
    })
  ]
})