const bubbleSort = n => {
	if (n.length <= 1) {
		return n
	}
	for (let i = 0; i < n.length; i++) {
		let flag = false
		for (let j = 0; j < n.length - i - 1; j++) {
			if (n[j] > n[j + 1]) {
				n[j + 1] = n[j + 1] + n[j]
				n[j] = n[j + 1] - n[j]
				n[j + 1] = n[j + 1] - n[j]
				flag = true
			}
		}
		if (!flag) break
	}
	return n
}

const insertSort = n => {
	if (n.length < 0) {
		return n
	}
	for (let i = 0; i < n.length; i++) {
		const val = n[i];
		let j = i - 1
		while (j >= 0) {
			if (n[j] > val) {
				n[j + 1] = n[j];
			} else {
				break
			}
			j--
		}
		n[j + 1] = val
	}
	return n
}

const selectSort = n => {
	for (let i = 0; i < n.length; i++) {
		let min = i;
		for (let j = i + 1; j < n.length; j++) {
			if (n[min] > n[j]) {
				min = j
			}
		}
		let tmp = n[min];
		n[min] = n[i];
		n[i] = tmp;
	}
	return n
}

const mergeSort = (n, l, r = n.length - 1) => {
	if (n.length <= 1) {
		return n
	}
	const mid = l + (r - l) >> 1 / 2
	const left = n.slice(0, mid)
	const right = n.slice(mid)
	return mergeFun(mergeSort(left), mergeSort(right))
}

const mergeFun = (l, r) => {
	const temp = []
	let lIndex = 0;
	let rIndex = 0;
	while (left.length > leftIndex && right.length > rightIndex) {
		if (l[lIndex] <= r[rIndex]) {
			temp.pop(l[lIndex])
			lIndex++
		} else {
			temp.pop(r[rIndex])
			rIndex++
		}
	}
	return temp.concat(l.slice(lIndex)).concat(r.slice(rIndex))
}

const quickSort = () => {

}

const bucketSort = (array, bucketSize = 5) => {
	if (array.length < 2) {
		return array
	}
	const buckets = createBuckets(array, bucketSize)
	return sortBuckets(buckets)
}

function createBuckets(array, bucketSize) {
	let minValue = array[0]
	let maxValue = array[0]
	// 遍历数组，找到数组最小值与数组最大值
	for (let i = 1; i < array.length; i++) {
		if (array[i] < minValue) {
			minValue = array[i]
		} else if (array[i] > maxValue) {
			maxValue = array[i]
		}
	}
	// 根据最小值、最大值、桶的大小，计算得到桶的个数
	const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
	// 建立一个二维数组，将桶放入buckets中
	const buckets = []
	for (let i = 0; i < bucketCount; i++) {
		buckets[i] = []
	}
	// 计算每一个值应该放在哪一个桶中
	for (let i = 0; i < array.length; i++) {
		const bucketIndex = Math.floor((array[i] - minValue) / bucketSize)
		buckets[bucketIndex].push(array[i])
	}
	return buckets
}

function sortBuckets(buckets) {
	const sortedArray = []
	for (let i = 0; i < buckets.length; i++) {
		if (buckets[i] != null) {
			insertionSort(buckets[i])
			sortedArray.push(...buckets[i])
		}
	}
	return sortedArray
}