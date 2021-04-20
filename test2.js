const assert = require('assert');

{
  function getType(data, type = 1) {
    const dataType = typeof data
    if (dataType !== 'object' && dataType !== 'function') {
      return dataType
    }
    if (type == 1) {
      const typeString = Object.prototype.toString.call(data)
      return typeString.slice(8, -1)
    } else {
      if (data.constructor == Array) {
        return 'Array'
      }
      if (data.constructor == Function) {
        return 'Function'
      }
      if (data.constructor == Date) {
        return 'Date'
      }
    }
  }
  getType(1)
}
{
  var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
      if (i != 0) {
        // 左指针向右移动一格，移除一个字符
        occ.delete(s.charAt(i - 1));
      }
      while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
        // 不断地移动右指针
        occ.add(s.charAt(rk + 1));
        ++rk;
      }
      // 第 i 到 rk 个字符是一个极长的无重复字符子串
      ans = Math.max(ans, rk - i + 1);
    }
    return ans;
  };
  assert.deepStrictEqual(lengthOfLongestSubstring("abcabcbb"), 3 , '错误');
}
{
  var lengthOfLongestSubstring = function(s) {
    const occ = new Set()
    const n = s.length
    let rk = -1, ans = 0
    for(let i = 0; i < n; i++) {
      if(i != 0) {
        occ.delete(s.charAt(i - 1));
      }
      while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
        occ.add(s.charAt(rk + 1));
        rk++
      }
      ans = Math.min(ans, rk + 1 - i)
    }
    return ans
  }
}
{
  var lengthOfLongestSubstring = function(s) {
    const occ = new Set()
    const n = s.length
    let rk = -1, ans = 0
    for (let i = 0; i < n; i++) {
      if (i != 0) {
        occ.delete(s.charAt(i - 1));
      }
      while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
        occ.add(s.charAt(rk + 1))
        rk++
      }
      ans = Math.min(ans, rk + 1 - i)
    }
    return ans
  }
}
{
  var lengthOfLongestSubstring = function(s) {
    const mySet = new Set()
    const n = s.length
    let rk = -1, ans = 0
    for (let i = 0; i < n; i++) {
      if (i != 0) {
        mySet.delete(s.charAt(i - 1));
        while(rk + 1 < n && !mySet.has(s.charAt(rk+1))) {
          mySet.add(s.charAt(rk+1))
          rk++
        }
        ans = Math.min(ans, rk + 1 - i)
      }
    }
    return ans
  }
}
{
  var findNumberIn2DArray = function(matrix, target) {
    if(!matrix.length) return false;
    let x = matrix.length - 1, y = 0;
    while(x >= 0 && y < matrix[0].length){
        if(matrix[x][y] === target){
            return true;
        }else if(matrix[x][y] > target){
            x--;
        }else{
            y++;
        }
    }
    return false;
  };
  var findNumberIn2DArray = function(matrix, target) {
    if(!matrix.length) return false
    let x = matrix.length - 1, y = 0;
    while (x >= 0 && y < matrix[0].length) {
      if (matrix[x][y] === target) {
        return true
      } else if(matrix[x][y] > target) {
        x--
      } else {
        y++
      }
    }
    return false
  }
}
{
  var Trie = function() {
      this.children = {};
  };
  Trie.prototype.insert = function(word) {
    let node = this.children
    for(let ch of word) {
      if(!node[ch]) {
        node[ch] = {}
      }
      node = node[ch]
    }
    node.isEnd = true
  };

  Trie.prototype.searchPrefix = function(prefix) {
    let node = this.children
    for(let ch of prefix) {
      if(!node[ch]) {
        return false
      }
      node = node[ch]
    }
    return node
  };

  Trie.prototype.search = function(word) {
    const node = this.searchPrefix(word);
    return node !== undefined && node.isEnd !== undefined;
  };

  Trie.prototype.startsWith = function(prefix) {
    return this.searchPrefix(prefix);
  };
  
  const trie = new Trie()
  trie.insert("apple");
  trie.insert("asda");
  const res =trie.search("apple");
  console.log(res)
  console.log(JSON.stringify(trie))
}
{
  const spiralOrder = function(matrix) {
    if(!matrix.length || !matrix[0].length) {
      return []
    }
    const rows = matrix.length, columns = matrix[0].length
    let left = 0, right = columns - 1, top = 0, bottom = rows - 1
    let res = []
    while(left <= right && top <= bottom) {
      for(let colum = left; colum <= right; colum++) {
        res.push(matrix[top][colum])
      }
      for(let row = top + 1; row <= bottom; row++) {
        res.push(matrix[row][right])
      }
      if (left < right && top < bottom) {
        for(let colum = right - 1; colum > left; colum--) {
          res.push(matrix[bottom][colum])
        }
        for(let row = bottom; row > top; colum--) {
          res.push(matrix[row][left])
        }
      }
      [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom -1]
    }
    return res
  }
}
{
  function factory(xxx) {
    const obj = new Object()
    obj.xxx = xxx
    return obj
  }
  function Person(xxx) {
    this.xxx = xxx
  }
  const person = new Person()
  
  function Person () {}
  Person.prototype.name = "factory"
  Person.prototype.sayName = function() {
    console.log(this.name)
  }
  const person1 = new Person()
  console.log(person1)
  function Person() {

  }
  Person.prototype.constructor = Person
  const person1 = new Person()
  const person2 = new Person()
  person1.__proto__ = Person.prototype
  person2.__proto__ = Person.prototype
}
{
  function SuperType() {
    this.property = true
  }

  function SubType() {
    this.subproperty = false;
  }
  SuperType.prototype = new SubType()

  // 盗用构造函数
  function SubType() {
    SuperType.call(this)
  }
  let instance = new SubType()
}
{
  var treeSum = function(arr) {
    let ans = []
    if(arr.length < 3) return ans
    arr.sort((a, b) => a - b)
    for(let i = 0; i < arr.length; i++) {
      if (arr[i] > 0) break
      if(i > 0 && arr[i] == arr[i-1]) continue
      let l = i + 1, r = arr.length - 1
      while(l < r) {
        const sum = arr[l] + arr[r] + arr[i]
        if(sum == 0) {
          ans.push([
            arr[i],
            arr[l],
            arr[r]
          ])
          while(l < r && arr[l] == arr[l+1]) {
            l++
          }
          while(l < r && arr[r] == arr[r-1]) {
            r--
          }
          l++
          r--
        } else if(sum > 0) {
          r--
        } else if(sum < 0) {
          l++
        }
      }
    }
    return ans
  }
}
{
  var letterCombinations = function(digits) {
    let n = digits.length
    const res = []
    if(!n) return res
    const dictionary = {
      2: 'abc',
      3: 'def',
      4: 'ghi',
      5: 'jkl',
      6: 'mno',
      7: 'pqrs',
      8: 'tuv',
      9: 'wxyz'
    }

    const dsf = (str, index) => {
      if(index >= n) {
        res.push(str)
        return
      }
      const word = dictionary[digits[index]]
      for(let ch of word) {
        dsf(str + ch, index + 1)
      }
    }
    dsf('', 0)
    return res
  }

  var letterCombinations = function(digits) {
    let n = digits.length
    const res = []
    if(!n) return res
    const dictionary = {
      2: 'abc',
      3: 'def',
      4: 'ghi',
      5: 'jkl',
      6: 'mno',
      7: 'pqrs',
      8: 'tuv',
      9: 'wxyz'
    }
    let queue = []
    bsf(queue, 0, '')
    while( queue.length ) {
      let [ i, s ] = queue.shift()
      if( s.length === n ) {
        res.push(s)
        continue
      }
      bfs( queue, i + 1, s )
    }
    return res

    function bsf(queue, index, str) {
      for(let ch of dictionary[digits[index]]) {
        queue.push([
          i,
          str + ch
        ])
      }
    }
  }
}
{
  const buildTree = (preOrder, inOrder) => {
    if(!preOrder.length) return
    const cur = new TreeNode(preOrder[0])
    const index = inOrder.indexOf(preOrder[0])
    cur.left = buildTree(preOrder.slice(1, index + 1), inOrder.slice(0, index))
    cur.right = buildTree(preOrder.slice(index + 1), inOrder.slice(index+1))
    return cur
  }
}
{
  const objectFactory = function() {
    const obj  = {}
    const Con = [].shift.call(arguments)
    obj.__proto__ = Con
    const result = Con.apply(obj, arguments)
    return typeof result == 'object' ? result : obj
  }
}