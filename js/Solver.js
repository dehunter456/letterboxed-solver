import {Trie} from "./Trie.js";
import {GameBoard} from "./GameBoard.js";

/**
 * A class designed to find solutions to the NYTimes Letter Boxed game.
 *
 * The solver uses a Trie filled with a list of words from the Oxford dictionary to find every possible solution to the given
 * game board.
 */
export class Solver {

  /**
   * Creates the Solver object. Requires an existing wordBase and gameBoard
   * @param {Trie}      wordBase  A Trie that acts as a source of words for our solution
   * @param {GameBoard} gameBoard The game board we need to solve
   */
  constructor (wordBase, gameBoard, solutionCap = 7) {
    this.wordBase = wordBase;
    this.gameBoard = gameBoard;
    this.solutions = null;
    this.solutionCap = solutionCap;
    this.bestSolution = null;
  }

  /**
   * Finds all solutions for this solver's game board. After the method is finished executing, the solutions property will be
   * set with the board's solutions.
   */
  findAllSolutions () {
    if (this.solutions != null) {
      // Solutions already found.
      console.log("solutions already found")
      return;
    }
    let solutions = [];
    // Find all solutions through recursion
    for (let letter of this.gameBoard.letters) {
      this.gameBoard.setToUsed(letter);
      this.findSolutions(solutions, [], letter);
      this.gameBoard.setToUnused(letter);
    }
    this.solutions = solutions;
  }

  /**
   * Recursive helper method for findAllSolutions
   */
  findSolutions (solutionList, currSolution, currWord) {
    // Base case: if the current solution is over this solver's solution length cap, abort mission
    if (currSolution.length > this.solutionCap) {
      return;
    }
    // Base case: if the current game board has been solved, add the current solution to the passed solution list
    else if (this.gameBoard.hasWon) {
      console.log(`Winning solution looks like: ${currSolution.toString()}`);
      // Deep copy solution
      solutionList.push(currSolution.slice(0));
      return;
    }
    // Not at base case, keep going
    let lastUsedChar = currWord.charAt(currWord.length - 1);
    // Go through letters we can use
    for (let letter of this.gameBoard.getChoices(lastUsedChar)) {
      let newWord = currWord + letter;
      // Check trie to see if this is a valid step to take
      if (this.wordBase.contains(newWord)) {
        if (this.wordBase.isWord(newWord)) {
            // If this is a word, try a solution with newWord appended and currWord starting with our current letter
            // Update the game board as well.
            this.gameBoard.setToUsed(newWord);
            currSolution.push(newWord);
            this.findSolutions(solutionList, currSolution, letter);
            currSolution.pop();
            this.gameBoard.setToUnused(newWord);
          }
        // Now find solutions continuing with newWord as our current word
        this.findSolutions(solutionList, currSolution, newWord);
      }
    }
  }

  findBestSolution () {
    // Check if we've found our best solution
    if (this.bestSolution === null) {
      // If we haven't found all of our solutions yet, find them
      if (this.solutions === null) {
        this.findAllSolutions();
      }
      // Now iterate through our solutions and see which is the best one. The best solution is the one that uses the least words.
      let bestSoFar = this.solutions[0];
      let arrSum = (sum, curr) => sum + curr;
      for (let sol of this.solutions) {
        if (sol.length < bestSoFar.length) {
          bestSoFar = sol;
        }
        else if (sol.length === bestSoFar.length) {
          let bestSum = bestSoFar.reduce(arrSum);
          let solSum = sol.reduce(arrSum);
          if (solSum < bestSum)
            bestSoFar = sol;
        }
      }
      this.bestSolution = bestSoFar;
    }
    return this.bestSolution;
  }

}
