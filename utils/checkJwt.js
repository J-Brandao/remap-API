const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

module.exports = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-x782vrhf.eu.auth0.com/.well-known/jwks.json`
  }),
  audience: 'https://dev-x782vrhf.eu.auth0.com/api/v2/',
  issuer: `https://dev-x782vrhf.eu.auth0.com/`,
  algorithms: ["RS256"]
});