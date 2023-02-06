const { ServiceBroker } = require("moleculer");
const JoiValidator = require("./libs/Validator/Joi.Validator");
const path = require("path");
const { connection } = require("./databases");
const broker = new ServiceBroker({
  nodeID: "node-1",
  async started(broker) {
    broker.logger.info("====> Broker started ");
    try {
      await connection.authenticate();
      broker.logger.info("DATABASE CONNECTION SUCCESSFULLY!!");
    } catch (error) {
      broker.logger.error("Database connect fail");
      broker.logger.error(error);
    }
  },
  validation: true,
  validator: new JoiValidator(),
});

broker.loadServices(path.join(__dirname, "./services"));

broker.start();
