/**
 * @typedef {Object} BaseInfoError
 * @property {string} type
 * @property {number} httpCode
 * @property {string} idError
 */

const type = {
  VilidatorError: {
    type: "Validation Error",
    httpCode: 400,
    idError: "E101",
  },

  UnAuthentication: {
    type: "Unauthentication",
    httpCode: 401,
    idError: "E102",
  },
  PermissionDenied: {
    type: "Permission dinied",
    httpCode: 403,
    idError: "E103",
  },
  InputInvalid: {},
};

module.exports = {
  TypeErrors: type,
};
