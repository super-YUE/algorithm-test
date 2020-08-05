/*
 * @Author: pengyue
 * @Date: 2020-06-24 10:07:13
 * @LastEditTime: 2020-06-24 11:39:23
 * @LastEditors: pengyue
 * @Description: 
 * @FilePath: /leetcode/295.数据流的中位数.js
 */ 
/*
 * @lc app=leetcode.cn id=295 lang=javascript
 *
 * [295] 数据流的中位数
 *
 * https://leetcode-cn.com/problems/find-median-from-data-stream/description/
 *
 * algorithms
 * Hard (44.30%)
 * Likes:    202
 * Dislikes: 0
 * Total Accepted:    17.3K
 * Total Submissions: 37.3K
 * Testcase Example:  '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n' +
  '[[],[1],[2],[],[3],[]]'
 *
 * 中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。
 * 
 * 例如，
 * 
 * [2,3,4] 的中位数是 3
 * 
 * [2,3] 的中位数是 (2 + 3) / 2 = 2.5
 * 
 * 设计一个支持以下两种操作的数据结构：
 * 
 * 
 * void addNum(int num) - 从数据流中添加一个整数到数据结构中。
 * double findMedian() - 返回目前所有元素的中位数。
 * 
 * 
 * 示例：
 * 
 * addNum(1)
 * addNum(2)
 * findMedian() -> 1.5
 * addNum(3) 
 * findMedian() -> 2
 * 
 * 进阶:
 * 
 * 
 * 如果数据流中所有整数都在 0 到 100 范围内，你将如何优化你的算法？
 * 如果数据流中 99% 的整数都在 0 到 100 范围内，你将如何优化你的算法？
 * 
 * 
 */

// @lc code=start
/**
 * initialize your data structure here.
 */
var MedianFinder = function() {
  this.heap1 = []
  this.heap2 = []
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  if(this.heap1.length == this.heap2.length) {
    this.heap1.push(num)
    heapfill(this.heap1, true)
  } else {
    this.heap2.push(num)
    heapfill(this.heap2, false)
  }
  if(this.heap1[0] > this.heap2[0]) {
    const temp = this.heap1[0]
    this.heap1[0] = this.heap2[0]
    this.heap2[0] = temp
    heapfill(this.heap1, true)
    heapfill(this.heap2, false)
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  let res
  if((this.heap1.length + this.heap2.length) & 1 == 1) {
    res =  this.heap1[0]
  } else {
    res =  (this.heap1[0] + this.heap2[0]) / 2
  }
  res = res.toFixed(1)
  console.log(res)
  return res
};

function heapfill(arr, isBig) {
  let lastIndex = arr.length - 1
  while(lastIndex >= 0) {
    const top = Math.floor((lastIndex - 1)/2)
    if(isBig) {
      if(isBig && arr[lastIndex] > arr[top]) {
        swap(arr, top, lastIndex )
      }
    } else {
      if(arr[lastIndex] < arr[top]) {
        swap(arr, top, lastIndex )
      }
    }
    lastIndex = top
  }
}

function swap(arr, a, b) {
  const temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}
/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
// @lc code=end

