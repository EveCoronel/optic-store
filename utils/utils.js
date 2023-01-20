const moment = require("moment/moment");
const envConfig = require('../config')
const mailgun = require("mailgun-js");
const logger = require("../logger/logger");
const twilio = require("twilio")

const twilioClient = twilio(
    envConfig.TWILIO_ACCOUNT_SID,
    envConfig.TWILIO_AUTH_TOKEN
)

const mg = mailgun({ apiKey: envConfig.APIKEY_MAILGUN, domain: envConfig.DOMAIN_MAILGUN });


const sendEmail = (to, subject, text) => {

    const data = {
        from: 'Excited User evelyncoronel05@gmail.com',
        to,
        subject,
        text
    };

    mg.messages().send(data, function (error, body) {
        logger.info(`${subject} email was sent successfully to ${to}`);
    });
}




const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: moment().format('DD/MM/YYYY - HH:mm')
    }
};



const successResponse = (data) => {
    return {
        success: true,
        data
    }
}

const errorResponse = (message, details = null) => {
    return {
        success: false,
        message,
        details
    }
}

const sendWaNotification = async (message, waNumber) => {

    let to = 'whatsapp:+59893651889'
    if (waNumber && waNumber.includes('+')) to = `whatsapp:${waNumber}`
    else to = `whatsapp:+${waNumber}`
    const option = {
        body: message,
        from: envConfig.TWILIO_WHATSAPP,
        to
    }
    try {
        await twilioClient.messages.create(option)
        logger.info(`${subject} Whatsapp was sent successfully to ${to}`);
    }
    catch (err) {
        return { sent: false }
    }

    return { sent: true }
}


const sendSMS = async (message, to) => {
    const option = {
        body: message,
        from: envConfig.TWILIO_NUMBER,
        to
    }
    try {
        await twilioClient.messages.create(option)
    } catch (err) {
        return { sent: false }
    }
    return { sent: true }

}


class HttpError {
    constructor(status, message, details) {
        this.statusCode = status;
        this.message = message;
        this.details = details;
    }
}

const formatUser = (name) => {
    return {
        name: name
    }
}

const getAge = (birthdate) => {
    let today = new Date();
    let birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const validateEmail = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    successResponse,
    errorResponse,
    HttpError,
    formatMessage,
    formatUser,
    getAge,
    validateEmail,
    sendEmail,
    sendWaNotification,
    sendSMS
}



