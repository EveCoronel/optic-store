const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  DB_PASSWORD: process.env.DB_PASSWORD,
  DATASOURCE: process.env.DATASOURCE,
  DOMAIN_MAILGUN: process.env.DOMAIN_MAILGUN,
  APIKEY_MAILGUN: process.env.APIKEY_MAILGUN,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  SERVER_DOMAIN: process.env.SERVER_DOMAIN
}
