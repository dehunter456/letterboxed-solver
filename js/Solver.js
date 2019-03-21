import {Trie} from "./Trie.js";

/**
 * A class designed to find solutions to the NYTimes Letter Boxed game.
 *
 * The solver uses a Trie filled with a list of words from the Oxford dictionary to find every possible solution to the given
 * game board.
 */
export class Solver {

  /**
   * Creates the square board with the given sides, with n chars per side, and builds the Trie using words from the Oxford dictionary.
   * @param {[Array]} topSide    An array of the n characters on the top side of the board.
   * @param {[Array]} rightSide An array of the n characters on the right side of the board.
   * @param {[Array]} botSide  An array of the n characters on the bottom side of the board.
   * @param {[Array]} leftSide  An array of the n characters on the left side of the board.
   */
  constructor (topSide, rightSide, botSide, leftSide) {
    // Initialize the board
    this.board = [topSide, rightSide, botSide, leftSide];
    this.isWordBasedBuilt = false;
    // Build the Trie
    this.wordBase = new Trie();
    this.getWordList()
    .then((wordList) => {
      for (let word of wordList) {
        this.wordBase.add(word);
      }
    })
    .then(() => {
      // We can now use our Trie!
      this.isWordBasedBuilt = true;
      console.log(this.wordBase);
    });
  }

  /**
   * Asyncrounous method that returns the list of words to put into our Trie.
   * @return {[Array]} An array of strings containing dictionary words to use for our solution
   */
  async getWordList () {
    const src = "js/resources/words_alpha.txt";
    // Get words from txt file and parse them
    let request = await fetch(src);
    let allWords = await request.text();
    // Put words into array and remove words of length < 3 (valid words in game must be at least 3 chars long)
    let result = allWords.split("\n");
    result = result.map((word) => word.trim());
    result = result.filter((word) => word.length >= 3);
    return result;
  }

}
