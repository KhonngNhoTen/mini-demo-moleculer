const Joi = require("joi");
const Moleculer = require("moleculer");
const NoteAction = require("../actions/note.action");

/** @type { Moleculer.ServiceSchema<Moleculer.ServiceSettingSchema> } */
const schema = {
  name: "note",
  version: 1,
  settings: {
    rest: "/note",
  },
  actions: {
    create: {
      params: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
      }),
      rest: "POST /",
      async handler(ctx) {
        return await NoteAction.create(this, ctx);
      },
    },
    list: {
      rest: "GET /",
      async handler(ctx) {
        return await NoteAction.list(this, ctx);
      },
    },
    detail: {
      params: Joi.object({
        idNote: Joi.string().required(),
      }),
      rest: "GET /:idNote",
      async handler(ctx) {
        return await NoteAction.detail(this, ctx);
      },
    },
    update: {
      params: Joi.object({
        idNote: Joi.string().required(),
        title: Joi.string().required(),
        content: Joi.string().required(),
      }),
      rest: "PUT /:idNote",
      async handler(ctx) {
        return await NoteAction.update(this, ctx);
      },
    },
    delete: {
      params: Joi.object({
        idNote: Joi.string().required(),
      }),
      rest: "DELETE /:idNote",
      async handler(ctx) {
        return await NoteAction.remove(this, ctx);
      },
    },
  },
  async started() {
    this.logger.info("===> Note service started");
  },
};

module.exports = schema;
