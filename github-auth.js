
var GitHubStrategy = require('passport-github').Strategy

module.exports = function (options) {

  var seneca = this

  var authPlugin = new GitHubStrategy({
      clientID:       options.clientID,
      clientSecret:   options.clientSecret,
      callbackURL:    options.urlhost + '/auth/github/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      var data = {
        email: profile.emails.length > 0 ? profile.emails[0].value : null,
        nick: profile.username || profile.displayName,
        name: profile.displayName,
        identifier: '' + profile.id,
        credentials: {
          token: accessToken,
          secret: refreshToken},
        userdata: profile,
        when: new Date().toISOString()
      };
      done(null, data);
    }
  )

  seneca.act({role: 'auth', cmd: 'register_service', service: 'github', plugin: authPlugin, conf: options})

  return {
    name: 'github-auth'
  }
}
