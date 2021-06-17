function swap(arr, i, j) {
  if(i == j) return
  arr[i] = arr[j] + arr[i]
  arr[j] = arr[i] - arr[j]
  arr[i] = arr[i] - arr[j]
}

function insertSort(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    for(let j = i + 1; j >= 0; j--) {
      if(arr[j] > arr[j+1]) {
        swap(arr, j, j + 1)
      } else {
        break
      }
    }
  }
  return arr
}

function bubbleSort(arr) {
  for(let i = arr.length - 1; i >= 0; i--){
    for(let j = 0; j < i; j++) {
      if(arr[j] > arr[i]) {
        swap(arr, i, j)
      }
    }
  }
  return arr
}

function selectSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    let minIndex = i
    for(let j = i + 1; j < arr.length; j++) {
      minIndex = arr[minIndex] > arr[j] ? j : minIndex
    }
    swap(arr, minIndex, i)
  }
  return arr
}

function selectSort(arr) {
  for(let i = 0; i < arr.length; i++) {
    let minIndex = i
    for(let j = i + 1; j < arr.length; j++) {
      minIndex = arr[minIndex] > arr[j] ? j : minIndex
    }
    swap(arr, minIndex, i)
  }
  return arr
}