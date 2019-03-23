/**
 * A class that represents the Letter Boxed game board. Uses a 4 x n 2-dimensional array to do so.
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
   * @return {Boolean}  True or false depending on if all letters on the board have been used.
   */
  get hasWon () {
    for (let side of this.board) {
      for (let letterSpace of side) {
        if (!letterSpace.used)
          return false;
      }
    }
    return true;
  }

  /**
   * Get a deep copy of this GameBoard.
   * @return {GameBoard}  A new, separate copy of this GameBoard with the same state.
   */
  get deepCopy () {
    // First copy each side and get only the letters.
    let sidesCopy = [];
    for (let side of this.board) {
      sidesCopy.push(side.map((letterSpace) => letterSpace.letter));
    }
    // Create the copy of the GameBoard
    let result = new GameBoard(sidesCopy[0], sidesCopy[1], sidesCopy[2], sidesCopy[3]);

    // Now set the correct letter spaces to be used on the copy
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        result.board[i][j].used = this.board[i][j].used;
      }
    }

    return result;
  }

  get letters () {
    let result = [];
    for (let side of this.board) {
      for (let letterSpace of side) {
        result.push(letterSpace.letter);
      }
    }
    return result;
  }

  // Methods

  /**
   * Reset state of GameBoard by setting all letters to be unused.
   */
  reset () {
    for (let side of this.board) {
      for (let letterSpace of side) {
        letterSpace.used = false;
      }
    }
  }

  /**
   * Checks if the passed string is legal for this GameBoard. A legal string is one that uses letters only from the board and has no
   * adjacent letters on the same side of the board.
   * @param  {string} string  The string passed
   * @return {Boolean}        True or false if the passed string is legal for this GameBoard
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
   * @param  {string} letter  A character of the alphabet
   * @return {Array}          The side containing the passed letter. Returns null if the letter passed isn't in the GameBoard
   */
  getSide (letter) {
    for (let side of this.board) {
      for (let letterSpace of side) {
        if (letterSpace.letter === letter) {
          return side;
        }
      }
    }
    return null;
  }

  /**
   * Returns the letter space of the given letter or null if the passed letter doesn't exist in this board.
   * @param  {string} letter      A letter on this board
   * @return {LetterSpace}        The letter space corresponding to the passed letter
   */
  getLetterSpace (letter) {
    for (let side of this.board) {
      for (let letterSpace of side) {
        if (letterSpace.letter === letter)
          return letterSpace;
      }
    }
    return null;
  }

  /**
   * Set all letterspaces that share characters in the passed word to be used. The passed word is assumed to use only letters in
   * this GameBoard.
   * @param {string}  word  The word passed
   */
  setToUsed (word) {
    for (let side of this.board) {
      for (let letterSpace of side) {
        if (word.search(letterSpace.letter) > -1) {
          letterSpace.used = true;
        }
      }
    }
  }

  setToUnused (word) {
    for (let side of this.board) {
      for (let letterSpace of side) {
        if (word.search(letterSpace.letter) > -1) {
          letterSpace.used = false;
        }
      }
    }
  }

  getChoices (letter) {
    let result = [];
    let restrictedSide = this.getSide(letter);
    for (let side of this.board) {
      if (side !== restrictedSide) {
        for (let letterSpace of side) {
          if (!letterSpace.used)
            result.push(letterSpace.letter);
        }
      }
    }
    return result;
  }

  setLetterToUsed (letter) {
    this.getLetterSpace(letter).used = true;
  }

  setLetterToUnused (letter) {
    this.getLetterSpace(letter).used = false;
  }

  hasLetterBeenUsed (letter) {
    return this.getLetterSpace(letter).used;
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
