/**
 * The TrieNode class implements a simple node object for a Trie. It holds a string key, a boolean describing whether the key is a word in
 * the dictionary, and an array of children TrieNodes. This class simply holds the data. The process of vetting and adding data is done by
 * the Trie class.
 */
export class TrieNode {

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
