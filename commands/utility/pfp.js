const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("getpfp")
		.setDescription("Get any member's pfp")
		
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription(
					"Nice pfp, would be a shame if I yoinked it"
				)
				.setRequired(true)
		)
		.addBooleanOption((option) =>
			option
				.setName("serverpfp")
				.setDescription(
					"Yoink the server avatar or personal avatar?"
				)
				.setRequired(true)
		),
	async execute(interaction) {
		var target = interaction.options.getUser("target");
		if(interaction.options.getBoolean("serverpfp"))
		{
			const guild = interaction.member.guild;
			target = guild.members.cache.get(interaction.options.getUser("target").id);
		}
			
		const embed = new EmbedBuilder()
			.setTitle(`${target.username}'s pfp`)
			.setImage(
				target.avatarURL({
					format: "png",
					size: 2048,
					dynamic: true,
				})
			);
		await interaction.reply({ embeds: [embed] });
	},
};
