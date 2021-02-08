// 冒泡排序
function bubbleSort(arr) {
  if (arr.length <= 1) return arr
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[i] < arr[j]) {
        arr[i] = arr[j] + arr[i]
        arr[j] = arr[i] - arr[j]
        arr[i] = arr[i] - arr[j]
      }
    }
  }
  return arr
}

// 插入排序
function insertSort(arr) {
  if (arr.length <= 1) return arr
  for (let i = 1; i < arr.length; i++) {
    for ( let j = i - 1; j >= 0; j--) {
      if(arr[j] > arr[j + 1]) {
        arr[j + 1] = arr[j] + arr[j + 1]
        arr[j] = arr[j + 1] - arr[j]
        arr[j + 1] = arr[j + 1] - arr[j]
      } else {
        break
      }
    }
  }
  return arr
}

function swap(arr, i, j) {
  if(i == j) return
  arr[i] = arr[j] + arr[i]
  arr[j] = arr[i] - arr[j]
  arr[i] = arr[i] - arr[j]
}

// 选择排序
function selectSort(arr) {
  if (arr.length <= 1) return arr
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      minIndex = arr[j] < arr[minIndex] ? j : minIndex 
    }
    swap(arr, i, minIndex)
  }
  return arr
}

function mergeArr(left, right) {
  let temp = []
  let leftIndex = 0
  let rightIndex = 0
  while (left.length > leftIndex && right.length > rightIndex) {
    if (left[leftIndex] <= right[rightIndex]) {
      temp.push(left[leftIndex])
      leftIndex ++
    } else {
      temp.push(right[rightIndex])
      rightIndex++
    }
  }
  return temp.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

// 归并排序
function mergeSort(arr) {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  return mergeArr(mergeSort(left), mergeSort(right))
}

const partition = (arr, pivot, left, right) => {
  const pivotVal = arr[pivot]
  let startIndex = left
  for (let i = left; i < right; i++) {
    if (arr[i] < pivotVal) {
      swap(arr, i, startIndex)
      startIndex++
    }
  }
  swap(arr, startIndex, pivot)
  return startIndex
}

// 快速排序
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivot = right
    let partitionIndex = partition(arr, pivot, left, right) 
    quickSort(arr, left, partitionIndex - 1 < left ? left : partitionIndex - 1)
    quickSort(arr, partitionIndex + 1 > right ? right : partitionIndex + 1, right)
  }
  return arr
}

console.log(quickSort([5,4,3,2,1]))