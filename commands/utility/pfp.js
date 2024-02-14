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
		//This weirdness needs to be done or the embed gets fucked up
		const target = interaction.options.getUser("target");
		const guild = interaction.member.guild;
		const guildTarget = guild.member(target);
		/*var finalTarget;
		if(interaction.options.getBoolean("serverpfp")){
			finalTarget = guildTarget;
		}
		else{
			finalTarget = target;
		}*/


		const embed = new EmbedBuilder()
			.setTitle(`${target.username}'s pfp`)
			.setImage(
				guildTarget.displayAvatarURL({ 
					format: 'png', 
					size: 2048, 
					dynamic: true 
				})
			);
		await interaction.reply({ embeds: [embed] });
	},
};
