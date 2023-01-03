const { HTTP_STATUS } = require("../constants/api.constants");
const logger = require("../logger/logger");
const { errorResponse } = require("../utils/utils");


const errorMiddleware = (error, req, res, next) => {
  /* console.log("dentro del middleware", error) */
  logger.error(`unexpected error: ${error}`)
  const errorStatus = error.statusCode || HTTP_STATUS.INTERNAL_ERROR;
  const errorMessage = error.message || "There was an unexpected error";
  const errorDetails = error.message ? null : error;
  return res.status(errorStatus).json(errorResponse(errorMessage, errorDetails));
}

module.exports = errorMiddleware;