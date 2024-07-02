const emoji = require('../../config/emoji.js');
const PREFIX_LIMIT = 3;

async function setPrefix(client, guildId, newPrefix) {
  try {
    await client.guild.prepare("INSERT OR REPLACE INTO guild_settings (guild_id, prefix) VALUES (?, ?)").run(guildId, newPrefix);
  } catch (error) {
    console.error("Error setting prefix in the database:", error);
  }
}

module.exports = {
  name: 'prefix',
  aliases: ['customprefix'],
  UserPerms: ['Administrator'],
  BotPerms: ['EmbedLinks'],
  run: async (client, message, args) => {
    try {
      const newPrefix = args[0];

      if (!newPrefix) {
        return message.channel.send({ content: `${emoji.util.cross} | Provide me a prefix to set for this server.` });
      }

      if (newPrefix.length >= PREFIX_LIMIT) {
        return message.channel.send({ content: `${emoji.util.cross} | Please choose a smaller prefix. (Length can be max 2 characters).` });
      }

      await setPrefix(client, message.guild.id, newPrefix);
      return message.channel.send({ content: `${emoji.util.tick} | The new prefix is now set to **${newPrefix}** Ping me if you ever forget it.` });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
};
