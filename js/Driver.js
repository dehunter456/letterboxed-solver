import {Trie} from "./Trie.js";
import {Game} from "./Game.js";
import {GameBoard} from "./GameBoard.js";
import {Solver} from "./Solver.js";
/**
 * Driver file for the program: builds the wordBase and runs the solver and the game.
 */


/**
  * Asyncrounous function that returns the list of words to put into our Trie.
  * @return {Array} An array of strings containing dictionary words to use for our solution
  */
async function getWordList () {
  const src = "js/resources/scrabble_words.txt";
  // Get words from txt file and parse them
  let request = await fetch(src);
  let allWords = await request.text();
  // Put words into array and remove words of length < 3 (valid words in game must be at least 3 chars long)
  let result = allWords.split("\n");
  result = result.map((word) => word.trim().toLowerCase());
  result = result.filter((word) => word.length >= 3);
  return result;
}

/**
 * [getWordBase description]
 * @return {Trie} A trie with the word base we want to use for the game
 */
async function getWordBase () {
  let result = new Trie();
  let wordList = await getWordList();
  for (let word of wordList) {
    result.add(word);
  }
  return result;
}

function runSolver (wordBase, gameBoard) {

}

// Function that runs once wordBase is built
function runGame (wordBase, gameBoard) {
  let game = new Game();
}

// -------- Actual program --------

console.log("Building word base.")
getWordBase()
.then((wordBase) => {
  console.log("Word base built");
  console.log(wordBase);
})
.catch((err) => {
  console.log(`Error: ${err}`)
})
