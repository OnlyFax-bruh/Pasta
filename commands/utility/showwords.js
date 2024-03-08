const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
import { bannedWords } from "../index.js";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("showwords")
		.setDescription(
			"Print banned words to BotTest Server (so you non programming peasants can't see em)"
		),
	async execute(interaction) {
		content = bannedWords;
		await interaction.reply({
			content: content,
		});
	},
};
