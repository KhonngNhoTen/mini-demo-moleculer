/**
 * Format error
 * - type: NoToken, login fail ,...
 * - message (reable-human message): {
 *     en: english
 *     vi: vietnamese
 *   }
 * - suggest (suggest user correct input) :{
 *     en: english
 *     vi: vietnamese
 *   }
 * - httpCode
 * - idError: id in table error (references)
 * - filed (optional): name of field
 * - location (optional): params, body, query,...
 * - subErrors (optional): Array<Error>  -> List of ApiError
 * - extraData (optional): Object, data we sent
 */

const { MoleculerError } = require("moleculer").Errors;
class ApiError extends MoleculerError {
  type = "";
  httpCode = 400;
  idError = "";
  suggest = { vi: "vietnames suggest", en: "english suggest" };
  message = { vi: "vietnames message", en: "english message" };
  field = undefined;
  location = undefined;
  subErrors = undefined;
  extraData = undefined;
  /**
   *
   * @param {string} idError
   * @param {string} type
   * @param {number} httpCode
   * @param {{vi: "vietnames message", en: "english message"}} message
   * @param {{vi: "vietnames suggest", en: "english suggest"}} suggest
   * @param {string|undefined} field
   * @param {string|undefined} location
   */
  constructor(
    idError,
    type,
    httpCode,
    message,
    suggest,
    field = undefined,
    location = undefined,
    subErrors = undefined,
    extraData = undefined
  ) {
    super(type, httpCode);
    this.name = type;
    this.idError = idError;
    this.type = type;
    this.httpCode = httpCode;
    this.message = message;
    this.suggest = suggest;
    this.field = field;
    this.location = location;
    this.subErrors = subErrors;
    this.extraData = extraData;
  }
}

module.exports = ApiError;
