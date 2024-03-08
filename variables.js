export class Variables {
	static bannedWords;
	bannedWords = generateBannedWords();
	async generateBannedWords() {
		let { generate } = await import("random-words");
		return generate(5);
	}
}
