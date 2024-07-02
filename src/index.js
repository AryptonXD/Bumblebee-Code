const config = require('./config/config.json');
const Bumblebee = require('./base/BumblebeeClient.js');
const { accessories } = require('./structures/clientAccessories.js');
const { collections } = require('./structures/clientCollection.js');
const { databases } = require('./structures/clientDatabase.js');
const { handlers } = require('./structures/clientHandler.js');

const client = new Bumblebee();

client.on("ready", () => {
  collections(client);
  accessories(client);
  databases(client);
  handlers(client);
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(config.token)
  .catch(error => {
    console.error('Login failed:', error);
    process.exit(1);
  });

module.exports = client;
