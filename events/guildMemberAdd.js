bot.on('guildMemberAdd', async function(guild, member) {
    let val = await bu.guildSettings.get(guild.id, 'greeting');
    let chan = await bu.guildSettings.get(guild.id, 'greetchan');
    if (val) {
        let ccommandContent;
        let author;
        if (typeof val == "object") {
            ccommandContent = val.content;
            author = val.author;
        } else {
            ccommandContent = val;
        }
        var message = await tags.processTag({
            channel: chan ? bot.getChannel(chan) : guild.defaultChannel,
            author: member.user,
            member: member,
            guild: guild
        }, ccommandContent, '', undefined, author, true);
        bu.send(chan || guild.defaultChannel.id, message);
    }
    bu.logEvent(guild.id, 'memberjoin', [{
        name: 'User',
        value: bu.getFullName(member.user) + ` (${member.user.id})`,
        inline: true
    }]);
});