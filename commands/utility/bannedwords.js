const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const { bannedWords } = require("../../index.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("showwords")
		.setDescription("Print or change banned words")
		.addBooleanOption((option) =>
			option
				.setName("print")
				.setDescription("Print out the words")
				.setRequired(true)
		)
		.addBooleanOption((option) =>
			option
				.setName("regenerate")
				.setDescription("Regenerate words")
				.setRequired(true)
		),
	async execute(interaction) {
		content = "";
		const Variables = require("./variables.js");
		if (interaction.options.getBoolean("print")) {
			content = `Banned words: ${Variables.printOutBannedWords()}`;
		}
		if (interaction.options.getBoolean("regenerate")) {
			Variables.generateBannedWords();
			content =
				content +
				`\nMade new banned words + ${Variables.printOutBannedWords()}`;
		}

		content = bannedWords;
		await interaction.reply({
			content: content,
		});
	},
};
