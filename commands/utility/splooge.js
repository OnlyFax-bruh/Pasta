require("dotenv").config();
const {
	MongoClient,
	ServerApiVersion,
} = require("mongodb");

const { EmbedBuilder } = require("discord.js");
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

var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("splooge")
		.setDescription(
			"The mf jacked off again didn't he"
		),
	async execute(interaction) {
		// Connect to PastaDB within MongoDB
		const pastaDB = mongoClient.db("PastaDB");
		const pastaCollection = pastaDB.collection(
			"PastaCollection"
		);
		const doc = {
			name: "Splooge jacked off once again on",
			date: today,
		};
		const contentString = doc.name + " " + doc.date;
		const result = await pastaCollection.insertOne(doc);
		console.log(
			`A document was inserted with the _id: ${result.insertedId}`
		);
		await interaction.reply({
			content: contentString,
		});
	},
};
