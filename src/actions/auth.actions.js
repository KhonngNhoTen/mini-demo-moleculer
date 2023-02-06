const md5 = require("md5");
const { ErrorBuilder, TypeErrors } = require("../libs/Errors");
const models = require("../models");
const { User } = models;

const AuthActions = {};
/**
 * @param {import ("moleculer").Service} service
 * @param {import("moleculer").Context} ctx
 */
AuthActions.login = async (service, ctx) => {
  const user = await User.findOne({
    where: {
      name: ctx.params.username,
      password: md5(ctx.params.password),
    },
  });

  if (!user) {
    return new ErrorBuilder(TypeErrors.InputInvalid)
      .addMessage({
        en: "Username or Password incorrect",
        vi: "Tên tài khoản hoặc mật khẩu không đúng",
      })
      .build();
  }
  const token = await service.genJWT({ id: user.id }, { expiresIn: "1d" });
  return { token, id: user.id };
};

module.exports = AuthActions;
