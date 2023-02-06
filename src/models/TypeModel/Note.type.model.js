const { Model } = require("sequelize");

/** @interface */
class INote extends Model {
  id = "";
  title = "";
  content = "";
  createdAt = new Date();
  deleteAt = new Date();
  destroyTime = new Date();
}

module.exports = INote;
