function swap(arr, i, j) {
  if(i == j) return
  arr[i] = arr[j] + arr[i]
  arr[j] = arr[i] - arr[j]
  arr[i] = arr[i] - arr[j]
}

// 冒泡排序
function bubbleSort() {
  if (arr.length <= 1) return arr
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[i] < arr[j]) {
        swap(arr, i, j)
      }
    } 
  }
  return arr
}

// 插入排序
function insertSort(arr) {
  if (arr.length <= 1) return arr
  for(let i = 1; i < arr.length; i++) {
    for (var j = i - 1; j >= 0; j--) {
      if (arr[j] > arr[j+1]) {
        swap(arr, j, j + 1)
      } else {
        break
      }
    }
  }
  return arr
}

// 选择排序
function selectSort(arr) {
  if (arr.length <= 1) return arr
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex
    }
    swap(arr, minIndex , i)
  } 
  return arr
}

console.log(selectSort([5,4,3,2,1]))