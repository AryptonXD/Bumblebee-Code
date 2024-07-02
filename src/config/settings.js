const prefix = process.env.prefix || '?'
const status = `${prefix}help`;

module.exports = {
  bot: {
    info: {
      prefix: '?',
      invLink: 'https://bumblebeebot.xyz/invite/',
      privacy: 'https://bumblebeebot.xyz/policy/',
      terms: 'https://bumblebeebot.xyz/term/',
    },
    presence: {
      name: status,
      type: 'Listening'
    },
    credits: {
      developerId: '560115112078475266',
      supportServer: 'https://bumblebeebot.xyz/support/'
    },
  }
}
