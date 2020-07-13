import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { User } from 'discord.js';

export default class ProjectCommand extends Command {
  constructor() {
    super('project', {
      aliases: ['project'],
    });
  }

  async exec(message: Message) {
    if (this.client.user?.id == null || message.guild == null) {
      return;
    }
    const channel = await message.guild.channels.create(message.author.tag, {
      parent: process.env.DISCORD_PROJECT_PARENT,
      permissionOverwrites: [
        {
          id: message.guild.roles.everyone,
          type: 'role',
          deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        },
        {
          id: this.client.user.id,
          type: 'member',
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
        },
        {
          id: message.author,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
          type: 'member',
        },
      ],
    });

    const botMessage = await channel.send(process.env.DISCORD_PROJECT_MESSAGES);
await botMessage.react(process.env.BOOMBOT_EMOJI_UPVOTE);
await botMessage.react(process.env.BOOMBOT_EMOJI_DOWNVOTE);

    // TODO: If the bot dies, the collector is lost
    const reactions = await botMessage.awaitReactions(
      (_messageReaction, user: User) => {
        return (
          !user.bot &&
          Boolean(
            message.guild?.members.cache
              .get(user.id)
              ?.roles.cache.get('711876082827264000'),
          )
        );
      },
      {
        max: 1,
      },
    );
    console.log(reactions.keys().next());
  }
}
