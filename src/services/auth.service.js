const Joi = require("joi");
const Moleculer = require("moleculer");
const AuthActions = require("../actions/auth.actions");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
/** @type { Moleculer.ServiceSchema<Moleculer.ServiceSettingSchema> } */

const schema = {
  name: "auth",
  version: 1,
  settings: {
    rest: "/",
  },
  actions: {
    login: {
      params: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
      rest: "POST /login",
      async handler(ctx) {
        return AuthActions.login(this, ctx);
      },
    },
    logout: {
      params: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
      rest: "POST /logout",
      async handler(ctx) {
        return AuthActions.login(this, ctx);
      },
    },
    registry: {
      params: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
      rest: "POST /registry",
      async handler(ctx) {
        return AuthActions.login(this, ctx);
      },
    },
    checkToken: {
      params: Joi.object({
        token: Joi.string().required(),
      }),
      async handler(ctx) {
        try {
          const payload = await this.verifyJWT(ctx.params.token);
          const user = await User.findByPk(payload.id);
          return user;
        } catch (error) {
          throw new Error("Token invalid");
        }
      },
    },
  },
  methods: {
    genJWT(data, options) {
      return new Promise((resolve, reject) => {
        jwt.sign(data, process.env.SERECT_KEY, options, (error, token) => {
          if (error) {
            reject(error);
          } else resolve(token);
        });
      });
    },
    verifyJWT(token) {
      return new Promise((res, rej) => {
        jwt.verify(token, process.env.SERECT_KEY, (err, payload) => {
          if (err) rej(err);
          res(payload);
        });
      });
    },
  },
};

module.exports = schema;
