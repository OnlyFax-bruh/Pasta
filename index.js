require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");
const {
	MongoClient,
	ServerApiVersion,
} = require("mongodb");
const {
	Client,
	Events,
	GatewayIntentBits,
	Collection,
	User,
} = require("discord.js");
//I know that this ain't the right way to do it Byte. We ball.
//OK nvm we don't ball Discord resets the token anytime we try to ball. We do this right.
//const { token } = require("./config.json");
token = process.env.TOKEN;
//Create client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageTyping,
		GatewayIntentBits.GuildMessages,
	],
});

client.commands = new Collection();

//Build MongoDB URI
mongoPassword = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://adminpastabot:${mongoPassword}@clusterpasta.ketfdz1.mongodb.net/?retryWrites=true&w=majority`;

//Console log to check if Pasta's still alive
client.once(Events.ClientReady, (readyClient) => {
	console.log(`We up ${readyClient.user.tag}`);
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mongoClient = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

var pastaDB;
var pastaCollection;

async function run() {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		await mongoClient.connect();
		// Send a ping to confirm a successful connection
		await mongoClient.db("admin").command({ ping: 1 });
		console.log(
			"Pinged your deployment. You successfully connected to MongoDB!"
		);
		pastaDB = mongoClient.db("PastaDB");
		pastaCollection = pastaDB.collection(
			"PastaCollection"
		);
	} finally {
		// Ensures that the client will close when you finish/error
		await mongoClient.close();
	}
}

run().catch(console.dir);

//Setting up the bot to read the path and all of the commands
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`${filePath} don't got data or execute`
			);
		}
	}
}

//Listener for the commands
client.on(Events.InteractionCreate, async (interaction) => {
	if (interaction.isChatInputCommand()) {
		const command = interaction.client.commands.get(
			interaction.commandName
		);
		if (!command) {
			console.error("No matching command found");
			return;
		}
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
		}
		return;
	} else {
		return;
	}
});

// TODO: We should probably put this entire method somewhere else for readability but i cba to do it rn
// Fax, should you do it, also move the callSplooge method after it. It needs that
client.on(Events.MessageCreate, async (message) => {
	// Basically Enums
	const ChannelID = {
		NutGeneralId: "1162085095532929144",
		StriveID: "1162161285618737184",
		SolBadguyID: "1190997030542258319",
		TekkenEightID: "1206822417541111848",
		BotTestCommandsID: "1190973937337769986",
	};
	const UserID = {
		FaxID: "405367041999241216",
		ByteID: "253108416518553600",
		SploofID: "806964705008025611",
		BoardID: "1081308415260885052",
		NimbusID: "720155708758425670",
	};

	isValidID = false;
	for (var ID in ChannelID) {
		if (
			ChannelID.hasOwnProperty(ID) &&
			ChannelID[ID] === message.channel.id
		) {
			isValidID = true;
		}
	}
	if (!isValidID) {
		return;
	}
	messageString = message.content.toLowerCase();
	// Basically calls splooge command when sploof writes jack(ing) off
	if (message.author.id === UserID.SploofID) {
		if (
			(messageString.includes("jack") &&
				messageString.includes("off")) ||
			message.includes("mastru")
		) {
			content = callSploogeEvent();
			message.reply(content);
		}
		// I fucking hate nimbus dude (real)
	} else if (message.author.id === UserID.NimbusID) {
		if (messageString.includes("wilk")) {
			message.reply(
				"Shut the fuck up about wilk nimbus I swear to god"
			);
		}
	} else if (message.author.id === UserID.BoardID) {
		if (messageString.includes("nigg")) {
			// Todo: implement n word counter.. sometime
			message.reply(
				"If Byte wasn't lazy I'd be incrementing an n-word counter rn"
			);
		}
	} else if (message.author.id === UserID.ByteID) {
		if (messageString === "test") {
			message.reply("Fuck you");
		}
	}
});
async function callSploogeEvent() {
	// Connect to PastaDB within MongoDB
	const sploogeDocArray = await pastaCollection
		.find({
			documentName: "splooge",
		})
		.project({ jacks: 1, initDate: 1, _id: 0 })
		.toArray();
	// access the first and only element now
	const sploogeDoc = sploogeDocArray[0];
	// maybe turn this into const initDate = sploogeDoc.initDate so its not the current time
	const initDate = sploogeDoc.initDate;
	const filter = { documentName: "splooge" };
	const newJacks = sploogeDoc.jacks + 1;
	const updateDoc = {
		$set: { jacks: newJacks },
	};
	pastaCollection.updateOne(filter, updateDoc);
	content = `<@806964705008025611> has jacked off ${
		sploogeDoc.jacks - 1
	} times since ${initDate}`;
	return content;
}
client.login(token);
