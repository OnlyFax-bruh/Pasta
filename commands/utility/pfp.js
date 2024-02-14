//TODO: Get server avatars, I ain't making a command for those nitro users

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
		const baseString = "https://cdn.discordapp.com/";
		const target =
			interaction.options.getUser("target") ?? ""; //Why do I need to do this last part again?
		const guild = interaction.member.guild;
		const guildTargetAvatar =
			guild.members.fetch(target).avatar;
		var finalTarget;

		if (interaction.options.getBoolean("serverpfp")) {
			// maybe replace target.userid with something else idk
			fullString =
				baseString +
				`guilds/${guild.id}/users/${target.id}/avatars/${guildTargetAvatar}.png`;
		} else {
			fullString =
				baseString +
				`avatars/${target.id}/${target.avatar}.png`;
		}
		finalString =
			fullString + "?size=desired_size=2048";
		embed = new EmbedBuilder().setImage(finalString);
		await interaction.reply({ embeds: [embed] });
	},
};

/*module.exports = {
    data: new SlashCommandBuilder()
        .setName('getpfp')
        .setDescription("Get any member's pfp")
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Nice pfp, would be a shame if I yoinked it')
                .setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target') ?? '';
        const embed = new EmbedBuilder()
            .setTitle(`${target.username}'s pfp`)
            .setImage(target.displayAvatarURL({ format: 'png', size: 2048, dynamic: true }));
        await interaction.reply({embeds: [embed] });
    },
};*/
