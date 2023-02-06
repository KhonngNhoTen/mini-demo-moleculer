const ApiSerivce = require("moleculer-web");
const Moleculer = require("moleculer");
const { ErrorBuilder, TypeErrors } = require("../libs/Errors");
/** @type { Moleculer.ServiceSchema<Moleculer.ServiceSettingSchema> } */
const schema = {
  mixins: [ApiSerivce],
  settings: {
    port: 6000,
    routes: [
      {
        path: "/api",
        autoAliases: true,
        authentication: true,
        disableAuthenticate: ["v1.auth.login"],
        bodyParsers: {
          json: {
            strict: false,
          },
          urlencoded: {
            extended: false,
          },
        },

        onError(req, res, err) {
          console.log("Error handler route");
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.writeHead(err.httpCode ? err.httpCode : 500);
          res.end(JSON.stringify(err));
        },
      },
    ],
  },
  name: "api-gateway",
  async started() {
    this.logger.info(`===> Api gateway service started`);
  },
  onError(req, res, err) {
    this.logger.error("Error handler service");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.writeHead(err.httpCode ? err.httpCode : 500);

    res.end(JSON.stringify(err));
  },

  methods: {
    async authenticate(ctx, route, req, res) {
      if (
        route.opts.disableAuthenticate &&
        route.opts.disableAuthenticate.includes(req["$endpoint"].action.name)
      )
        return Promise.resolve(null);
      let token;
      const auth = req.headers["authorization"];
      if (auth && auth.startsWith("Bearer ")) token = auth.slice(7);
      if (!token) {
        return Promise.reject(
          new ErrorBuilder(TypeErrors.UnAuthentication)
            .addMessage({
              en: "Unauthentication",
              vi: "Chưa đăng nhập",
            })
            .addSuggest({
              en: "Please login to countinue",
              vi: "Hãy đăng nhập để tiếp tục",
            })
            .build()
        );
      } else {
        try {
          const user = await ctx.call("v1.auth.checkToken", { token });
          this.logger.info(`[${user.id}] Authentcate`);

          const data = {
            id: user.id,
            name: user.name,
          };
          return Promise.resolve(data);
        } catch (error) {
          return Promise.reject(
            new ErrorBuilder(TypeErrors.UnAuthentication)
              .addMessage({
                en: "Unauthentication",
                vi: "Chưa đăng nhập",
              })
              .addSuggest({
                en: "Token invalid",
                vi: "Token không hợp lệ",
              })
              .build()
          );
        }
      }
    },
  },
};

module.exports = schema;
