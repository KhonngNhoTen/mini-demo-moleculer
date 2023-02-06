const { Model } = require("sequelize");

/** @interface */
class IUser extends Model {
  id = "";
  name = "";
  password = "";
  token = "";
  createdAt = new Date();
  deleteAt = new Date();
  destroyTime = new Date();
}

module.exports = IUser;
