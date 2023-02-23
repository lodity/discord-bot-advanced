import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from 'discord.js';

config();
const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});
const rest = new REST({ version: '10' }).setToken(TOKEN);
client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`));
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (interaction.commandName === 'order')
		await interaction.reply({ content: 'Hey there!!!' });
});

async function main() {
	const commands = [
		{
			name: 'ping',
			description: 'Replies with Pong!',
		},
		{
			name: 'order',
			description: 'Order something...',
		},
	];

	try {
		console.log('Started refreshing application (/) commands.');
		await rest.put(Routes.applicationCommands(CLIENT_ID), {
			body: commands,
		});
		client.login(TOKEN);
	} catch (e) {
		console.log(e);
	}
}
main();
