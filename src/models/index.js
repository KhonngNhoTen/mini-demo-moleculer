const { connection } = require("../databases");
const TypeModel = {
  User: require(`./TypeModel/User.type.model`),
  Note: require(`./TypeModel/Note.type.model`),
};

/// config associattions
/** @type {TypeModel} */
let models = {};

const nameModels = Object.keys(TypeModel);

// load model
for (let i = 0; i < nameModels.length; i++) {
  models[nameModels[i]] = require(`./${nameModels[i]}.model.js`)(connection);
}

// load associate
for (let i = 0; i < nameModels.length; i++)
  if (models[nameModels[i]].associate)
    models[nameModels[i]] = models[nameModels[i]].associate(models);

// (async () => {
//   await connection.sync({ force: true });
//   await models.User.create({
//     name: "admin",
//     password: require("md5")("123456a@"),
//   });
// })();

module.exports = models;
