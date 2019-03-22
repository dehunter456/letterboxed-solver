// Defining symbols for private methods
const _addHelp = Symbol("addHelp");
const _isString = Symbol("isString");
const _getNode = Symbol("getNode");
const _preOrderPrintHelp = Symbol("preOrderPrintHelp");

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
   * Adds a word, assumed to be a valid word, to the trie. If the word already exists in the Trie, the Trie remains the same
   * without any duplicates.
   * @param {string} string The string to be added, which is assumed to be a valid word.
   */
  add (word) {
    if (!this[_isString](word)) {
      throw "Passed parameter is not a string.";
    }
    this[_addHelp](this.root, "", word);
  }

  /**
   * Checks if the given string is simply held within the Trie
   * @param  {string} string A String of any given length.
   * @return {boolean} True or false depending on whether the given word is in this Trie
   */
  contains (string) {
    if (!this[_isString](string)) {
      throw "Passed parameter is not a string.";
    }
    // If the passed string is in the trie, this gets the node with the passed string as its key. Otherwise, it returns null.
    let node = this[_getNode](this.root, "", string);
    return node !== null;
  }

  /**
   * Checks if the given string is both held in the Trie AND is a valid word.
   * @param  {string} string A String of any given length.
   * @return {boolean} True or false if the given string is in the Trie AND is a valid word.
   */
  isWord (string) {
    if (!this[_isString](string)) {
      throw "Passed parameter is not a string.";
    }
    // If the passed string is in the trie, this gets the node with the passed string as its key. Otherwise, it returns null.
    let node = this[_getNode](this.root, "", string);
    if (node === null) {
      return false;
    }
    return node.isWord;
  }

  /**
   * Returns an array of the passed string's children strings. If the string doesn't exist in
   * the trie, return null.
   * @param  {string} string A string within the Trie
   * @return {Array} An array of the given string's children strings.
   */
  childrenOf (string) {
    if (!this[_isString](string)) {
      throw "Passed parameter is not a string.";
    }
    // If the passed string is in the trie, this gets the node with the passed string as its key. Otherwise, it returns null.
    let node = this[_getNode](this.root, "", string);
    if (node == null) {
      // Passed string not contained in Trie
      return null;
    }
    // Copy the children strings into the array and return
    let result = [];
    for (let child of node.children) {
      result.push(child.key);
    }
    return result;
  }

  /**
   * Prints the result of a preorder traversal to the console
   */
  preOrderPrint() {
    this[_preOrderPrintHelp](this.root);
  }

  // Private methods

  /**
   * Private recursive helper method for the add method.
   * @param {TrieNode} currNode The node we're currently on.
   * @param {String} currWord The characters we've iterated through when traversing the TrieNode
   * @param {String} remainingChars The remainingChars we still need to go through
   */
  [_addHelp] (currNode, currWord, remainingChars) {
    // Base case: if there are no more remaining chars, we can do a few things
    if (remainingChars.length === 0) {
      // If the node we've ended on isn't set as a word, set it as a word. Otherwise, do nothing and return.
      if (!currNode.isWord) {
        currNode.isWord = true;
        this.size++;
      }
      return;
    }
    // Not at base case, keep going.
    let newWord = currWord + remainingChars.substring(0, 1);
    let newRemaining = remainingChars.substring(1);
    // Check if there's an existing path we can take to add our string
    for (let child of currNode.children) {
      if (child.key === newWord) {
        this[_addHelp](child, newWord, newRemaining);
        return;
      }
    }
    // No path to take, add our own path
    let newChild = new TrieNode(newWord);
    currNode.children.push(newChild);
    this[_addHelp](newChild, newWord, newRemaining);
    return;
  }

  /**
   * Private helper method which just tells whether a given object is a string or not.
   * @param {Object} obj Can literally be anything, even a primitive
   * @return {boolean} True or false whether obj is a string or not.
   */
  [_isString] (obj) {
    return (typeof obj == 'string') || (obj instanceof String);
  }

  /**
   * Private recursive helper method to get the node with a given key. If the given key isn't inside the Trie, return null.
   * @param  {TrieNode} currNode The current TrieNode we're on
   * @param  {string} currKey The current key we're looking to get to. This should be one of the children of currNode
   * @param  {string} remainingChars Remaining chars to look for. As we traverse through the trie, this should shrink as the first
   *  char of remainingChars is concatenated and appended to currKey per each level.
   * @return {TrieNode} The TrieNode with the original key we passed (or null).
   */
  [_getNode] (currNode, currKey, remainingChars) {
    // Base case: if we've gone through all of our remainingChars, we've reached our destination.
    if (remainingChars.length == 0) {
      return currNode;
    }
    // Not base case yet, continue recursion
    let newKey = currKey + remainingChars.substring(0, 1);
    let newRemaining = remainingChars.substring(1);
    // Go through children and look for our key
    for (let child of currNode.children) {
      if (child.key === newKey) {
        let result = this[_getNode](child, newKey, newRemaining);
        // If we find our key, return it
        if (result != null)
          return result;
      }
    }
    // We didn't find anything, the key isn't in the trie
    return null;
  }

  /**
   * Helper method in doing a preorder traversal of the Trie
   */
  [_preOrderPrintHelp] (node) {
    console.log(node.key);
    for (let child of node.children)
      this[_preOrderPrintHelp](child);
  }

}

/**
 * The TrieNode class implements a simple node object for a Trie. It holds a string key, a boolean describing whether the key is a word in
 * the dictionary, and an array of children TrieNodes. This class simply holds the data. The process of vetting and adding data is done by
 * the Trie class.
 */
class TrieNode {

  /**
   * Initializes a trie node that holds a given string called key. By default, the node has no children and its key is described to not
   * be a valid word unless specified otherwise.
   * @param {String} key           The key, or held string, of this node
   * @param {Boolean} [isWord=false] Describes whether the held key is a valid word or not.
   * @param {Array}   [children=[]]  The node's children – each child is a TrieNode whose key's are this node's key + some other char.
   */
  constructor (key, isWord = false, children = []) {
    this.key = key;
    this.isWord = isWord;
    this.children = children;
  }

  /**
   * Check if this node is a leaf TrieNode – if this node has no children
   * @return {Boolean} True or false if this node has no children or not.
   */
  get isLeaf () {
    return this.children.length == 0;
  }

}
