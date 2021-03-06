const Base = require('./Base');

class GuildCustomCommandModel extends Base {
  constructor(client, db) {
    super(client, db);

    this.model = db.define('guild_custom_command', {
      guildId: {
        type: this.Sequelize.BIGINT,
        references: {
          model: this.client.models.Guild,
          key: 'guildId'
        },
        allowNull: false,
        primaryKey: true
      },
      commandName: {
        type: this.Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      roles: {
        type: this.Sequelize.ARRAY(this.Sequelize.BIGINT),
        allowNull: false,
        defaultValue: []
      },
      desc: {
        type: this.Sequelize.STRING(1000)
      },
      usage: {
        type: this.Sequelize.STRING(200)
      },
      content: {
        type: this.Sequelize.STRING(10000),
        allowNull: false,
        defaultValue: ''
      },
      authorId: {
        type: this.Sequelize.BIGINT,
        references: {
          model: this.client.models.User,
          key: 'userId'
        },
        allowNull: false
      },
      variables: {
        type: this.Sequelize.JSON,
        allowNull: false,
        defaultValue: {}
      },
      locked: {
        type: this.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      restricted: {
        type: this.Sequelize.VIRTUAL,
        get() {
          return ['_greeting', '_farewell', '_test'].includes(this.get('commandName'));
        },
        comment: 'Whether users can execute this custom command. Only for greeting, farewell.'
      },
      hidden: {
        type: this.Sequelize.VIRTUAL,
        get() {
          return this.get('commandName').startsWith('*');
        },
        comment: 'Whether a custom command should be visisble or executable. For system commands and autoresponses.'
      }
    });
  }
}

module.exports = GuildCustomCommandModel;