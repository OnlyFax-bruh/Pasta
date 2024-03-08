class Variables {
	static bannedWords = [""];

	async generateBannedWords() {
		let { generate } = await import("random-words");
		return generate(5);
	}

	async initializeBannedWords() {
		Variables.bannedWords =
			await this.generateBannedWords();
	}

	printOutBannedWords() {
		console.log(
			"Banned words in Variables: " +
				Variables.bannedWords
		);
	}
}

module.exports = new Variables();
