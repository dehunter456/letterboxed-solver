import {Trie} from "./Trie.js";

export class Game {

  constructor (topSide, rightSide, botSide, leftSide) {
    this.isWordBaseBuilt = false;
    this.wordsUsed = [];
    this.letterToStartWith = "";
    this.gameBoard = new GameBoard(topSide, rightSide, botSide, leftSide);
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
      this.isWordBaseBuilt = true;
      console.log("Word base built. Game can start.")
      this.start();
    });
  }

  /**
   * Asyncrounous method that returns the list of words to put into our Trie.
   * @return {Array} An array of strings containing dictionary words to use for our solution
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

  /**
   * Reset game state with a clean GameBoard. this.isGameOver = false and this.wordsUsed = [] after this
   * method is called.
   */
  reset () {
    this.isGameOver = false;
    this.wordsUsed = [];
    this.gameBoard.reset();
  }

  /**
   * Given a word by the user, try to add it as a part of our used word for our game. If it can be added, set the used letterspaces
   * to used and add it to this.wordsUsed.
   * @param {string} word The word inputed by the user
   * @return {boolean} True or false if the word was successfully added or not
   */
  tryWord (word) {
    if (this.isLegalWord(word)) {
      // If the given word is legal, add it to our used words and update the game board
      this.letterToStartWith = word.charAt(word.length - 1);
      this.wordsUsed.push(word);
      this.gameBoard.setToUsed(word);
      console.log(`${word} is a valid word! Your used words: ${this.wordsUsed.toString()}`);
      return true;
    }
    console.log(`${word} is NOT a valid word you DONKEY! Your used words: ${this.wordsUsed.toString()}`);
    return false;
  }

  /**
   * Method to determine if the passed word is legal in the current game turn
   * @param  {string}  word Word inputed by user
   * @return {Boolean}      True or false if this word is legal and can be added to this.wordsUsed
   */
  isLegalWord (word) {
    // Must check if the last char of the last added word matches the first char of the passed word
    let lastMatchesFirst = word.charAt(0) === this.letterToStartWith;
    if (this.wordsUsed.length === 0)
      // Special case if no words have been inputed (kinda gacky tho)
      lastMatchesFirst = true;
    // Check if the given word is a word in the word base and is a legal string for our game board
    return lastMatchesFirst && this.gameBoard.isLegalString(word) && this.wordBase.isWord(word);
  }

  /**
   * Execute a single turn of a game.
   */
  gameTurn () {
    let word = this.getInputedWord();
    console.log(`You entered ${word}`);
    this.tryWord(word);
  }

  /**
   * Get the inputed word from our player
   * @return {string} The word inputed by the player
   */
  getInputedWord () {
    // Will replace later
    console.log("Enter your word:");
    return window.prompt("Yeah enter your word: ");
  }

  /**
   * Start the game
   */
  start () {
    this.reset();
    if (this.isWordBaseBuilt) {
      while (!this.gameBoard.isGameOver) {
        this.gameTurn();
      }
      console.log("You won yay!!!");
    }
  }

}

/**
 * A class that represents the Letter Boxed game board. Uses a 4 x n 2D matrix to do so.
 */
export class GameBoard {

  constructor (topSide, rightSide, botSide, leftSide) {
    this.board = [
      topSide.map((char) => new LetterSpace(char)),
      rightSide.map((char) => new LetterSpace(char)),
      botSide.map((char) => new LetterSpace(char)),
      leftSide.map((char) => new LetterSpace(char)),
    ];
  }

  // Getters

  /**
   * Checks if the game has been won if all letters on the board have been used
   * @return {Boolean} True or false depending on if all letters on the board have been used.
   */
  get isGameOver () {
    for (let side of this.board) {
      for (let l_space of side) {
        if (!l_space.used)
          return false;
      }
    }
    return true;
  }

  // Methods

  /**
   * Reset state of GameBoard by setting all letters to be unused.
   */
  reset () {
    for (let side of this.board) {
      for (let l_space of side) {
        l_space.used = false;
      }
    }
  }

  /**
   * Checks if the passed string is legal for this GameBoard. A legal string is one that uses letters only from the board and has no
   * adjacent letters on the same side of the board.
   * @param  {string}  string The string passed
   * @return {Boolean} True or false if the passed string is legal for this GameBoard
   */
  isLegalString (string) {
    let prevLetter = string.charAt(0);
    let prevSide = this.getSide(prevLetter);
    if (prevSide === null)
      return false;
    // Loop checks if any adjacent letters share the same side while also checking if the letters are spaces on the board as well
    for (let i = 1; i < string.length; i++) {
      let currLetter = string.charAt(i);
      let currSide = this.getSide(currLetter);
      if (currSide === null || prevSide === currSide)
        return false;
      prevLetter = currLetter;
      prevSide = currSide;
    }
    return true;
  }

  /**
   * Returns the side of the GameBoard with the passed letter
   * @param  {string} letter A character of the alphabet
   * @return {Array}        The side containing the passed letter. Returns null if the letter passed isn't in the GameBoard
   */
  getSide (letter) {
    for (let side of this.board) {
      for (let l_space of side) {
        if (l_space.letter === letter) {
          return side;
        }
      }
    }
    return null;
  }

  /**
   * Set all letterspaces that share characters in the passed word to be used. The passed word is assumed to use only letters in
   * this GameBoard.
   * @param  {string}  word The word passed
   */
  setToUsed (word) {
    for (let side of this.board) {
      for (let l_space of side) {
        if (word.search(l_space.letter) > -1) {
          l_space.used = true;
        }
      }
    }
  }

}

/**
 * Simple class designed to represent a single letter on the board.
 */
class LetterSpace {

  constructor (letter) {
    this.letter = letter;
    this.used = false;
  }

}
