
var GitHubStrategy = require('passport-github').Strategy
var _ = require('lodash')

module.exports = function (options) {

  var seneca = this
  var service = 'github'

  var params = {
    clientID:       options.clientID,
    clientSecret:   options.clientSecret,
    callbackURL:    options.urlhost + (options.callbackUrl || '/auth/github/callback')
  }
  params = _.extend(params, options.serviceParams || {})

  var authPlugin = new GitHubStrategy(params,
    function (accessToken, refreshToken, profile, done) {
      seneca.act(
        {
          role: 'auth',
          prepare: 'github_login_data',
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile
        }, done)
    }
  )

  var prepareLoginData = function(args, cb){
    var accessToken = args.accessToken
    var refreshToken = args.refreshToken
    var profile = args.profile

    var data = {
      identifier: '' + profile.id,
      nick: profile.username,
      username: profile.username,
      credentials: {
        access: accessToken,
        refresh: refreshToken
      },
      userdata: profile,
      when: new Date().toISOString()
    };

    data = _.extend({}, data, profile)
    if (data.emails && data.emails.length > 0 && data.emails[0].value){
      data.email = data.emails[0].value
      data.nick = data.email
    }
    if (data.name && _.isObject(data.name)){
      data.firstName = data.name.givenName
      data.lastName = data.name.familyName
      data.name = data.name || (data.firstName + ' ' + data.lastName)
      delete data.name
    }
    data.name = data.name || data.displayName

    data[ service + '_id' ] = data.identifier

    data.service = data.service || {}
    data.service[ service ] = {
      credentials: data.credentials,
      userdata: data.userdata,
      when: data.when
    }

    cb(null, data)
  }

  seneca.add({role: 'auth', prepare: 'github_login_data'}, prepareLoginData)

  seneca.act({role: 'auth', cmd: 'register_service', service: service, plugin: authPlugin, conf: options})

  return {
    name: 'github-auth'
  }
}
