var kidsWithCandies = function(candies, extraCandies) {
	let max = Math.max(...candies)
	return candies.map(e => {
		return e + extraCandies >= max
	})
};