const { Role } = require.main.require('./Tag/Classes');

class RoleIdTag extends Role {
  constructor(client) {
    super(client, {
      name: 'id',
      args: [
        {
          name: 'role'
        }
      ],
      minArgs: 1, maxArgs: 1
    });
  }

  async execute(ctx, args) {
    const res = await super.execute(ctx, args);
    let role;
    if (args.parsedArgs.role) {
      role = await ctx.client.Helpers.Resolve.role(ctx, args.parsedArgs.role.toString(), true);
    }
    return res.setContent(role ? role.id : '');
  }
}

module.exports = RoleIdTag;