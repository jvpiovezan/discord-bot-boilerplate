function chunk(array, chunkSize) {
  if (!chunkSize || !array) return console.error('You need to pass parameters!')

  let tempArray = []
  for (var i = 0; i < array.length; i += chunkSize) {
    tempArray.push(array.slice(i, i + chunkSize))
  }
  return tempArray
}

module.exports = {
  chunk
}