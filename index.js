require("dotenv").config();
const fs = require("node:fs");
const path = require("node:path");
const levenshtein = require("js-levenshtein");
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
const Variables = require("./variables.js");
const bannedwords = require("./commands/utility/bannedwords.js");
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
client.login(token);
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

// Variables for actual discord.js code
let lastCheckedDate = new Date();
let pythagorasSidesAndResult = -1;
let chocolatesAnswerToPythagoras = -1;
timer = null;
function hasDateChanged() {
	const currentDate = new Date();

	if (
		currentDate.toDateString() !==
		lastCheckedDate.toDateString()
	) {
		// Date has changed
		lastCheckedDate = currentDate;
		return true;
	} else {
		// Date has not changed
		return false;
	}
}

async function initBannedWords() {
	await Variables.initializeBannedWords();
	var bannedwords = Variables.generateBannedWords();
}
initBannedWords();
// Example usage: Check if date has changed every 1 minute
setInterval(() => {
	const solBadguyID = "1190997030542258319";
	const _165ID = "714435782579978272";
	// Uncomment this later
	if (hasDateChanged()) {
		send165Message(solBadguyID, _165ID);
	}
}, 120000);

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
	EddID: "515997929241182238",
	PastaID: "1190966073571426374",
	HazelID: "366901247938396160",
	ChocolateID: "972859813346299934",
	AutumnID: "799111684504813619",
	CityID: "544778774344892427",
};
const possibleContent = ["ejaculated and evacuated", "blew his load and hit the road", "came a fair amount and changed his physical whereabouts", 
	"came and went", "rubbed a dub dub with semen heading for the tub", "shot his shit and hit the split"]
	
// TODO: We should probably put this entire method somewhere else for readability but i cba to do it rn
client.on(Events.MessageCreate, async (message) => {
	await mongoClient.connect();
	pastaDB = mongoClient.db("PastaDB");
	pastaCollection = pastaDB.collection("PastaCollection");
	// Check if Channel is contained in ChannelID Enums before posting / checking there
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
	let messageString = message.content
		.toLowerCase()
		.replace(/\s/g, "");
	let messageContentLowerCase = message.content.toLowerCase();
	callMessageChecks(
		message,
		messageContentLowerCase,
		messageString
	);
	/*
	if (message.author.id === UserID.AutumnID) {
		if (Math.random() * 10 === 10) {
			let member = message.member;
			let name = member.nickname.toLowerCase();
			if (name === "autumn") {
				message.member.setNickname("Winter");
			} else if (name === "winter") {
				message.member.setNickname("Spring");
			} else if (name === "spring") {
				message.member.setNickname("Summer");
			} else if (name === "summer") {
				message.member.setNickname("Autumn");
			}
		}
	}
*/

	/*
	var bannedWords = Variables.getBannedWords();
	contentString = "";
	for (var i = 0; i < bannedWords.length; i++) {
		word = bannedWords[i].toLowerCase();
		if (
			messageString.includes(word) &&
			message.author.id !== UserID.PastaID
		) {
			message.guild.members.cache.forEach(
				(member) => {
					if (member.id === message.author.id) {
						contentString =
							callBannedWordEvent();
						member
							.timeout(1 * 60 * 1000)
							.then(() =>
								console.log(
									"Timed out " +
										member.name
								)
							)
							.catch(console.log);
					}
				}
			);
			message.reply(contentString);
		}
	}
	*/
});

client.on("messageUpdate", (oldMessage, newMessage) => {
	let newMessageContentLowerCase =
		newMessage.content.toLowerCase();
	let newMessageString = newMessage.content
		.toLowerCase()
		.replace(/\s/g, "");
	callMessageChecks(
		newMessage,
		newMessageContentLowerCase,
		newMessageString
	);
});
async function callMessageChecks(
	message,
	messageContentLowerCase,
	messageString
) {
	if (message.author.id === UserID.SploofID) {
		await checkSploofMessage(
			message,
			messageContentLowerCase,
			messageString
		);
	}
	if (message.author.id === UserID.NimbusID) {
		await checkNimbusMessage(
			message,
			messageContentLowerCase,
			messageString
		);
	}
	if (message.author.id === UserID.BoardID) {
		await checkBoardMessage(
			message,
			messageContentLowerCase,
			messageString
		);
	}
	if (message.author.id === UserID.ChocolateID) {
		await checkChocolateMessage(
			message,
			messageContentLowerCase,
			messageString
		);
	}
	if (message.author.id === UserID.CityID) {
		await checkCityMessage(
			message,
			messageContentLowerCase,
			messageString
		);
	}
	if (message.author.id === UserID.ByteID) {
		await checkByteMessage(
			message,
			messageContentLowerCase,
			messageString
		);
	}
}
function checkForTerribleJoke(messageContentLowerCase) {
	let shouldBanTheFucker = false;
	// TODO: DONT LET HIM GET AWAY WITH IT. MAKE THIS WORK
	let messageStringArray = messageContentLowerCase.split(" ")
	for (let i = 0; i < messageStringArray.length-1; i++) {
		if (levenshtein(messageStringArray[i], "your") > 1 && levenshtein(messageStringArray[i], "you'r") > 1) {
			continue
		}
		else if (i+2 > messageStringArray.length-1) {
			let ldMomAfterYour = levenshtein("mom",messageStringArray[i+1]);
			let ldMotherAfterYour = levenshtein("mother",messageStringArray[i+1])
			let ldMomAfterYour2 = levenshtein("mom", messageStringArray[i+2]);
			let ldMotherAfterYour2 = levenshtein("mother", messageStringArray[i+2]);
			
			let boolMomAfterYour = ldMomAfterYour <= 1;
			let boolMotherAfterYour = ldMotherAfterYour <= 2;
			let boolMomAfterYour2 = ldMomAfterYour2 <= 1;
			let boolMotherAfterYour2 = ldMotherAfterYour2 <= 2;
			
			if ( boolMomAfterYour || boolMomAfterYour2 || boolMotherAfterYour || boolMotherAfterYour2 ) {
				shouldBanTheFucker = true;
			}
		}

		else if (i+1 > messageStringArray.length-1) {
			let ldMomAfterYour = levenshtein("mom",messageStringArray[i+1]);
			let ldMotherAfterYour = levenshtein("mother",messageStringArray[i+1])
			
			let boolMomAfterYour = ldMomAfterYour <= 1;
			let boolMotherAfterYour = ldMotherAfterYour <= 2;
			
			if (boolMomAfterYour || boolMotherAfterYour) {
				shouldBanTheFucker = true;
			}
		}
	}
	ret
}
async function checkSploofMessage(
	message,
	messageContentLowerCase,
	messageString
) {
	shouldBanTheFucker = checkForTerribleJoke()
	if (messageContentLowerCase.includes("your") && (messageContentLowerCase.includes("mother") || messageContentLowerCase.includes("mom")) ) {
		setTimeout(() => message.delete(), 200);
		if (shouldBanTheFucker) {
			await message.reply("Go straight to hell. I don't even have a joke for this.")
			message.guild.members
			.fetch(UserID.SploofID)
			.then((user) => {
				let timeOut = 1 * 60 * 1000
				user.timeout(
					timeOut,
					"Admin timed you out."
				)
					.then(() => {
						console.log(
							`Got rid of sploof for ${timeOut} seconds`
						);
					})
					.catch(console.error);
				})
			.catch(console.error);
		}
	}
	else if (
		messageString.includes("jack") &&
		messageString.includes("off")
	) {
		content = await callSploogeEvent();
		message.reply(content);
	}
}

async function checkNimbusMessage(
	message,
	messageContentLowerCase,
	messageString
) {
	if (messageString.includes("wilk")) {
		message.guild.members
			.fetch(UserID.NimbusID)
			.then((user) => {
				user.timeout(
					1 * 60 * 1000,
					"Admin timed you out."
				)
					.then(() => {
						console.log(
							"Timed user out for 9000 seconds."
						);
					})
					.catch(console.error);
			})
			.catch(console.error);
		message.reply(
			"Shut the fuck up about wilk nimbus I swear to god"
		);
		setTimeout(() => message.delete(), 1000);
	}
}

async function checkBoardMessage(
	message,
	messageContentLowerCase,
	messageString
) {
	if (messageString.includes("nigg")) {
		contentString = await callHellcatPersonEvent();
		message.reply({ content: contentString });
	}
}

async function checkChocolateMessage(
	message,
	messageContentLowerCase,
	messageString
) {
	if (
		messageContentLowerCase.includes("hi guys") ||
		messageContentLowerCase.includes("hello friends")
	) {
		message.reply("bro forgor");
		setTimeout(() => message.delete(), 1000);
	}
	if (messageContentLowerCase.includes("!answer")) {
		const re = RegExp("[+-]?([0-9]*[.])?[0-9]+");
		chocolatesAnswerToPythagoras = parseFloat(
			re.exec(messageContentLowerCase)[0]
		);
		if (
			isWithinTolerance(
				pythagorasSidesAndResult[2],
				chocolatesAnswerToPythagoras
			)
		) {
			if (
				typeof timer !== "undefined" &&
				timer !== null
			) {
				clearTimeout(timer);
			}
			message.reply("We are so back");
		} else {
			message.reply(`It's so joever`);
		}
	}
	if (
		messageContentLowerCase.includes("valentigger") ||
		messageContentLowerCase.includes("gearigger") ||
		messageContentLowerCase === "!pythagoras"
	) {
		pythagorasSidesAndResult =
			generatePythagorasProblem();
		message.reply(
			`You have 10 minutes to solve the following:
				Side 1 length: ${pythagorasSidesAndResult[0]}, Side 2 length: ${pythagorasSidesAndResult[1]}, the triangle is right angled,
				find the length of the hypotenuse.`
		);

		timer = setTimeout(() => {
			a;
			if (
				chocolatesAnswerToPythagoras !==
				pythagorasSidesAndResult[2]
			) {
				message.reply(
					"You didn't answer correctly in time. Don't be sorry, be better."
				);
			}
		}, 600000);
	}
}

async function checkCityMessage(
	message,
	messageContentLowerCase,
	messageString
) {
	if (
		(messageContentLowerCase.includes("lob") &&
			messageContentLowerCase.includes("corp")) ||
		messageContentLowerCase.includes("red mist")
	) {
		message.reply(
			"I'm going to lobotomize your corporation if you keep talking"
		);
	}
}

async function checkByteMessage(
	message,
	messageContentLowerCase,
	messageString
) {

	if (messageString === "test"){
			setTimeout(() => message.delete(), 1000);
			message.reply("Fuck you")
		}
	else if(messageString.includes("testtest") ) {
		array = messageContentLowerCase.split(" ")
		LDdistance = levenshtein("kitten","sitting")
		message.reply(`Fuck you but slightly changed again.
		Here's messageContentLowerCase: ${messageContentLowerCase}
		Here's whether your messageContentLowerCase contained "your": ${messageContentLowerCase.includes("your")}
		Here's whether your messageContentLowerCase contained "mom": ${messageContentLowerCase.includes("mom")}
		Here's whether your messageContentLowerCase contained "mother": ${messageContentLowerCase.includes("mother")}
		Here's the message in toArray: ${array}
		Here's the levensthein distance between kitten and sitting: ${LDdistance}`);

		setTimeout(() => message.delete(), 1000);
	}
}


async function callHellcatPersonEvent() {
	const initDate = new Date("February 18, 2024 00:00:00");
	var hellcatPersonCounter = 0;
	var update;
	const projection = {
		name: 1,
		hellcatPersonCounter: 1,
		initDate: 1,
	};
	const cursor = pastaCollection
		.find({ name: "hellcatPersonCounter" })
		.project(projection);
	var welfareReceiverDoc = (await cursor.hasNext())
		? await cursor.next()
		: null;
	// Find out if friedChickenMuncherCounter exists already
	if (welfareReceiverDoc === null) {
		hellcatPersonCounter = 0;
		update = {
			$set: {
				name: "hellcatPersonCounter",
				hellcatPersonCounter:
					hellcatPersonCounter + 1,
				initDate: initDate,
			},
		};
	} else {
		hellcatPersonCounter =
			await welfareReceiverDoc.hellcatPersonCounter;
		update = {
			$set: {
				name: "hellcatPersonCounter",
				hellcatPersonCounter:
					hellcatPersonCounter + 1,
				initDate: initDate,
			},
		};
	}
	const query = { name: "hellcatPersonCounter" };
	const options = { upsert: true };
	await pastaCollection.updateOne(query, update, options);

	numberToDisplay = hellcatPersonCounter + 1;
	dateToDisplay = welfareReceiverDoc.initDate;
	var content = `Board has said the n-word ${numberToDisplay} times since ${dateToDisplay}`;
	return content;
}

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
	const initDate = sploogeDoc.initDate;
	const filter = { documentName: "splooge" };
	const newJacks = sploogeDoc.jacks + 1;
	const updateDoc = {
		$set: { jacks: newJacks },
	};
	pastaCollection.updateOne(filter, updateDoc);

	randomIndex = Math.floor(Math.random() * possibleContent.length)

	content = `<@806964705008025611> ${possibleContent[randomIndex]} ${
		sploogeDoc.jacks - 1
	} times since ${initDate}`;
	return await content;
}

async function callEddEvent() {
	const initDate = new Date("February 18, 2024 00:00:00");
	var fagCounter = 0;
	var update;
	const projection = {
		name: 1,
		fagCounter: 1,
		initDate: 1,
	};
	const cursor = pastaCollection
		.find({ name: "fagCounter" })
		.project(projection);
	var fagCounterDoc = (await cursor.hasNext())
		? await cursor.next()
		: null;
	// Find out if fagCounter exists already
	if (fagCounterDoc === null) {
		fagCounter = 0;
		update = {
			$set: {
				name: "fagCounter",
				fagCounter: fagCounter + 1,
				initDate: initDate,
			},
		};
	} else {
		fagCounter = await fagCounterDoc.fagCounter;
		update = {
			$set: {
				name: "fagCounter",
				fagCounter: fagCounter + 1,
				initDate: initDate,
			},
		};
	}
	const query = { name: "fagCounter" };
	const options = { upsert: true };
	await pastaCollection.updateOne(query, update, options);

	numberToDisplay = fagCounter + 1;
	dateToDisplay = fagCounterDoc.initDate;
	var content = `Edd has been homophobic ${numberToDisplay} times since ${dateToDisplay}`;
	return content;
}

function callBannedWordEvent() {
	console.log(
		`CallBannedWordEvent: ${Variables.printOutBannedWords()}`
	);
	return (content =
		"whoopsie doopsie you did a fuckie wuckie. get timed out lmao");
}

function send165Message(channelID, userID) {
	const channel = client.channels.cache.get(channelID);
	channel.send(
		`<@${userID}> Perpetual reminder that Hollow Knight Silksong will never release`
	);
}
function generatePythagorasProblem() {
	let side1 = Math.floor(Math.random() * 10 + 1);
	let side2 = Math.floor(Math.random() * 10 + 1);
	let hypotenuse = Math.sqrt(
		side1 * side1 + side2 * side2
	);
	let numbers = [side1, side2, hypotenuse];
	return numbers;
}
function isWithinTolerance(
	correctValue,
	userValue,
	tolerance = 0.3
) {
	difference = correctValue - userValue;
	return Math.abs(correctValue - userValue) <= tolerance;
}
module.exports = Variables;
