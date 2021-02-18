function swap(arr, i, j) {
  if(i == j) return
  arr[i] = arr[i] + arr[j]
  arr[j] = arr[i] - arr[j]
  arr[i] = arr[i] - arr[j]
}

function mergeArr(left, right) {
  let temp = []
  let leftIndex = 0;
  let rightIndex = 0;
  while (left.length > leftIndex && right.length > right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      temp.push(left[leftIndex])
      leftIndex++
    } else {
      temp.push(right[rightIndex])
      rightIndex++
    }
  }
  return temp.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}

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
  for(let i = left; i < right; i++) {
    if(arr[i] < pivotVal) {
      swap(arr, startIndex, i)
      startIndex++
    }
  }
  swap(arr, startIndex, pivot)
  return startIndex
}
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let partitionIndex = partition(arr, right, left, right)
    quickSort(arr, left, partitionIndex - 1 < left ? left : partitionIndex - 1)
    quickSort(arr, partitionIndex + 1 < right ? partitionIndex + 1 : rightf)
  }
  return arr
}

// 希尔排序
function shellSort(arr) {
  let gap = Math.floor(arr.length / 2);
  while (gap >= 1) {
    for (let i = gap; i < arr.length; i++) {
      for (var j = i - gap; j >= 0; j = j - gap) {
        if (arr[j] > arr[j+gap]) {
          swap(arr, j, j + gap)
        } else {
          break
        }
      }
    }
    gap = Math.floor(gap/2);
  }
  return arr
}

console.log(quickSort([8, 10, 2, 3 ,6, 1, 9]))
