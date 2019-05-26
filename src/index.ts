import { CrosspostBot } from "./CrosspostBot";
const { token }: { token: string } = require("../auth.json");

const bot: CrosspostBot = new CrosspostBot();
bot.start(token);
