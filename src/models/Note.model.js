const { Model, DataTypes, UUIDV4 } = require("sequelize");
module.exports = (connection) => {
  class Note extends Model {
    associate(models) {
      const { Note } = models;
      return Note;
    }
  }
  Note.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize: connection,
      tableName: "Note",
      paranoid: true,
    }
  );
  return Note;
};
