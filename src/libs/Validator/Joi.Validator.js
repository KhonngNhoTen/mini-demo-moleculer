const BaseValidator = require("moleculer").Validators.Base;
const { ErrorBuilder, TypeErrors } = require("../Errors");
class JoiValidator extends BaseValidator {
  constructor() {
    super();
  }

  compile(schema) {
    return (field) => this.validate(field, schema);
  }

  validate(field, schema) {
    const res = schema.validate(field, { abortEarly: false });
    if (res.error) {
      /**
       * @typedef {Object} Detail
       * @property {string} message
       * @property {Array} path
       * @property {string} type
       * @property {Object} context
       * @property {string} context.label
       * @property {string} context.value
       * @property {string} context.key
       */
      /** @type {Array<Detail>} */
      const detailErrors = res.error.details;

      let errors = [];
      const errorBuilder = new ErrorBuilder(TypeErrors.VilidatorError)
        .addMessage({ en: "Data invalid" })
        .addSuggest({ en: "Please enter valid data" });
      for (let i = 0; i < detailErrors.length; i++) {
        const detailError = detailErrors[i];
        errorBuilder.addSubErrors({
          type: TypeErrors.VilidatorError.type,
          message: { en: detailError.message.replace(/"/g, "") },
          field: detailError.context.label,
        });
      }
      throw errorBuilder.build();
    }

    return true;
  }
}

module.exports = JoiValidator;
