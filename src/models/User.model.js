const { Model, DataTypes, UUIDV4 } = require("sequelize");
module.exports = (connection) => {
  class User extends Model {
    associate(models) {
      const { User } = models;
      return User;
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      token: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize: connection,
      tableName: "User",
      paranoid: true,
    }
  );
  return User;
};
