require("dotenv").config();
const {
	MongoClient,
	ServerApiVersion,
} = require("mongodb");

const { EmbedBuilder, Embed } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

mongoPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://adminpastabot:${mongoPassword}@clusterpasta.ketfdz1.mongodb.net/?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName("autumn")
		.setDescription(
			"Autumn's a journey, with ups and downs"
		)
		.addBooleanOption((option) =>
			option
				.setName("isgoodtake")
				.setDescription("Was this a good take?")
				.setRequired(true)
		),
	async execute(interaction) {
		const ratingToURL = new Map([
			[
				-3,
				"https://media1.tenor.com/m/sLG8KOwLkukAAAAd/mgr-metal-gear-rising.gif",
				// I should smash your skull in
			],
			[
				-2,
				"https://media1.tenor.com/m/zy84hza1_-MAAAAd/social-credit.gif",
				// - Social Credit
			],
			[
				-1,
				"https://media1.tenor.com/m/rQxuTx8Cv6gAAAAd/necrozma-pokemon.gif",
			],
			[
				0,
				"https://media1.tenor.com/m/LtM3ohE4s5YAAAAC/yhwach-bleach.gif",
			],
			[
				1,
				"https://cdn.discordapp.com/attachments/555718459837775873/1260697848714887279/honestlyquitebien.gif?ex=66a015dd&is=669ec45d&hm=8adb8dc54f3c33abc618dd716dd0f00bd934039a5e50810e87f27d1811ffd1b5&",
			],
			[
				2,
				"https://media1.tenor.com/m/-yCetQ8u2mAAAAAC/goku-xenoverse-2.gif",
			],
			[
				3,
				"https://media1.tenor.com/m/c55Fn0AGdYEAAAAC/sajam-chipotle.gif",
			],
		]);
		// Connect to PastaDB within MongoDB
		const pastaDB = mongoClient.db("PastaDB");
		const pastaCollection = pastaDB.collection(
			"PastaCollection"
		);
		const autumnRatingArray = await pastaCollection
			.find({
				name: "autumn",
			})
			.project({ rating: 1, _id: 0 })
			.toArray();
		const autumnRating = autumnRatingArray[0];
		console.log(autumnRating.rating);
		newRating = 0;
		const filter = { name: "autumn" };
		if (interaction.options.getBoolean("isgoodtake")) {
			newRating = autumnRating.rating + 1;
		} else {
			newRating = autumnRating.rating - 1;
		}
		const updateDoc = {
			$set: { rating: newRating },
		};
		pastaCollection.updateOne(filter, updateDoc);
		stringForImage = ratingToURL.get(newRating);
		const embedWithImage = new EmbedBuilder()
			.setTitle("Autumns approval rating")
			.setDescription(
				`<@799111684504813619> now has an approval rating of ${newRating}`
			)
			.setImage(stringForImage);
		await interaction.reply({
			embeds: [embedWithImage],
		});
	},
};
