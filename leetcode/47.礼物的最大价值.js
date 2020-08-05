/*
 * @Author: pengyue
 * @Date: 2020-07-01 10:09:02
 * @LastEditTime: 2020-07-01 10:41:58
 * @LastEditors: pengyue
 * @Description: 
 * @FilePath: /leetcode/47.礼物的最大价值.js
 */ 
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
	const dpArray = []
	const maxX = grid.length
	const maxY = grid[0].length
	for(let y = 0; y < maxX; y++) {
		for(let x = 0; x < maxY; x++) {
			if(y == 0 && x == 0) {
				dpArray.push(grid[0][0])
				continue
			}
			if(x == 0) {
				dpArray.push(grid[y][x] + dpArray[(y-1) * maxY + x])
			} else if(y == 0) {
				dpArray.push(grid[y][x] + dpArray[(y) * maxY + x -1])
			} else {
				const max = Math.max(dpArray[(y) * maxY + x -1], dpArray[(y-1) * maxY + x])
				dpArray.push(max + grid[y][x])
			}
		}
	}
	return dpArray[dpArray.length - 1]
};

console.log(maxValue([[1,3,1],[1,5,1],[4,2,1]]))