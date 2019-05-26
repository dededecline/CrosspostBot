import { serverMappings, writeServerId } from "./constants";
import { Client, Guild } from "discord.js";
import { stripIndents } from "common-tags";

export class CrosspostBot {
  private client: Client = new Client();

  public start(token: string): void {
    this.client.on("ready", () => {
      console.log("ready");
    });

    this.client.on("message", message => {
      const channel: any = message.channel;
      const guild: Guild = channel.guild;
      const serverId: string = guild.id;
      const channelId: string = channel.id;
      const sourceChannels: object = serverMappings[serverId];
      if (sourceChannels) {
        const destChannelId: string = sourceChannels[channelId];
        if (destChannelId) {
          const destGuild: Guild = this.client.guilds.get(writeServerId);
          if (destGuild.available) {
            const destChannel: any = destGuild.channels.get(destChannelId);
            if (message.attachments) {
              destChannel.send(
                stripIndents`${message.author.toString()}:
                ${message.content}`,
                {
                  files: message.attachments.map(a => a.url)
                }
              );
            } else {
              destChannel.send(
                stripIndents`${message.author.toString()}:
                ${message.content}`
              );
            }
          }
        }
      }
    });

    this.client.login(token).catch(err => {
      console.log(err);
    });
  }
}
