import {Trie} from "./Trie.js";
import {GameBoard} from "./GameBoard.js";

export class Game {

  /**
   * Creates the Game object
   * @param {GameBoard} gameBoard The GameBoard to use for this game instance
   * @param {Trie}      wordBase  The data base of words to use for this game instance
   * @param {Function}  wordInput The source of input for this game instance. This function expects two parameters – the
   *  letter to start the word to return with and a copy of the current board in play.
   */
  constructor (gameBoard, wordBase, wordInput) {
    this.wordsUsed = [];
    this.letterToStartWith = "";
    this.gameBoard = gameBoard;
    this.wordBase = wordBase;
    this.input = wordInput;
  }

  /**
   * Reset game state with a clean GameBoard. this.wordsUsed = [] after this
   * method is called.
   */
  reset () {
    this.wordsUsed = [];
    this.gameBoard.reset();
  }

  /**
   * Given a word by the user, try to add it as a part of our used word for our game. If it can be added, set the used letterspaces
   * to used and add it to this.wordsUsed.
   * @param {string}    word The word inputed by the user
   * @return {boolean}  True or false if the word was successfully added or not
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
   * @param  {string}   word Word inputed by user
   * @return {Boolean}  True or false if this word is legal and can be added to this.wordsUsed
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
    let word = this.input(letterToStartWith, this.gameBoard.deepCopy);
    console.log(`You entered ${word}`);
    this.tryWord(word);
  }

  /**
   * Start and run the game
   * @return {Array}  An copy array of the used solution to win.
   */
  run () {
    this.reset();
    while (!this.gameBoard.hasWon) {
      this.gameTurn();
      console.log(this);
    }
    console.log("You are winner yay!!!");
    return this.wordsUsed.slice(0);
  }

}
