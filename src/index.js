import { config } from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';

config();

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const TOKEN = process.env.BOT_TOKEN;

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);
