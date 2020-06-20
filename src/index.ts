import { AkairoClient, CommandHandler } from 'discord-akairo';
import { join as joinPath } from 'path';

class BoombotClient extends AkairoClient {
  private commandHandler: CommandHandler;

  constructor() {
    super({}, {});

    this.commandHandler = new CommandHandler(this, {
      directory: joinPath(__dirname, './commands'),
      prefix: '?',
      loadFilter(file) {
        return file.endsWith('.js');
      },
    });

    this.commandHandler.loadAll();
  }
}

const client = new BoombotClient();
client.login(process.env.BOOMBOT_TOKEN).then(() => console.log('Started'));
