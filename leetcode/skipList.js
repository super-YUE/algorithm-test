/*
 * @Author: pengyue
 * @Date: 2020-07-02 11:14:51
 * @LastEditTime: 2020-07-02 11:31:17
 * @LastEditors: pengyue
 * @Description: 
 * @FilePath: /leetcode/skipList.js
 */ 
const MAX_LEVEL = 16

class Node{
	data = -1;
	MAX_LEVEL = 0
	refer = new Array(MAX_LEVEL)
}

class SkipList {
	levelCount = 1;
	head = new Node();
	static randomLevel() {
		let level = 1;
		for(let i = 1; i < MAX_LEVEL; i++) {
			if(Math.random() < 0.5) {
				level ++;
			}
			return level
		}
	}
	insert(value) {
		const level = SkipList.randomLevel();
		const newNode = new Node();
		newNode.data = value;
		newNode.maxLevel = level;
		const update = new Node()
	}
}