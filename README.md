![Seneca](http://senecajs.org/files/assets/seneca-logo.png)
> A [Seneca.js](https://github.com/senecajs/) a seneca-auth plugin

# seneca-github-auth - a seneca-auth plugin

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Dependency Status][david-badge]][david-url]
[![Gitter chat][gitter-badge]][gitter-url]


This plugin is used by [seneca-auth](https://www.npmjs.com/package/seneca-auth) for authenticating via github login.
It uses [PassportJS](http://passportjs.org). The [seneca-auth](https://www.npmjs.com/package/seneca-auth) is the
authentication plugin used by [Seneca](http://senecajs.org) toolkit.

For a gentle introduction to Seneca itself, see the [senecajs.org](http://senecajs.org) site.

If you're using this plugin module, feel to contact on twitter if you have any questions! :) [@rjrodger](http://twitter.com/rjrodger)

## About

seneca-github-auth's source can be read in an annotated fashion by,

- running `npm run annotate`
- viewing [online](http://htmlpreview.github.io/?https://github.com/senecajs/seneca-github-auth/blob/master/doc/github-auth.html).

The annotated source can be found locally at [here](./doc/github-auth.html).

### Install

```sh
npm install seneca-github-auth
```

### Using Github Auth

When using seneca-auth the github auth must be initialized using:

```
..........
    service: {
      "local": {},
      "github" : {
        "clientID" : "your client id",
        "clientSecret" : "app secret",
        "urlhost" : "server host",
        "serviceParams": {
          "scope" : [
            .....
          ]
        }
      }
    }
..........

```

Note: serviceParams can be used to pass any other parameter to the passport github strategy. More information can be found in the Github documentation.

## Other information

There is provided a default seneca action that will prepare user data to a more convenient structure.
If this data structure is not matching the expected user data structure used by your application, you can overwrite the
seneca action and implement your own github_login_data action.

 - {role: 'auth', prepare: 'github_login_data'}

The JSON object provided for this actions contains following data from Github login:
 - accessToken
 - refreshToken
 - profile


 Note: You can provide also the callbackUrl as part of the options. If not provided then a default value is used.

 Default value for callbackUrl: '/auth/github/callback'

##  License

 Copyright Nicolas Herment and other contributors 2015, Licensed under [MIT][].

 [MIT]: ./LICENSE
 [npm-badge]: https://badge.fury.io/js/seneca-github-auth.svg
 [npm-url]: https://badge.fury.io/js/seneca-github-auth.svg
 [david-badge]: https://david-dm.org/senecajs/seneca-github-auth.svg
 [david-url]: https://david-dm.org/senecajs/seneca-github-auth
 [gitter-badge]: https://badges.gitter.im/senecajs/seneca.png
 [gitter-url]: https://gitter.im/senecajs/seneca
 [travis-badge]: https://travis-ci.org/senecajs/seneca-github-auth.svg
 [travis-url]: https://travis-ci.org/senecajs/seneca-github-auth
