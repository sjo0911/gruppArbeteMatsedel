const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-fx63i2zd.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://dev-fx63i2zd.eu.auth0.com/api/v2/',
  issuer: [`https://dev-fx63i2zd.eu.auth0.com/`],
  algorithms: ['RS256']
});

module.exports = jwtCheck;