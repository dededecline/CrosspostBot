# Discord CrosspostBot

A Discord bot for crossposting from multiple servers into 
another server.

## Setup

Download this repo through git with

```bash
$ git clone https://github.com/danielhklein/CrosspostBot.git
```

Two files need to be set up for this bot to work:

#### auth.json

Create a file named `auth.json` in the root directory. 
It should follow this format:

```json
{
  "token": "your Discord bot token"
}
```

If you have not created a bot yet or don't have an auth token
yet, you can follow 
[steps 2 - 4 here](https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/)
to do so and authorize your bot with your servers.

#### src/constants.ts

Create a `constants.ts` or `constants.js` file in the `src` directory.

It should follow this format:

```typescript
export const serverMappings: object = {
  "serverToReadFromId": {
    "channelToReadFromId": "channelToWriteToId"
  },
  ...
};

export const writeServerId: string = "serverToWriteToId";

```

### Startup

You're ready to go now! Just run `npm install` then `npm run start` to run the bot.

## FAQ

#### Can I write to multiple servers?

Not currently, though I may add the ability to do so later (feel free to send a PR!)

#### Is there a limit to how many servers/channels I can read from?

Outside of [Discord's built-in limitations](https://discordia.me/server-limits), 
this bot has no hard read limits.You may experience performance issues if too
many servers are being read, however.

#### Can I change the crosspost message format?

You can! Just modify the arguments of `destChannel.send` in `CrosspostBot.ts`.

#### Will _ be preserved in the crossposting?

Currently I have verified that attachments, emojis, gifs, and spoiler tags
will all crosspost properly. Let me know if something is not being preserved.

#### Will reacts be crossposted?

No.
