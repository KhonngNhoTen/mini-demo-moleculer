/**
 * @typedef {Object} BaseInfoError
 * @property {string} type
 * @property {number} httpCode
 * @property {string} idError
 */

const ApiError = require("./ApiError");

/**
 * @typedef {Object} DetailApiError
 * @property {string} vi
 * @property {string} en
 */
class ErrorBuilder {
  /** @param {BaseInfoError} baseInfo */
  constructor(baseInfo) {
    this.baseInfo = baseInfo;
  }

  /** @param {DetailApiError} message */
  addMessage(message) {
    this.massage = message;
    return this;
  }
  /** @param {DetailApiError} suggest */
  addSuggest(suggest) {
    this.suggest = suggest;
    return this;
  }

  addField(field) {
    this.field = field;
    return this;
  }

  /** @param {"body"|"query"|"params"} location */
  addLocation(location) {
    this.location = location;
    return this;
  }
  /** @param {ApiError} subError */
  addSubErrors(subError) {
    if (this.subErrors === undefined) this.subErrors = [];
    this.subErrors.push(subError);
    return this;
  }

  build() {
    return new ApiError(
      this.baseInfo.idError,
      this.baseInfo.type,
      this.baseInfo.httpCode,
      this.massage,
      this.suggest,
      this.field,
      this.location,
      this.subErrors
    );
  }
}

module.exports = { ErrorBuilder };
