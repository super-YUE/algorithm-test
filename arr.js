function add() {
  const args = [...arguments]
  function fn() {
    args.concat(arguments)
    return fn
  }
  fn.toString = function() {
    return args.reduce((a, b) => a + b)
  }
  return fn
}

function add(){
  const args = [...arguments]
  function fn() {
    args.concat(arguments)
    return fn
  }
  fn.toString = function() {
    return args.reduce((a, b) => a + b)
  }
  return fn
}