var longestPalindrome = function(s) {
  let start = 0,end = 0;
  function isPalindrome(l, r) {
    while(l >= 0 && r <= s.length && s[l] == s[r]) {
      l--
      r++
    }
    return r - l - 1
  }
  for(let i = 0;i < s.length;i++){
    let len1 = isPalindrome(i,i);
    let len2 = isPalindrome(i,i+1);
    let maxLen = Math.max(len1,len2);
    if(maxLen > end - start){
      start = i - Math.floor((maxLen - 1) / 2);
      end = i + Math.floor(maxLen / 2);
    }
  }
  return s.substring(start, end + 1)
};
// console.log(longestPalindrome("babbad"))


const findTwoPrefix = (left, right) => {
  let i = 0
  for(; i < left.length && i < right.length; i++) {
    if(left[i] !== right[i]) {
      break
    }
  }
  return left.substring(0, i)
}

var longestCommonPrefix2 = function(strs) {
  if (strs.length == 1) return strs[0]
  const mid = Math.floor(strs.length / 2)
  const left = strs.slice(0, mid)
  const right = strs.slice(mid)
  const res =  findTwoPrefix(longestCommonPrefix2(left), longestCommonPrefix2(right))
  return res
};
const longestCommonPrefix = function(strs) {
  if (strs === null || strs.length === 0) return "";
  return longestCommonPrefix2(strs)
}
// console.log(longestCommonPrefix(["ab", "a"]))

var subsetsWithDup = function(nums) {
  nums.sort()
  const res = []
  const backTrack = (nums, path, start) => {
    res.push(path.slice(0))
    for(var i=start;i<nums.length;i++){
      if(i!=start && nums[i]==nums[i-1]){
          continue
      }
      path.push(nums[i]);
      backTrack(nums,path,i+1);
      path.pop()
    }
  }
  backTrack(nums, [], 0)
  return res
};
console.log(subsetsWithDup([1,3,2]))