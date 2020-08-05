class Node {
	constructor() {
		this.children = []
		this.isEnd = false
	}
}

var Trie = function() {
	this.root = new Node()
};

/**
 * Inserts a word into the trie. 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
	let node = root
	for(let i = 0; i < word.length; i++) {
		const points = char.charCodeAt() - 'a'.charCodeAt()
		if(node == null) {
			node = new Node()
			node.children[points] = node
		}
		const char = word[i]
		node.chars[char.charCodeAt() - 'a'.charCodeAt()] = 1
		node = node.next
	}
};

/**
 * Returns if the word is in the trie. 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
	let node = this.root
	let index = 0
	while(node != null && index < word.length) {
		node = node.next
		let length = node.chars[word[index].charCodeAt() - 'a'.charCodeAt()]
		if(node.chars[length] !== 1) {
			return false
		}
		index ++
	}
	return true
};

/**
 * Returns if there is any word in the trie that starts with the given prefix. 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {

};
