import TrieNode from "/TrieNode.js";

/**
 * This is a non-binary search tree that holds strings. Each level holds a string that is one char longer than the previous level, and
 * each child node holds a string equal to the parent string + some extra char. Finding an element within the tree is log(m) time, with
 * m = len of given strign. Insertion and deletion should be the same. No duplicate words are held in the Trie.
 */
export class Trie {

  /**
   * Initializes the Trie by creating a root node holding an empty string as well as a size var tracking the num of words held in the trie.
   */
  constructor () {
    this.root = new TrieNode("");
    this.size = 0;
  }

  // Public methods

  /**
   * Getter that returns the number of words held by this trie
   * @return {[number]} Number of words (NOT NODES) held in this trie
   */
  get size () {
    return this.size;
  }

  /**
   * Adds a word, assumed to be a valid word, to the trie. If the word already exists in the Trie, the Trie remains the same
   * without any duplicates.
   * @param {[string]} string The string to be added, which is assumed to be a valid word.
   * @return {[boolean]} True or false whether the passed string was added
   */
  add (word) {
    if (!this[_isString](word))
      return false;
    this[_addHelp](this.root, word, "");
  }

  /**
   * Checks if the given string is simply held within the Trie
   * @param  {[string]} string A String of any given length.
   * @return {[boolean]} True or false depending on whether the given word is in this Trie
   */
  contains (string) {

  }

  /**
   * Checks if the given string is both held in the Trie AND is a valid word.
   * @param  {[string]} string A String of any given length.
   * @return {boolean} True or false if the given string is in the Trie AND is a valid word.
   */
  isWord (string) {

  }

  /**
   * Returns an array of the passed string's children strings. If no children exist, returns an empty array.
   * @param  {[string]} string A string within the Trie
   * @return {[Array]} An array of the given string's children strings.
   */
  childrenOf (string) {

  }

  test () {
    console.log(this[_isString]("hi"));
    console.log(this[_isString](23));
  }

  // Private methods

  /**
   * Private recursive helper method for the add method.
   * @param {[TrieNode]} currNode The node we're currently on.
   * @param {[String]} currWord The characters we've iterated through when traversing the TrieNode
   */
  [_addHelp] (currNode, currWord, remainingChars) {

  }

  /**
   * Private helper method which just tells whether a given object is a string or not.
   * @param {[Object]} obj Can literally be anything, even a primitive
   * @return {[boolean]} True or false whether obj is a string or not.
   */
  [_isString] (obj) {
    return (typeof obj == 'string') || (obj instanceof String);
  }

}
