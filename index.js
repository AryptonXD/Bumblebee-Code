const Bumblebee = require('./base/BumblebeeClient.js');
const { setupDatabases } = require('./structures/clientDatabase.js');
const { loadClientAccessories } = require('./structures/clientAccessories.js');
const { setupCollections } = require('./structures/clientCollection.js');
const { loadHandlers } = require('./structures/clientHandler.js');
const config = require('./config.json');

const client = new Bumblebee();

client.on("ready", () => {
    setupDatabases(client);
    setupCollections(client);
    loadHandlers(client);
    loadClientAccessories(client);
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(config.token)
  .catch(error => {
    console.error('Login failed:', error);
    process.exit(1);
  });

module.exports = client;
