const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  DB_PASSWORD: process.env.DB_PASSWORD,
  DATASOURCE: process.env.DATASOURCE,
  DOMAIN_MAILGUN: process.env.DOMAIN_MAILGUN,
  APIKEY_MAILGUN: process.env.APIKEY_MAILGUN,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  SERVER_DOMAIN: process.env.SERVER_DOMAIN,
  ADMIN_NUMBER: process.env.ADMIN_NUMBER,
  TWILIO_WHATSAPP: process.env.TWILIO_WHATSAPP,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_NUMBER: process.env.TWILIO_NUMBER
}
