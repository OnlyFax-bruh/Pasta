const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const { Guilds } = require("")

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
		/*.addBooleanOption((option) =>
			option
				.setName("serverpfp")
				.setDescription(
					"Yoink the server avatar or personal avatar?"
				)
				.setRequired(true)
		)*/,
	async execute(interaction) {
		
		const target = interaction.options.getUser("target") ?? ""; //Why do I need to do this last part again?
		/*const guild = interaction.member.guild;
		const guildTarget = ;
		var finalTarget;
		if(interaction.options.getBoolean("serverpfp")){
			finalTarget = guildTarget;
		}
		else{
			finalTarget = target;
		}*/


		const embed = new EmbedBuilder()
			.setTitle(`${target.username}'s pfp`)
			.setImage(
				target.displayAvatarURL({ 
					format: 'png', 
					size: 2048, 
					dynamic: true 
				})
			);
		await interaction.reply({ embeds: [embed] });
	},
};
