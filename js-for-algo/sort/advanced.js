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
  while (left.length > leftIndex && right.length > rightIndex) {
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

function shellSort(arr) {
  let gap = Math.floor(arr.length / 2)
  while(gap >= 1) {
    for(let i = gap; i < arr.length; i++) {
      for(let j = i - gap; i >= 0; j--) {
        if(arr[j] > arr[j+gap]) {
          swap(arr, j, j + gap)
        } else {
          break
        }
      }
    }
    gap = Math.floor(gap / 2)
  }
  return arr
}

console.log(shellSort([8, 10, 2, 3 ,6, 1, 9]))

function findPartition(arr, left, right) {
  let less = left - 1
  let more = right
  while(left < more) {
    if (arr[left] < arr[right]) {
      left++
      less++
    } else if(arr[left] > arr[right]) {
      swap(arr, --more, left)
    } else {
      left++
    }
  }
  swap(arr, more, right)
  return [less, more]
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if(left < right) {
    const partition = findPartition(arr, left, right)
    quickSort(arr, left, partition[0])
    quickSort(arr, partition[1], right)
  }
  return arr
}